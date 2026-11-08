// The one list of papers for the site. Edit a paper here and the Research
// page picks it up. `group` decides the section; papers are numbered in the
// order they appear below. `abstract` is HTML (for <sub>/<sup>).

export const groups = [
  { id: 'review', title: 'Under review & preprints' },
  { id: 'published', title: 'Published' },
  { id: 'progress', title: 'In progress' },
];

const ME = 'Alaittin Kirtisoglu';

export const papers = [
  {
    id: 'falcom',
    group: 'review',
    status: 'Submitted',
    title: 'FalCom: A Sampling Method for Districting and Hierarchical Facility Location',
    authors: [ME, 'Hemanshu Kaul'],
    venue: 'Extended abstract at <a href="https://isco2026.com.tr/" target="_blank" rel="noopener">ISCO 2026</a>',
    video: { thumb: '/videos/thumbs/falcom', full: '/falcom-gif/falcom_linkedin.mp4', alt: 'The FalCom chain on a 400-cell grid, on the cell map and on the dual graph.' },
    links: [
      { label: 'Visualizer', href: '/research/falcom/dashboard/' },
      { label: 'London case study', href: '/falcomplot/las_hierarchy.html' },
      { label: 'Code', href: 'https://github.com/kirtisoglu/FalcomChain' },
    ],
    abstract: `<p>Districting partitions geographic areas into balanced, contiguous, and compact service districts. Recent advances in political redistricting have demonstrated the potential of recombination-type Markov chain Monte Carlo (MCMC) methods for exploring the space of feasible districting plans and revealing structural alternatives. The hierarchical capacitated facility location problem, in contrast, concerns facility placement and demand allocation across multiple service levels, subject to capacity constraints, but does not generally require districts to be contiguous.</p><p>In this paper, we introduce <em>FalCom</em> (Facility Location Combination), a recombination-type MCMC sampler for hierarchical districting with capacitated facility assignments. FalCom partitions a geographic region at two hierarchical levels, assigns a facility and a capacity to every district, balance districts according to the capacity constraints, and allows the number of districts to emerge from capacity and demand requirements. We validate FalCom against exact enumeration on small instances and evaluate its computational scaling on synthetic grids with up to 50,000 basic units. We also run it as an annealing optimizer on grids of 100 and 400 basic units under different demand scenarios, FalCom finds nearly the same or better solutions than the mixed-integer programming solver. Finally, we apply FalCom to the London Ambulance Service, using data on its 66 real ambulance stations. The resulting ensemble characterizes the variation of response-area boundaries, station workloads and operational groupings under the sampler's law, and provides a distributional reference for assessing the existing service layout.</p>`,
  },
  {
    id: 'uav-routing',
    group: 'review',
    status: 'Submitted',
    title: 'Fixed-Wing UAV Routing for Time-Dependent Information Collection with Speed and Loiter Decisions',
    authors: [ME, 'Melis Boran', 'Mustafa Kemal Tural'],
    venue: '2026',
    video: { thumb: '/videos/thumbs/uav_flight', full: '/videos/uav_flight.mp4', alt: 'A fixed-wing UAV flying the best route found on a 200-target instance.' },
    links: [
      { label: 'Search replay', href: '/research/uav-routing/animation/' },
      { label: 'Code', href: 'https://github.com/kirtisoglu/UAV-Routing' },
    ],
    abstract: `We study a routing problem in which a single fixed-wing unmanned aerial vehicle (UAV) selects a subset of targets, each with a time window, and determines the order in which to visit them so as to maximize the total information collected, where the information at a target varies linearly with the arrival time. The UAV chooses a continuous speed on every flight leg and, being unable to hover, may loiter between consecutive targets to delay an arrival when the time window or the information profile makes a later arrival preferable. A nonlinear propulsion model couples speed to energy consumption, and total consumption is bounded by the onboard energy budget. We prove that flying each leg at a single constant speed is energy-optimal, which justifies the per-leg speed model, and formulate the problem as a mixed-integer nonlinear program with an exact reformulation as a mixed-integer second-order cone program. We then develop a matheuristic based on iterated local search in which every candidate route is evaluated using a convex second-order cone program. Experiments on Solomon, Gehring–Homberger, and Cordeau instances calibrated to realistic fixed-wing UAV missions show that the exact approach is limited to small or tightly windowed instances, whereas the matheuristic scales to hundreds of targets and matches or improves on the exact solver’s solutions. Optimizing speed on each leg, rather than cruising at a fixed speed, substantially increases the information collected, and allowing the UAV to loiter adds a further gain.`,
  },
  {
    id: 'rendezvous',
    group: 'review',
    status: 'Preprint',
    title: 'Multi-Place Robot Rendezvous Problem with Campaign Time and Energy Consumption Restrictions',
    authors: ['Nazlı Dolu Hastürk', 'Mustafa Kemal Tural', ME],
    venue: '2026',
    video: { thumb: '/videos/thumbs/rendezvous_schedule', full: '/videos/rendezvous_schedule.mp4', alt: 'A tanker robot recharging 15 worker robots at rendezvous places, with the schedule as a Gantt chart.' },
    links: [],
    abstract: `A tanker robot recharges a team of mobile worker robots, meeting each at a rendezvous place of its own choosing, while every robot chooses its speed on every leg under a speed-dependent energy model. We minimise either the total energy under a campaign time limit or the campaign time itself. For a fixed meeting order the problem is a second-order cone program; the meeting order is searched with 2-opt and 3-opt edge exchange heuristics and with fixed-radius, candidate-list and don't-look-bit speed-ups that decide which candidate orders are worth solving.`,
  },
  {
    id: 'bicolored-paths',
    group: 'published',
    title: 'Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length',
    authors: [ME, 'Lale Özkahya'],
    venue: '<i>Graphs and Combinatorics</i> 40(1), Art. 11, 2024',
    links: [
      { label: 'Journal', href: 'https://link.springer.com/article/10.1007/s00373-023-02739-4' },
      { label: 'arXiv', href: 'https://arxiv.org/abs/2012.04560' },
    ],
    bibtex: `@article{Kirtisoglu2024,
  author    = {Kirtisoglu, Alaittin and {\\"{O}}zkahya, Lale},
  title     = {Coloring of graphs avoiding bicolored paths of a fixed length},
  journal   = {Graphs and Combinatorics},
  volume    = {40},
  number    = {1},
  pages     = {11},
  year      = {2024},
  doi       = {10.1007/s00373-023-02739-4}
}`,
    abstract: `The problem of finding the minimum number of colors to color a graph properly without containing any bicolored copy of a fixed family of subgraphs has been widely studied. Most well-known examples are star coloring and acyclic coloring of graphs (Grünbaum, 1973) where bicolored copies of P<sub>4</sub> and cycles are not allowed, respectively. In this paper, we introduce a variation of these problems and study proper coloring of graphs not containing a bicolored path of a fixed length and provide general bounds for all graphs. A P<sub>k</sub>-coloring of an undirected graph G is a proper vertex coloring of G such that there is no bicolored copy of P<sub>k</sub> in G, and the minimum number of colors needed for a P<sub>k</sub>-coloring of G is called the <i>P<sub>k</sub>-chromatic number</i> of G, denoted by s<sub>k</sub>(G). We provide bounds on s<sub>k</sub>(G) for all graphs, in particular, proving that for any graph G with maximum degree d ≥ 2, and k ≥ 4, <span style="white-space: nowrap">s<sub>k</sub>(G) ≤ ⌈6√10&#8202;d<sup>(k−1)/(k−2)</sup>⌉</span>. Moreover, we find the exact values for the P<sub>k</sub>-chromatic number of the products of some cycles and paths for k = 5, 6.`,
  },
  {
    id: 'chicago-fqhc',
    group: 'progress',
    title: 'Optimization-Based Decision Support for Equitable Expansion of Federally Qualified Health Centers in Chicago',
    authors: [ME, 'Kim Erwin', 'Hemanshu Kaul'],
    links: [
      { label: 'Healthcare dashboard', href: '/research/chicago-healthcare-network/dashboard' },
      { label: 'Data sources', href: '/research/chicago-healthcare-network/' },
      { label: 'Code', href: 'https://github.com/kirtisoglu/Chicago-Healthcare-Network' },
    ],
    abstract: `We identify four critical gaps in the current HRSA's granting system for Federally Qualified Health Centers (FQHCs): the absence of location-evaluation tools; an outdated Index of Medical Underservice (IMU) formula; a limited Medically Underserved Area (MUA) designation process; and unmapped referral networks between FQHCs and hospitals. We show how optimization can address each. Integrating a flow-based model into the FalCom sampler, we design catchment areas and hospital-anchored health zones that satisfy HRSA's compliance requirements while balancing demand and capacity, and improving real-time transportation accessibility. We also propose an updated IMU formula, and outline a follow-up effort to map Chicago's physician referral network. To the best of our knowledge, this is the first paper bringing solutions from operations research to the location decisions of FQHCs.`,
  },
  {
    id: 'diffusion-walk',
    group: 'progress',
    title: 'The Diffusion Walk: Sampling Graph Partitions with Kernel-Aware Local Refinements',
    authors: [ME, 'Onur Ongun'],
    links: [
      { label: 'Code', href: 'https://github.com/kirtisoglu/Redistricting_Diffusion_Model' },
    ],
    abstract: `ReCom variants, the dominant MCMC methods for political redistricting, are computationally efficient but geometrically blind. We propose a hybrid sampler that complements ReCom with a kernel-aware local-refinement step, based on a graph-diffusion energy formulated as an integer quadratic program. Our results show that the hybrid model admits configurable Laplacian kernels (perimeter, density, demographic) plus a fidelity term that anchors refinement near the current partition. On Iowa precincts, the integer variant reduces mean cut edges by 23.9% vs. ReCom.`,
  },
];

export const talks = [
  { date: 'May 2026', venue: 'Middle East Technical University, Industrial Engineering Departmental Seminars, Ankara', title: 'Sampling Solutions for Districting Problems and Hierarchical Facility Location Solutions with Real-World Applications' },
  { date: 'May 2026', venue: '<a href="https://isco2026.com.tr/" target="_blank" rel="noopener">ISCO 2026</a>, Kuşadası, Turkey', title: 'Sampling Solutions for Districting Problems and Hierarchical Facility Location Solutions with Real-World Applications' },
  { date: 'Apr 2026', venue: 'Illinois Institute of Technology, Discrete Math Seminars, Chicago', title: 'UAV Routing for Maximum Information Collection under Time Windows' },
  { date: 'Aug 2021', venue: 'British Combinatorial Conference, online', title: 'Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length' },
  { date: 'Jul 2021', venue: 'SIAM Conference on Discrete Mathematics, online', title: 'Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length' },
  { date: 'Jun 2021', venue: 'European Combinatorial Conference, online', title: 'Coloring of Graphs Avoiding Bicolored Paths of a Fixed Length' },
];
