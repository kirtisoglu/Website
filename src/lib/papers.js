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
    id: 'uav-routing',
    group: 'review',
    status: 'Submitted',
    title: 'Fixed-Wing UAV Routing for Time-Dependent Information Collection with Speed and Loiter Decisions',
    authors: [ME, 'Melis Boran', 'Mustafa Tural'],
    venue: '2026',
    summary: 'Choosing a speed on every leg and loitering when it pays off collects substantially more information than flying at a fixed speed.',
    video: { thumb: '/videos/thumbs/uav_flight', full: '/videos/uav_flight.mp4', alt: 'A fixed-wing UAV flying the best route found on a 200-target instance.' },
    links: [
      { label: 'Search replay', href: '/research/uav-routing/animation/' },
      { label: 'Code', href: 'https://github.com/kirtisoglu/UAV-Routing' },
    ],
    abstract: `We study a routing problem in which a single fixed-wing unmanned aerial vehicle (UAV) selects a subset of targets, each with a time window, and determines the order in which to visit them so as to maximize the total information collected, where the information at a target varies linearly with the arrival time. The UAV chooses a continuous speed on every flight leg and, being unable to hover, may loiter between consecutive targets to delay an arrival when the time window or the information profile makes a later arrival preferable. A nonlinear propulsion model couples speed to energy consumption, and total consumption is bounded by the onboard energy budget. We prove that flying each leg at a single constant speed is energy-optimal, which justifies the per-leg speed model, and formulate the problem as a mixed-integer nonlinear program with an exact reformulation as a mixed-integer second-order cone program. We then develop a matheuristic based on iterated local search in which every candidate route is evaluated using a convex second-order cone program. Experiments on Solomon, Gehring–Homberger, and Cordeau instances calibrated to realistic fixed-wing UAV missions show that the exact approach is limited to small or tightly windowed instances, whereas the matheuristic scales to hundreds of targets and matches or improves on the exact solver’s solutions. Optimizing speed on each leg, rather than cruising at a fixed speed, substantially increases the information collected, and allowing the UAV to loiter adds a further gain.`,
  },
  {
    id: 'falcom',
    group: 'review',
    status: 'Preprint',
    title: 'FalCom: A Sampling Method for Districting and Hierarchical Facility Location',
    authors: [ME, 'Hemanshu Kaul'],
    venue: 'Extended abstract at <a href="https://isco2026.com.tr/" target="_blank" rel="noopener">ISCO 2026</a>',
    summary: 'The first MCMC sampler for hierarchical capacitated facility location and districting, scaling to 50,000 units.',
    video: { thumb: '/videos/thumbs/falcom', full: '/falcom-gif/falcom_linkedin.mp4', alt: 'The FalCom chain on a 400-cell grid, on the cell map and on the dual graph.' },
    links: [
      { label: 'Visualizer', href: '/research/falcom/dashboard/' },
      { label: 'London case study', href: '/falcomplot/las_hierarchy.html' },
      { label: 'Code', href: 'https://github.com/kirtisoglu/FalcomChain' },
    ],
    abstract: `We introduce FalCom, the first Markov chain Monte Carlo sampling framework for hierarchical capacitated facility location and districting problems. FalCom extends the spanning-tree proposal of ReCom from single-level political redistricting to multi-level service systems with capacity bounds, demand balance, and facility-aware cut selection. We demonstrate that it scales to graphs of 50,000 basic units, an order of magnitude beyond published hierarchical facility-location methods. Rather than returning a single optimum, FalCom samples ensembles of feasible plans, enabling boundary-robustness maps, essential-vs-substitutable facility analysis, and capacity-utilization distributions that no single-solution method can produce. The framework is validated on synthetic grids and a London Ambulance Service case study and released as an open-source Python library with an interactive visualizer.`,
  },
  {
    id: 'rendezvous',
    group: 'review',
    status: 'Preprint',
    title: 'Multi-Place Robot Rendezvous Problem with Campaign Time and Energy Consumption Restrictions',
    authors: ['Nazlı Dolu Hastürk', 'Mustafa Tural', ME],
    venue: '2026',
    summary: 'A tanker robot recharges a team of workers at rendezvous places it chooses, under a campaign time limit.',
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
    summary: 'How many colors you need so that no path of length k alternates between just two colors.',
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
    abstract: `We study proper vertex colorings of graphs that avoid bicolored paths of a fixed length, that is, paths whose vertices alternate between exactly two colors. We introduce the P<sub>k</sub>-chromatic number s<sub>k</sub>(G), the minimum number of colors needed for such a coloring. For any graph with maximum degree d ≥ 2 and k ≥ 4, we establish that s<sub>k</sub>(G) = O(d<sup>(k−1)/(k−2)</sup>). We also determine exact values of s<sub>k</sub> for products of cycles and paths when k = 5 and k = 6. The problem generalizes classical star coloring and acyclic coloring and connects chromatic theory with Ramsey-type structural questions.`,
  },
  {
    id: 'chicago-fqhc',
    group: 'progress',
    title: 'Optimization-Based Decision Support for Equitable Expansion of Federally Qualified Health Centers in Chicago',
    authors: [ME, 'Hemanshu Kaul'],
    summary: "Optimization tools for where Chicago's community health centers should expand, built on the FalCom sampler.",
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
    authors: [ME],
    summary: 'A redistricting sampler that adds geometry-aware local refinements to ReCom, cutting 23.9% fewer edges on Iowa precincts.',
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
