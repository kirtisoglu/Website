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
      row("Best so far",fmt(f.b))+row("Rejected since",fmt(f.np));
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
      D.frames[i].t.toFixed(1)+" s  ·  event "+(i+1)+" of "+D.frames.length;}

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
  return {
    load,
    destroy() {
      playing = false;
      for (const [t, e, f] of listeners) t.removeEventListener(e, f);
    },
  };
}
