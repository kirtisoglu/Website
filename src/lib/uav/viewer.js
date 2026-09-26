/**
 * Interactive replay of an ILS run on a UAV routing instance.
 *
 * Ported from the standalone viewer in UAV-Routing/animation. All DOM lookups
 * are scoped to the component root, and the boot sequence is split so the
 * listeners are attached once while load() can be called again for another
 * dataset.
 *
 *   const v = createViewer(rootElement);
 *   v.load(await (await fetch('/data/uav-routing/pr15_240/data.json')).json());
 *   v.destroy();
 */
export function createViewer(root) {
  const $ = (id) => root.querySelector('#' + id);
  const listeners = [];
  const on = (t, e, f) => { t.addEventListener(e, f); listeners.push([t, e, f]); };


  const OPC={add:"--insert",replace:"--replace",swap:"--swap",two_opt:"--twoopt",shake:"--shake"};
  const OPN={add:"Insert",replace:"Replace",swap:"Swap",two_opt:"2-opt",shake:"Shake"};
  const css=n=>getComputedStyle(root).getPropertyValue(n).trim();
  const fmt=n=>n==null?"—":n.toLocaleString("en-US",{maximumFractionDigits:0});
  let D=null,i=0,playing=false,acc=0,last=0;

  const map=$("map"),mctx=map.getContext("2d");
  const tl=$("tl"),tctx=tl.getContext("2d");

  function fit(c){const b=c.getBoundingClientRect(),d=window.devicePixelRatio||1;
    const r={width:b.width||c.parentElement.clientWidth||640,
             height:b.height||c.parentElement.clientHeight||430};
    c.width=Math.max(1,r.width*d);c.height=Math.max(1,r.height*d);
    c.getContext("2d").setTransform(d,0,0,d,0,0);return r;}

  function proj(r){
    const xs=D.nodes.map(n=>n.x),ys=D.nodes.map(n=>n.y);
    const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
    const pad=26,w=r.width-2*pad,h=r.height-2*pad;
    const s=Math.min(w/Math.max(1e-9,x1-x0),h/Math.max(1e-9,y1-y0));
    const ox=pad+(w-(x1-x0)*s)/2, oy=pad+(h-(y1-y0)*s)/2;
    return n=>[ox+(n.x-x0)*s, r.height-(oy+(n.y-y0)*s)];
  }

  function drawMap(){
    const r=fit(map),P=proj(r),f=D.frames[i],sched=new Set(f.r),byId=D.byId;
    mctx.clearRect(0,0,r.width,r.height);
    const col=css(OPC[f.e]||"--twoopt");

    if($("tProp").checked){
      mctx.lineWidth=1;mctx.strokeStyle=css("--ghost");mctx.globalAlpha=.34;
      for(const p of f.p){mctx.beginPath();
        const cyc=p.r.concat([D.depot]);
        cyc.forEach((n,k)=>{const q=P(byId[n]);k?mctx.lineTo(q[0],q[1]):mctx.moveTo(q[0],q[1]);});
        mctx.stroke();}
      mctx.globalAlpha=1;
    }

    const win=$("tWin").checked;
    for(const n of D.nodes){
      if(n.id===D.depot)continue;
      const q=P(n),on=sched.has(n.id);
      mctx.beginPath();mctx.arc(q[0],q[1],on?4.2:3,0,7);
      if(on){mctx.fillStyle=win?winColor(n):col;mctx.fill();}
      else{
        // not on the route: filled in a light tone so it reads as a target the
        // search may still pick up, without competing with the route itself
        mctx.fillStyle=win?winColor(n):css("--unsched");
        mctx.globalAlpha=win?.3:1;mctx.fill();mctx.globalAlpha=1;
      }
    }

    const cyc=f.r.concat([D.depot]);
    mctx.lineWidth=1.9;mctx.strokeStyle=col;mctx.lineJoin="round";
    mctx.beginPath();
    cyc.forEach((n,k)=>{const q=P(byId[n]);k?mctx.lineTo(q[0],q[1]):mctx.moveTo(q[0],q[1]);});
    mctx.stroke();
    mctx.fillStyle=col;                       // direction of travel, one arrowhead per leg
    for(let k=0;k<cyc.length-1;k++){
      const a=P(byId[cyc[k]]),b=P(byId[cyc[k+1]]);
      const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);
      if(L<14)continue;
      const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,ux=dx/L,uy=dy/L,s=4.6;
      mctx.beginPath();
      mctx.moveTo(mx+ux*s,my+uy*s);
      mctx.lineTo(mx-ux*s-uy*s*0.62,my-uy*s+ux*s*0.62);
      mctx.lineTo(mx-ux*s+uy*s*0.62,my-uy*s-ux*s*0.62);
      mctx.closePath();mctx.fill();
    }

    const d=P(byId[D.depot]);
    mctx.fillStyle=css("--ink");mctx.fillRect(d[0]-5,d[1]-5,10,10);

    const lab=$("tIds").value;
    if(lab!=="off"){
      mctx.font="10px "+css("--mono").split(",")[0].replace(/"/g,"");
      mctx.fillStyle=css("--muted");mctx.textAlign="center";
      f.r.forEach((n,k)=>{if(n===D.depot)return;const q=P(byId[n]);
        mctx.fillText(lab==="order"?String(k):String(n),q[0],q[1]-8);});
    }
    D.est=false;
    if(f.a){D.arr={};f.r.slice(1).concat([D.depot]).forEach((n,k)=>{if(f.a[k]!=null)D.arr[n]=f.a[k];});}
    else {D.arr=arrivals(f.r);D.est=true;}
    if(f.s){D.spd={};D.loi={};f.r.slice(1).concat([D.depot]).forEach((n,k)=>{
              if(f.s[k]!=null)D.spd[n]=f.s[k]; if(f.lo&&f.lo[k]!=null)D.loi[n]=f.lo[k];});}
    else {D.spd=legSpeeds(f.r.concat([D.depot]));D.loi={};D.est=true;}
    $("winScale").style.visibility=win?"visible":"hidden";
    $("hint").textContent="frame "+(i+1)+" / "+D.frames.length;
  }

  function legSpeeds(route){
    // speed each leg needs under the earliest-arrival schedule, in m/s
    const out={},v=D.vmax/D.scale;
    let a=0;
    for(let k=1;k<route.length;k++){
      const p=D.byId[route[k-1]],q=D.byId[route[k]];
      const du=Math.hypot(q.x-p.x,q.y-p.y);
      const t=Math.max(q.e, a+du/v)-a;
      out[route[k]]=t>0?du*D.scale/t:null;
      a=Math.max(q.e, a+du/v);
    }
    return out;
  }

  function arrivals(route){
    // earliest arrival at each visit, flying every leg at v_max and waiting for a
    // window to open: the same forward pass the search uses to test feasibility
    const out={},v=D.vmax*1/D.scale;      // coordinate units per second
    let a=0;
    for(let k=1;k<route.length;k++){
      const p=D.byId[route[k-1]],q=D.byId[route[k]];
      a=Math.max(q.e, a+Math.hypot(q.x-p.x,q.y-p.y)/v);
      out[route[k]]=a;
    }
    return out;
  }

  function winColor(n){
    // hue runs blue to yellow as the window opens later in the mission
    const t=n.e/(D.horizon||1),h=210-150*Math.min(1,Math.max(0,t));
    return "hsl("+h+" 62% 48%)";
  }

  function drawTL(){
    const r=fit(tl);tctx.clearRect(0,0,r.width,r.height);
    const F=D.frames,pad=4,H=r.height;
    const lo=D.lo,hi=D.hi,span=(hi-lo)||1,bud=D.budget||1;
    const X=t=>(t/bud)*r.width,Y=v=>H-pad-((v-lo)/span)*(H-2*pad-10);
    tctx.strokeStyle=css("--grid");tctx.lineWidth=1;
    for(let k=0;k<=4;k++){const y=pad+ (H-2*pad-10)*k/4;tctx.beginPath();tctx.moveTo(0,y);tctx.lineTo(r.width,y);tctx.stroke();}
    tctx.strokeStyle=css("--shake");tctx.globalAlpha=.32;tctx.lineWidth=1;
    F.forEach(f=>{if(f.v!=="shake")return;const x=X(f.t);tctx.beginPath();tctx.moveTo(x,H-10);tctx.lineTo(x,H-3);tctx.stroke();});
    tctx.globalAlpha=1;
    tctx.strokeStyle=css("--ghost");tctx.lineWidth=1;tctx.beginPath();
    F.forEach((f,k)=>{const x=X(f.t),y=Y(f.f??lo);k?tctx.lineTo(x,y):tctx.moveTo(x,y);});tctx.stroke();
    tctx.strokeStyle=css("--best");tctx.lineWidth=1.9;tctx.beginPath();
    F.forEach((f,k)=>{const x=X(f.t),y=Y(f.b);k?tctx.lineTo(x,y):tctx.moveTo(x,y);});tctx.stroke();
    const f=F[i],px=X(f.t);
    tctx.strokeStyle=css(OPC[f.e]||"--twoopt");tctx.lineWidth=1.6;
    tctx.beginPath();tctx.moveTo(px,0);tctx.lineTo(px,H-2);tctx.stroke();
    tctx.fillStyle=css("--muted");tctx.font="10px "+css("--mono").split(",")[0].replace(/"/g,"");
    tctx.textAlign="left";tctx.fillText(fmt(hi),4,10);
    tctx.textAlign="right";tctx.fillText(Math.round(D.budget)+" s",r.width-4,H-2);
  }

  // Swap and 2-opt are accepted on the objective and, on a tie, on the capacity
  // max(T/Tmax, E/Emax) of the solved route. Show that quantity, its change and
  // which resource binds, so a lateral move can be read for what it trades.
  function capRows(f,prev){
    if(f.cap==null||(f.e!=="swap"&&f.e!=="two_opt"))return "";
    const dc=prev&&prev.cap!=null?f.cap-prev.cap:null;
    const binds=f.er>=f.tr?"energy":"time";
    return row("Capacity",(100*f.cap).toFixed(2)+'% <span style="opacity:.6">('+binds+')</span>')+
      row("Capacity change",dc==null?"&mdash;":
        `<span class="delta ${dc<=0?"up":"down"}">${dc>0?"+":""}${(100*dc).toFixed(3)} pp</span>`)+
      row("Time / energy",(100*f.tr).toFixed(1)+"% / "+(100*f.er).toFixed(1)+"%");
  }

  function rail(){
    const f=D.frames[i];
    document.querySelector(".verdict .dot").style.background=css(OPC[f.e]||"--twoopt");
    $("vtext").textContent=
      (OPN[f.e]||f.e)+(f.v==="shake"?" — targets removed":" — accepted");
    const prev=i>0?D.frames[i-1]:null,d=prev&&f.f!=null&&prev.f!=null?f.f-prev.f:null;
    $("ev").innerHTML=
      row("Wall clock",f.t.toFixed(1)+" s")+row("At iteration",fmt(f.it))+
      row("Targets",f.r.length-1)+row("Objective",fmt(f.f))+
      row("Change",d==null?"—":`<span class="delta ${d>=0?"up":"down"}">${d>=0?"+":""}${fmt(d)}</span>`)+
      row("Best so far",fmt(f.b))+row("Rejected since",fmt(f.np))+
      capRows(f,prev);
    $("seq").innerHTML=
      "<b>depot</b> &rarr; " + f.r.slice(1).map(n=>String(n)).join(" &rarr; ") + " &rarr; <b>depot</b>";
    const box=$("cands"),note=$("candsNote");
    if(!f.c.length){note.textContent="";box.innerHTML='<p class="empty">Not recorded for this event.</p>';return;}
    // f.cw is the total weight of the whole set at the draw, so the listed
    // weights become the selection probabilities of the roulette
    const mx=Math.max(...f.c.map(c=>c[1]))||1,col=css(OPC[f.e]||"--twoopt");
    const tot=f.cw||f.c.reduce((s,c)=>s+c[1],0);
    note.textContent=(f.cn&&f.cn>f.c.length)?`top ${f.c.length} of ${f.cn}`:`${f.c.length} moves`;
    const pct=p=>p>=.001?(100*p).toFixed(1)+"%":(100*p).toFixed(3)+"%";
    box.innerHTML=f.c.map(c=>
      `<div class="cand"><span class="id">${c[0]}</span>`+
      `<span class="bar"><i style="width:${Math.max(3,100*c[1]/mx).toFixed(1)}%;background:${col}"></i></span>`+
      `<span class="w">${tot>0?pct(c[1]/tot):"—"}</span></div>`).join("");
  }
  const row=(k,v)=>`<span>${k}</span><span>${v}</span>`;

  const mmss=s=>{const m=Math.floor(s/60);return m+"m "+String(Math.round(s-60*m)).padStart(2,"0")+"s";};

  function hover(ev){
    const tip=$("tip"),r=map.getBoundingClientRect(),P=proj(r);
    const mx=ev.clientX-r.left,my=ev.clientY-r.top;
    let best=null,bd=14*14;
    for(const n of D.nodes){const q=P(n),dd=(q[0]-mx)**2+(q[1]-my)**2;if(dd<bd){bd=dd;best=n;}}
    if(!best){tip.hidden=true;return;}
    const f=D.frames[i],pos=f.r.indexOf(best.id),on=pos>=0,dep=best.id===D.depot;
    const a=D.arr[best.id];
    let rows="";
    const row=(k,v,cls)=>rows+=`<dt>${k}</dt><dd class="${cls||""}">${v}</dd>`;
    if(dep){
      row("Return by", mmss(D.horizon));
    }else{
      row("Window opens", mmss(best.e));
      row("Window closes", mmss(best.l));
      const g=best.g||0;
      row("Reward slope", (g>=0?"+":"")+g.toFixed(3)+" / s", g>=0?"":"warn");
    }
    if(on&&!dep){
      row("Visit", pos+" of "+(f.r.length-1));
      if(a!=null) row(D.est?"Earliest arrival":"Arrival", mmss(a), a>best.l?"warn":"");
      const sIn=D.spd[best.id], sOut=D.spd[f.r[pos+1]!==undefined?f.r[pos+1]:D.depot];
      if(sIn!=null) row("Speed in", sIn.toFixed(1)+" m/s");
      if(sOut!=null) row("Speed out", sOut.toFixed(1)+" m/s");
      const li=D.loi?D.loi[best.id]:null;
      if(li!=null) row("Loiter in", (li/1000).toFixed(2)+" km");
      if(D.est) rows+='<dt></dt><dd style="color:var(--muted)">estimated</dd>';
    }
    tip.innerHTML=`<h3>${dep?"Depot":"Target "+best.id}<em>${dep?"start and end":(on?"scheduled":"not scheduled")}</em></h3><dl>${rows}</dl>`;
    tip.hidden=false;
    const q=P(best),w=tip.offsetWidth,h=tip.offsetHeight;
    tip.style.left=Math.min(Math.max(6,q[0]+12),r.width-w-6)+"px";
    tip.style.top =Math.min(Math.max(6,q[1]-h-12),r.height-h-6)+"px";
  }

  function render(){drawMap();drawTL();rail();
    $("pos").textContent=
      D.frames[i].t.toFixed(1)+" s  ·  event "+(i+1)+" of "+D.frames.length;
    const wp=$("winPos"), A=D.lopt||[], k=A.indexOf(i);
    if(wp) wp.textContent=A.length?(k>=0?"local optimum "+(k+1)+" of "+A.length
                                        :A.length+" local optima"):"";
    const w=document.getElementById("soWins");   // the left figure tracks the playhead
    if(w&&w.classList.contains("open")) drawWindows();}

  function go(n){i=Math.max(0,Math.min(D.frames.length-1,n));render();}

  function tick(ts){
    if(!playing)return;
    if(!last)last=ts;
    acc+=(ts-last)/1000*Number($("speed").value)*6;last=ts;
    while(acc>=1){acc-=1;if(i>=D.frames.length-1){playing=false;
      $("play").textContent="Play";break;}i++;}
    render();requestAnimationFrame(tick);
  }

  function load(D0){
    playing=false;i=0;acc=0;last=0;
    D=D0;D.byId={};D.nodes.forEach(n=>D.byId[n.id]=n);
    const ttl=$("title");
    if(ttl){if(ttl.firstChild)ttl.firstChild.nodeValue=D.instance;else ttl.prepend(D.instance);}
    $("subtitle").textContent=
      Math.round(D.budget)+" s from the "+(D.start||"greedy")+" start";
    document.title=D.instance.replace(/\s*\(\d+\)/,"")+" Search Replay";
    D.horizon=Math.max(...D.nodes.map(n=>n.l));
    // the routes the search settled on: the frame before each shake
    D.lopt=[...new Set(D.frames.map((f,k)=>f.v==="shake"?k-1:-1).filter(k=>k>=0))];
    soWire();
    const fs=D.frames.map(f=>f.f).filter(v=>v!=null).concat(D.frames.map(f=>f.b));
    D.lo=Math.min(...fs)*0.997;D.hi=Math.max(...fs)*1.003;
    if(!(D.hi>D.lo)){D.lo-=1;D.hi+=1;}
    // counts come from the whole run, not from the frames the page shows
    const T=D.totals||{};
    const n={accepted:T.accepted??D.frames.filter(f=>f.v==="accepted").length,
             shake:T.shake??D.frames.filter(f=>f.v==="shake").length};
    const rejected=(T.refused??0)+(T.infeasible??0)
      || D.frames.reduce((a,f)=>a+f.np,0);
    // Iterations = route changes + shakes + rejected + no move drawn. The last
    // term is the iterations whose operator had an empty feasible set: they
    // propose nothing, so they leave no row in the trace.
    const noMove=T.no_move??0, iters=T.iterations??0;
    $("stats").innerHTML=
      st("Best objective",fmt(D.hi/1.003))+st("Route changes",fmt(n.accepted))+
      st("Shakes",fmt(n.shake))+st("Rejected",fmt(rejected))+
      (noMove?st("No move drawn",fmt(noMove)):"")+
      (iters?st("Iterations",fmt(iters)):"")+
      st("Frames shown",fmt(D.frames.length));
    render();
  }

  function wire(){
    on(window,"resize",render);
    map.addEventListener("pointermove",hover);
    map.addEventListener("pointerleave",()=>{$("tip").hidden=true;});
    $("play").onclick=e=>{playing=!playing;last=0;
      e.target.textContent=playing?"Pause":"Play";if(playing)requestAnimationFrame(tick);};
    $("next").onclick=()=>go(i+1);
    $("prev").onclick=()=>go(i-1);
    const wn=$("winNext");
    if(wn) wn.onclick=()=>{const A=D.lopt||[];if(!A.length)return;
      const k=A.find(j=>j>i);go(k!=null?k:A[0]);};
    $("tobest").onclick=()=>{
      let bi=0,bv=-Infinity;D.frames.forEach((f,k)=>{if(f.b>bv){bv=f.b;bi=k;}});go(bi);};
    ["tProp","tWin","tIds"].forEach(id=>$(id).onchange=render);
    const scrub=ev=>{const r=tl.getBoundingClientRect();
      const t=Math.max(0,Math.min(1,(ev.clientX-r.left)/r.width))*D.budget;
      let bi=0,bd=Infinity;D.frames.forEach((f,k)=>{const d=Math.abs(f.t-t);if(d<bd){bd=d;bi=k;}});go(bi);};
    tl.onpointerdown=e=>{tl.setPointerCapture(e.pointerId);scrub(e);};
    tl.onpointermove=e=>{if(e.buttons)scrub(e);};
    tl.onkeydown=e=>{if(e.key==="ArrowRight")go(i+1);if(e.key==="ArrowLeft")go(i-1);};
    on(window,"keydown",e=>{
      if(e.target.tagName==="INPUT"||e.target.tagName==="SELECT")return;
      if(e.key==="ArrowRight")go(i+1);if(e.key==="ArrowLeft")go(i-1);
      if(e.key===" "){e.preventDefault();$("play").click();}});
  }
  const st=(k,v)=>`<div class="stat"><dt>${k}</dt><dd>${v}</dd></div>`;


  wire();

// ---- slide-over panels ----------------------------------------------------
function soClose(id){const p=document.getElementById(id);if(!p)return;
  p.classList.remove('open');p.setAttribute('aria-hidden','true');
  document.querySelectorAll('.sotab').forEach(t=>t.setAttribute('aria-expanded','false'));}
function soOpen(id,btn){
  const panel=document.getElementById(id);
  if(!panel) return;
  document.querySelectorAll(".slideover").forEach(p=>{
    const on = p.id===id && !p.classList.contains("open");
    p.classList.toggle("open",on); p.setAttribute("aria-hidden",String(!on));
  });
  document.querySelectorAll(".sotab").forEach(b=>
    b.setAttribute("aria-expanded",String(b===btn && panel.classList.contains("open"))));
  const w=document.getElementById("soWins");
  if(w && w.classList.contains("open"))
    requestAnimationFrame(()=>requestAnimationFrame(drawWindows));   // after layout
}
function soDrag(){
  // The grip narrows the panel rather than sliding it away: pulled in far
  // enough it keeps only the route in view and hands the rest of the screen
  // back to the search play. The width is inline, so a choice made here sticks
  // until the next drag.
  document.querySelectorAll(".slideover").forEach(p=>{
    const grip=p.querySelector(".sogrip"); if(!grip) return;
    const full=()=>p.classList.contains("wide")?Math.min(1100,window.innerWidth*.96)
                                               :Math.min(560,window.innerWidth*.94);
    let x0=0,w0=0,dragging=false,raf=0;
    const apply=w=>{
      p.style.width=w+"px";
      p.classList.toggle("narrow",w<full()*.62);   // drops the best-route figure
      if(p.id==="soWins"&&!raf) raf=requestAnimationFrame(()=>{raf=0;drawWindows();});
    };
    const move=e=>{ if(dragging) apply(Math.max(360,Math.min(full(),w0-(e.clientX-x0)))); };
    const up=()=>{ if(!dragging) return; dragging=false; p.style.transition="";
      window.removeEventListener("pointermove",move);
      window.removeEventListener("pointerup",up);
      if(p.id==="soWins") drawWindows(); };
    on(grip,"pointerdown",e=>{ dragging=true; x0=e.clientX; w0=p.offsetWidth;
      p.style.transition="none"; e.preventDefault();
      window.addEventListener("pointermove",move);
      window.addEventListener("pointerup",up); });
  });
}
function soWire(){
  // The tab and close buttons are wired by the component that renders them,
  // through openPanel/closePanel below. Nothing here may listen for those
  // clicks as well: soOpen toggles, so a second handler on the same click
  // closes what the first one opened and the panel never appears to move.
  // Registered through on(), so destroy() takes them off again -- a second
  // createViewer would otherwise leave these closed over the first one's data.
  soDrag();
  on(document,"keydown",e=>{ if(e.key==="Escape")
    document.querySelectorAll(".slideover.open").forEach(p=>{
      p.classList.remove("open"); p.setAttribute("aria-hidden","true");
      document.querySelectorAll(".sotab").forEach(t=>t.setAttribute("aria-expanded","false")); }); });
  on(window,"resize",()=>{ const w=document.getElementById("soWins");
    if(w && w.classList.contains("open")) drawWindows(); });
}
const OPLBL={add:"Insert",replace:"Replace",swap:"Swap",two_opt:"2-opt"};
function fillStats(){
  if(!D||!document.getElementById("statsBody")) return;
  const s=D.stats||{}, t=D.totals||{};
  $("statsSub").textContent =
    D.instance+" — "+fmt(t.iterations||0)+" iterations, "+fmt(t.accepted||0)+" route changes";
  const cell=(k,v)=>`<div><div class="k">${k}</div><div class="v">${v}</div></div>`;
  let h='<div class="sgrid">';
  h+=cell("Wall clock",(s.wall!=null?s.wall+" s":"—"));
  h+=cell("Per iteration",(s.ms_per_iter!=null?s.ms_per_iter+" ms":"—"));
  if(s.socp){
    h+=cell("Subproblem share",s.socp.pct+"% of wall");
    h+=cell("Subproblem solves",fmt(s.socp.calls)+" · "+s.socp.ms_each+" ms each");
  }else{
    h+=cell("Subproblem solves",fmt(s.solved||0)+" evaluated");
    h+=cell("Subproblem share","not recorded");
  }
  h+=cell("Infeasible at the solve",(s.infeas_pct!=null?s.infeas_pct+"%":"—"));
  if(s.ts_reject!=null) h+=cell("Screened before it",fmt(s.ts_reject)+" routes");
  h+=cell("Local optima",fmt((s.gap&&s.gap.n)||0)+" shakes");
  h+=cell("Gap between them",(s.gap?fmt(s.gap.max)+" max · "+fmt(s.gap.avg)+" mean":"—"));
  h+='</div>';
  h+='<table class="stab"><thead><tr><th>Operator</th><th>accepted</th><th>refused</th>'+
     '<th>infeasible</th><th>rate</th></tr></thead><tbody>';
  for(const o of ["add","replace","swap","two_opt"]){
    const v=(s.ops||{})[o]; if(!v) continue;
    h+=`<tr><td>${OPLBL[o]}</td><td>${fmt(v.acc)}</td><td>${fmt(v.ref)}</td>`+
       `<td>${fmt(v.inf)}</td><td>${v.rate}%</td></tr>`;
  }
  h+='</tbody></table>';
  if(s.sets){
    h+='<table class="stab"><thead><tr><th>Move set</th><th>min</th><th>mean</th><th>max</th>'+
       '</tr></thead><tbody>';
    for(const o of ["add","replace","swap","two_opt"]){
      const v=s.sets[o]; if(!v) continue;
      h+=`<tr><td>${OPLBL[o]}</td><td>${v.min}</td><td>${v.avg}</td><td>${fmt(v.max)}</td></tr>`;
    }
    h+='</tbody></table>';
  }
  $("statsBody").innerHTML=h;
}
function drawOne(cv,cap,fr,label){
  if(!cv||!cap) return;
  const dpr=window.devicePixelRatio||1;
  if(!fr||!fr.wlo){ cap.textContent=label+" — not recorded"; cv.height=0; return; }
  // r[0] is the depot and wlo/whi/a are aligned with r, so the row index is the
  // index into r: the depot is row 0, drawn at the bottom, and the visiting
  // order runs upward from it.
  const r=fr.r, n=r.length;
  // Fit the rows to the panel when it is tall enough to hold them all, so the
  // whole route reads at once. 9px is the floor at which the row number and the
  // min-max label stay legible; under that the rows stay at 9px and it scrolls.
  const CHROME=48+67;                      // the button row, and the axis and legend inside
  const pan=cv.closest&&cv.closest(".slideover");
  const room=pan?pan.clientHeight-(cv.getBoundingClientRect().top
                                   -pan.getBoundingClientRect().top)-CHROME:0;
  const rowH=Math.max(9,Math.min(15,(room>0?room:520)/Math.max(1,n)));
  const W=cv.clientWidth||cv.parentElement.clientWidth||cv.getBoundingClientRect().width||460;
  const T=D.horizon||Math.max(...D.nodes.map(x=>x.l));
  const g=cv.getContext("2d"), FONT="9px "+getComputedStyle(root).fontFamily;
  // Measure before sizing the canvas, because setting its width resets the
  // context: the right gutter and the legend layout both depend on the text.
  g.font=FONT;
  // The information on offer over the whole time window: I is linear in the
  // arrival, so its extremes are the two ends of [e,l]. These labels get a
  // gutter of their own on the right, where they cannot cover a bar.
  const lbl=r.map((id,q)=>{ if(!q) return "";
    const nd=D.byId[id], i1=nd.i0, i2=nd.g*(nd.l-nd.e)+nd.i0;
    return Math.round(Math.min(i1,i2))+"–"+Math.round(Math.max(i1,i2)); });
  const gut=Math.max(...lbl.map(s=>g.measureText(s).width))+10;
  const L=44, R=W-8-gut, X=v=>L+(R-L)*Math.max(0,Math.min(1,v/T));
  const KEY=[["win","time window [eᵢ, ℓᵢ]"],
             ["pos","realized, γᵢ > 0 (later is better)"],
             ["dot","arrival"],
             ["neg","realized, γᵢ < 0 (earlier is better)"]];
  const cw=(W-8-L)/2;
  const two=KEY.every(([,t])=>15+g.measureText(t).width<=cw-6);   // else one column
  const NOTE=["number at the right: min and max information over the time window [eᵢ, ℓᵢ]",
              "right: min–max information over [eᵢ, ℓᵢ]"];
  const note=NOTE.find(t=>15+g.measureText(t).width<=W-8-L)||NOTE[NOTE.length-1];
  const legRows=(two?2:KEY.length)+1;
  const top=8, axisY=top+n*rowH+7, ly=axisY+24, H=Math.round(ly+(legRows-1)*13+10);
  if(cv.width!==W*dpr||cv.height!==H*dpr){      // reallocating clears it; only when it changed
    cv.width=W*dpr; cv.height=H*dpr; cv.style.height=H+"px"; }
  g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,W,H);
  g.font=FONT; g.textBaseline="middle";
  const yOf=q=>top+(n-1-q)*rowH;           // q=0, the depot, at the bottom
  const C={line:css("--line"),ink:css("--ink"),muted:css("--muted"),
           pos:css("--twoopt"),neg:css("--replace"),ghost:css("--ghost"),
           arr:css("--shake")};
  cap.textContent=label+" — iteration "+fmt(fr.it)+", "+(n-1)+" targets, objective "+fmt(fr.f);
  for(let q=0;q<n;q++){
    const nd=D.byId[r[q]], y=yOf(q), h=Math.max(3,rowH-3), mid=y+h/2, depot=q===0;
    g.fillStyle=C.line; g.globalAlpha=.55;
    g.fillRect(X(nd.e),y,Math.max(1,X(nd.l)-X(nd.e)),h);
    g.globalAlpha=1;
    g.fillStyle=C.muted; g.textAlign="right";
    g.fillText(depot?"depot":String(nd.id),L-5,mid);
    const lo=fr.wlo[q], hi=fr.whi[q];
    if(lo!=null&&hi!=null){
      // a realized window is often a few seconds against a horizon of hours, so
      // it would be a fraction of a pixel; draw it at a visible minimum width
      const x0=X(lo), w=Math.max(4,X(hi)-x0);
      g.fillStyle=depot?C.ghost:(nd.g>0?C.pos:C.neg);
      g.fillRect(x0,y,w,h);
      g.strokeStyle=C.ink; g.globalAlpha=.35; g.lineWidth=.6;
      g.strokeRect(x0+.3,y+.3,w-.6,h-.6); g.globalAlpha=1;
    }
    if(!depot){ g.fillStyle=nd.g>0?C.pos:C.neg; g.textAlign="right";
                g.fillText(lbl[q],W-8,mid); }
    const a=fr.a&&fr.a[q];
    if(a!=null){ g.fillStyle=C.arr; g.beginPath(); g.arc(X(a),mid,1.2,0,6.284); g.fill(); }
  }
  g.strokeStyle=C.line; g.beginPath(); g.moveTo(L,axisY); g.lineTo(R,axisY); g.stroke();
  g.fillStyle=C.muted;
  g.textAlign="left"; g.fillText("0",L,axisY+9);
  g.textAlign="right"; g.fillText(Math.round(T)+" s",R,axisY+9);
  g.save(); g.translate(9,(top+axisY)/2); g.rotate(-Math.PI/2);
  g.textAlign="center"; g.fillText("visiting order (depot at the bottom)",0,0); g.restore();
  {                                         // legend under the axis
    const sw=(x,yy,c,al)=>{g.fillStyle=c;g.globalAlpha=al||1;g.fillRect(x,yy-3.5,11,7);g.globalAlpha=1;};
    const mark={win:(x,y)=>sw(x,y,C.line,.55), pos:(x,y)=>sw(x,y,C.pos),
                neg:(x,y)=>sw(x,y,C.neg),
                dot:(x,y)=>{g.fillStyle=C.arr;g.beginPath();g.arc(x+5,y,1.2,0,6.284);g.fill();}};
    g.textAlign="left";
    KEY.forEach(([k,txt],idx)=>{
      const x=L+(two?idx%2:0)*cw, y=ly+(two?idx>>1:idx)*13;
      mark[k](x,y); g.fillStyle=C.muted; g.fillText(txt,x+15,y);
    });
    g.fillStyle=C.muted; g.fillText(note,L+15,ly+(legRows-1)*13);
  }
}
function drawWindows(){
  if(!D) return;
  const s=D.stats||{};
  drawOne($("cvNow"),$("capNow"),D.frames[i],"Route in view");
  drawOne($("cvBest"),$("capBest"),
          s.best_i!=null?D.frames[s.best_i]:null,"Best route");
}

  return {
    load,
    openPanel(which){            // "stats" | "windows"
      if(which==="stats") fillStats();
      soOpen(which==="stats" ? "soStats" : "soWins",
             document.getElementById(which==="stats" ? "tabStats" : "tabWins"));
    },
    closePanel(id){ soClose(id); },
    destroy() {
      playing = false;
      for (const [t, e, f] of listeners) t.removeEventListener(e, f);
    },
  };
}
