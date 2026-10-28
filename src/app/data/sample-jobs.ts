import { JobPosting, UserSkillProficiency } from '../models/job.model';

export const DEFAULT_USER_SKILLS: UserSkillProficiency[] = [
  { skillId: 'ls_dyna', name: 'LS-DYNA Explicit FEA', category: 'ls_dyna', level: 4 },
  { skillId: 'crash_safety', name: 'Crash Safety & FMVSS/NCAP', category: 'crash_safety', level: 4 },
  { skillId: 'nonlinear_fea', name: 'Nonlinear Finite Element Analysis', category: 'ls_dyna', level: 4 },
  { skillId: 'omsa_analytics', name: 'OMSA / Applied Statistics & Modeling', category: 'omsa_analytics', level: 3 },
  { skillId: 'ai_ml', name: 'Machine Learning & Deep Learning', category: 'ai_ml', level: 3 },
  { skillId: 'pinns_surrogates', name: 'Physics-Informed ML & Surrogate Modeling', category: 'ai_ml', level: 3 },
  { skillId: 'python', name: 'Python & Data Analysis (NumPy/Pandas)', category: 'omsa_analytics', level: 4 },
  { skillId: 'pytorch', name: 'PyTorch / Neural Networks', category: 'ai_ml', level: 3 },
  { skillId: 'optimization', name: 'Mathematical Optimization & Simulation', category: 'omsa_analytics', level: 3 },
  { skillId: 'hypermesh_primer', name: 'HyperMesh / ANSA / Primer / D3PLOT', category: 'engineering_tools', level: 4 },
  { skillId: 'hpc_linux', name: 'HPC & Linux Shell Scripting', category: 'engineering_tools', level: 3 },
  { skillId: 'biomechanics_atd', name: 'ATD Occupant Safety & Biomechanics', category: 'crash_safety', level: 3 },
];

export const SAMPLE_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Senior CAE Crash & Safety Simulation Engineer',
    company: 'Tesla',
    location: 'Palo Alto, CA / Fremont, CA',
    workplaceType: 'Hybrid',
    experienceLevel: 'Senior',
    salaryRange: '$150,000 - $210,000 + Equity',
    postedDate: '2 days ago',
    applyUrl: 'https://www.tesla.com/careers',
    category: 'Crash & LS-DYNA',
    description: 'Lead structural crashworthiness and passive safety simulation for next-generation vehicle architectures at Tesla. You will formulate complex explicit dynamic finite element simulations using LS-DYNA, evaluate structural deformation modes, optimize energy-absorbing structural members, and ensure 5-star US-NCAP and Euro-NCAP compliance.',
    responsibilities: [
      'Build, calibrate, and execute vehicle full-scale frontal, side, and rear impact finite element models in LS-DYNA.',
      'Correlate physical crash test data (accelerometers, load cells, high-speed photogrammetry) with virtual simulations.',
      'Perform DOE (Design of Experiments) and structural multi-objective topology and gage optimization.',
      'Automate CAE workflows and post-processing using Python and Linux scripting on large HPC clusters.'
    ],
    requiredSkills: ['LS-DYNA Explicit FEA', 'Crash Safety & FMVSS/NCAP', 'Nonlinear Finite Element Analysis', 'HyperMesh / ANSA / Primer / D3PLOT', 'Python & Data Analysis (NumPy/Pandas)'],
    preferredSkills: ['HPC & Linux Shell Scripting', 'Mathematical Optimization & Simulation', 'ATD Occupant Safety & Biomechanics'],
    hybridAdvantage: 'Your unique combination of deep LS-DYNA crash modeling with OMSA data analytics allows you to perform advanced stochastic crash correlation and automate massive HPC simulation post-processing with Python data pipelines.',
    resumeTalkingPoints: [
      'Highlight 4+ years of explicit non-linear dynamic FEA using LS-DYNA on full-vehicle crash test configurations.',
      'Showcase Python automation scripts for parsing D3PLOT and binout time-series data to accelerate crash pulse evaluations.',
      'Emphasize knowledge of FMVSS 208, 214, 216 and IIHS Small Overlap crash testing requirements.'
    ]
  },
  {
    id: 'job-2',
    title: 'Staff Machine Learning Engineer - Physics & CAE Simulation',
    company: 'Altair Engineering',
    location: 'Troy, MI / Remote',
    workplaceType: 'Remote',
    experienceLevel: 'Staff/Principal',
    salaryRange: '$165,000 - $225,000 + Bonus',
    postedDate: 'Just now',
    applyUrl: 'https://www.altair.com/careers',
    category: 'AI + Simulation',
    description: 'Altair is building the future of physics-AI. In this role, you will bridge the gap between traditional non-linear mechanical simulations (LS-DYNA, OptiStruct, Radioss) and deep learning. You will develop Physics-Informed Neural Networks (PINNs) and Reduced-Order Surrogate Models (ROMs) capable of predicting crash pulse and structural deformation in milliseconds instead of hours.',
    responsibilities: [
      'Design deep learning architectures (Graph Neural Networks, PINNs, Transformers) trained on FEA mesh and stress tensors.',
      'Build AI surrogate models replacing expensive non-linear explicit dynamic crash simulations in early vehicle design phases.',
      'Synthesize FEA simulation outputs into clean ML training sets using Python, PyTorch, and geometric deep learning.',
      'Collaborate with automotive OEMs to deploy real-time ML-driven design exploration tools.'
    ],
    requiredSkills: ['Machine Learning & Deep Learning', 'Physics-Informed ML & Surrogate Modeling', 'PyTorch / Neural Networks', 'Python & Data Analysis (NumPy/Pandas)', 'LS-DYNA Explicit FEA'],
    preferredSkills: ['OMSA / Applied Statistics & Modeling', 'Mathematical Optimization & Simulation', 'HPC & Linux Shell Scripting'],
    hybridAdvantage: '99% of ML engineers do not understand non-linear explicit mechanics, and 99% of FEA engineers cannot train neural networks. Your bridge between LS-DYNA FEA mechanics and OMSA/PyTorch AI makes you the quintessential hire for next-gen physics surrogate modeling.',
    resumeTalkingPoints: [
      'Emphasize hands-on experience formulating surrogate neural networks from LS-DYNA FEA stress/strain output fields.',
      'Highlight Georgia Tech OMSA rigorous training in statistical learning theory, optimization, and high-dimensional regression.',
      'Detail PyTorch pipeline implementations connecting raw mesh simulation data to deep learning models.'
    ]
  },
  {
    id: 'job-3',
    title: 'Crashworthiness & Occupant Safety Modeling Specialist',
    company: 'Rivian',
    location: 'Irvine, CA / Plymouth, MI',
    workplaceType: 'Hybrid',
    experienceLevel: 'Senior',
    salaryRange: '$155,000 - $205,000 + Equity',
    postedDate: '3 days ago',
    applyUrl: 'https://rivian.com/careers',
    category: 'Crash & LS-DYNA',
    description: 'Join Rivian Safety Engineering to define structural crashworthiness and occupant safety for electric adventure vehicles (R1T, R1S, and R2 platform). You will be responsible for frontal, side pole, rear impact, and rollover LS-DYNA simulations, integrating battery pack safety enclosures and advanced Anthropomorphic Test Devices (ATD dummies).',
    responsibilities: [
      'Perform detailed LS-DYNA explicit simulations for full-vehicle crash, sled tests, and subsystem impact.',
      'Model high-voltage battery pack mechanical integrity under extreme impact and intrusive loads.',
      'Integrate THOR, Hybrid III, and WorldSID dummy finite element models to predict occupant injury metrics (HIC, Nij, Chest Deflection).',
      'Provide concrete design guidance to body-in-white (BIW) structures and restraints engineering.'
    ],
    requiredSkills: ['LS-DYNA Explicit FEA', 'Crash Safety & FMVSS/NCAP', 'ATD Occupant Safety & Biomechanics', 'HyperMesh / ANSA / Primer / D3PLOT', 'Nonlinear Finite Element Analysis'],
    preferredSkills: ['Python & Data Analysis (NumPy/Pandas)', 'Mathematical Optimization & Simulation'],
    hybridAdvantage: 'Rivian is heavily optimizing battery structural protection. Your background in LS-DYNA structural crash coupled with analytical data modeling ensures data-driven trade-off analysis between lightweighting and impact performance.',
    resumeTalkingPoints: [
      'Demonstrate mastery in LS-DYNA contact algorithms (*CONTACT_AUTOMATIC_SURFACE_TO_SURFACE, *CONTACT_TIED).',
      'Discuss battery pack crash intrusion modeling and structural deformation under pole impact (FMVSS 214 & IIHS Side 2.0).',
      'Point out occupant injury risk curve calculations and biomechanical dummy analysis.'
    ]
  },
  {
    id: 'job-4',
    title: 'Operations Research & Analytics Scientist (OMSA Focus)',
    company: 'Waymo',
    location: 'Mountain View, CA',
    workplaceType: 'Hybrid',
    experienceLevel: 'Senior',
    salaryRange: '$170,000 - $240,000 + Equity',
    postedDate: '1 week ago',
    applyUrl: 'https://waymo.com/careers',
    category: 'OMSA Analytics & Optimization',
    description: 'Waymo is expanding autonomous ride-hailing fleets worldwide. We are seeking an Operations Research & Analytics Scientist to formulate large-scale mathematical optimization, fleet rebalancing, safety risk quantification, and stochastic simulation models for autonomous fleet operations.',
    responsibilities: [
      'Formulate mixed-integer linear programming (MILP) and stochastic optimization models for autonomous vehicle dispatch and routing.',
      'Analyze safety critical disengagement scenarios and physical accident probability distributions using Bayesian statistics.',
      'Build end-to-end data processing pipelines using Python, SQL, and big data clusters.',
      'Partner with system safety engineers to quantify catastrophic collision severity and physical boundary conditions.'
    ],
    requiredSkills: ['OMSA / Applied Statistics & Modeling', 'Mathematical Optimization & Simulation', 'Python & Data Analysis (NumPy/Pandas)', 'Machine Learning & Deep Learning'],
    preferredSkills: ['Crash Safety & FMVSS/NCAP', 'HPC & Linux Shell Scripting'],
    hybridAdvantage: 'Having both Georgia Tech OMSA operations research skills and an engineering grasp of vehicle physical crash kinematics gives you rare credibility when evaluating real-world autonomous fleet safety hazards.',
    resumeTalkingPoints: [
      'Detail coursework and projects in Georgia Tech OMSA: Computational Data Analytics, Deterministic Optimization, and Simulation.',
      'Highlight statistical hypothesis testing and Monte Carlo risk simulations on high-dimensional fleet data.',
      'Mention Python and Gurobi / SciPy optimization modeling capabilities.'
    ]
  },
  {
    id: 'job-5',
    title: 'AI Simulation Engineer - Structural & Crash Modeling',
    company: 'Apple (Special Projects Group / Hardware)',
    location: 'Cupertino, CA / Sunnyvale, CA',
    workplaceType: 'On-site',
    experienceLevel: 'Senior',
    salaryRange: '$180,000 - $260,000 + RSU',
    postedDate: '4 days ago',
    applyUrl: 'https://jobs.apple.com',
    category: 'AI + Simulation',
    description: 'Work at the intersection of mechanical integrity, dynamic impact simulation, and modern artificial intelligence. Apple Hardware Technologies is pioneering AI-assisted structural analysis to evaluate drop, impact, shock, and dynamic deformation across advanced consumer hardware and next-generation mobility architectures.',
    responsibilities: [
      'Develop LS-DYNA and explicit non-linear FEA models for dynamic impact, shock, and structural drop testing.',
      'Deploy generative AI and neural operators (FNOs, DeepONets) to accelerate mechanical simulation runtimes by 100x.',
      'Process high-frequency telemetry, strain gage data, and high-speed video using computer vision and deep learning.',
      'Collaborate with materials science teams on strain-rate sensitive material constitutive laws (*MAT_024, *MAT_181).'
    ],
    requiredSkills: ['LS-DYNA Explicit FEA', 'Machine Learning & Deep Learning', 'Physics-Informed ML & Surrogate Modeling', 'PyTorch / Neural Networks', 'Nonlinear Finite Element Analysis'],
    preferredSkills: ['OMSA / Applied Statistics & Modeling', 'Python & Data Analysis (NumPy/Pandas)', 'HyperMesh / ANSA / Primer / D3PLOT'],
    hybridAdvantage: 'Apple values candidates who master both fundamental physical rigor (LS-DYNA mechanics) and cutting-edge machine learning (PyTorch, PINNs, surrogate modeling). Your profile is tailor-made for this exact intersection.',
    resumeTalkingPoints: [
      'Highlight expertise in high strain-rate dynamic impact and non-linear constitutive material modeling in LS-DYNA.',
      'Discuss implementation of PyTorch neural surrogate models trained on physical drop and crash test matrices.',
      'Showcase ability to derive actionable engineering insights combining physical experiments with ML predictions.'
    ]
  },
  {
    id: 'job-6',
    title: 'Autonomous Vehicle Safety & Crash Data Analytics Engineer',
    company: 'Zoox (Amazon)',
    location: 'Foster City, CA',
    workplaceType: 'Hybrid',
    experienceLevel: 'Mid-Level',
    salaryRange: '$140,000 - $190,000 + RSUs',
    postedDate: '5 days ago',
    applyUrl: 'https://zoox.com/careers',
    category: 'Crash & LS-DYNA',
    description: 'Zoox vehicles are bi-directional with symmetrical passive safety systems built from scratch. As a Crash & Safety Data Analytics Engineer, you will combine LS-DYNA crash simulation data with physical proving ground telemetry and fleet analytics to validate the safest passenger experience in the world.',
    responsibilities: [
      'Execute LS-DYNA multi-body and finite element simulations for bidirectional passenger crash protection.',
      'Analyze crash sensor trigger timing, airbag deployment algorithms, and passenger kinematics.',
      'Write data ingestion pipelines in Python to statistically validate safety metrics against FMVSS benchmarks.',
      'Build automated dashboards tracking virtual safety compliance across vehicle software release cycles.'
    ],
    requiredSkills: ['Crash Safety & FMVSS/NCAP', 'LS-DYNA Explicit FEA', 'Python & Data Analysis (NumPy/Pandas)', 'OMSA / Applied Statistics & Modeling'],
    preferredSkills: ['ATD Occupant Safety & Biomechanics', 'Machine Learning & Deep Learning', 'HyperMesh / ANSA / Primer / D3PLOT'],
    hybridAdvantage: 'Zoox needs safety engineers who understand sensor trigger algorithms and data analytics as deeply as they understand sheet metal deformation and LS-DYNA impact dynamics.',
    resumeTalkingPoints: [
      'Demonstrate understanding of non-conventional vehicle interior kinematics and occupant protection.',
      'Showcase Python Pandas/NumPy scripts for automated calculation of FMVSS 208 injury indices.',
      'Illustrate experience in physical-to-virtual correlation of crash pulses and structural accelerations.'
    ]
  },
  {
    id: 'job-7',
    title: 'Lead AI/ML Scientist - Predictive Engineering & Optimization',
    company: 'Ansys',
    location: 'Canonsburg, PA / Remote',
    workplaceType: 'Remote',
    experienceLevel: 'Senior',
    salaryRange: '$160,000 - $215,000 + Bonus',
    postedDate: '1 week ago',
    applyUrl: 'https://www.ansys.com/careers',
    category: 'AI + Simulation',
    description: 'Help develop Ansys AI SimAI and autonomous design optimization software. You will develop AI algorithms that ingest CAD and CAE simulation files to deliver instant 3D physical performance predictions for crash, structural mechanics, and aerodynamics.',
    responsibilities: [
      'Train graph neural networks (GNNs) on surface and volume meshes to predict 3D von Mises stress and deformation fields.',
      'Implement multi-objective Bayesian optimization workflows using Georgia Tech OMSA analytics methodologies.',
      'Benchmark AI surrogate accuracy against LS-DYNA, LS-OPT, and Ansys Mechanical solver outputs.',
      'Publish research findings at engineering simulation and AI conferences (NeurIPS, NAFEMS).'
    ],
    requiredSkills: ['Machine Learning & Deep Learning', 'Physics-Informed ML & Surrogate Modeling', 'PyTorch / Neural Networks', 'Mathematical Optimization & Simulation', 'Python & Data Analysis (NumPy/Pandas)'],
    preferredSkills: ['LS-DYNA Explicit FEA', 'OMSA / Applied Statistics & Modeling', 'Nonlinear Finite Element Analysis'],
    hybridAdvantage: 'You understand the nuances of mesh topologies, boundary conditions, and FEA non-linearities, preventing the common pitfalls computer scientists face when training ML models on engineering geometry.',
    resumeTalkingPoints: [
      'Detail experience with geometric deep learning, graph neural networks, and PyTorch Geometric on mesh geometries.',
      'Describe Bayesian optimization and Gaussian Process surrogates for high-dimensional design spaces.',
      'Highlight cross-disciplinary communication between simulation specialists and AI researchers.'
    ]
  },
  {
    id: 'job-8',
    title: 'Senior BIW Crashworthiness CAE Engineer',
    company: 'Lucid Motors',
    location: 'Newark, CA',
    workplaceType: 'On-site',
    experienceLevel: 'Senior',
    salaryRange: '$145,000 - $195,000 + Equity',
    postedDate: '6 days ago',
    applyUrl: 'https://www.lucidmotors.com/careers',
    category: 'Crash & LS-DYNA',
    description: 'Lucid Air set new standards for EV luxury and safety. As a Senior BIW Crashworthiness CAE Engineer, you will develop the structural architecture for Lucid Gravity and future platform vehicles, utilizing advanced LS-DYNA simulations to maximize energy absorption while minimizing mass.',
    responsibilities: [
      'Develop structural crash LS-DYNA models for aluminum and high-strength steel vehicle bodies.',
      'Simulate high-speed impact load paths (front subframe, shotgun, sills, B-pillar, roof crush).',
      'Optimize joint connections (structural adhesives, SPR rivets, spot welds) using failure criteria cards.',
      'Execute design optimization studies using LS-OPT and Python automation.'
    ],
    requiredSkills: ['LS-DYNA Explicit FEA', 'Crash Safety & FMVSS/NCAP', 'Nonlinear Finite Element Analysis', 'HyperMesh / ANSA / Primer / D3PLOT'],
    preferredSkills: ['Python & Data Analysis (NumPy/Pandas)', 'Mathematical Optimization & Simulation', 'HPC & Linux Shell Scripting'],
    hybridAdvantage: 'Lucid places extreme emphasis on efficiency and mass reduction. Your analytical skills allow you to run automated parameter sweeps and multi-attribute DOE studies to eliminate structural mass while maintaining crash ratings.',
    resumeTalkingPoints: [
      'Showcase experience modeling advanced materials and weld/adhesive failure in LS-DYNA (*MAT_ADD_EROSION).',
      'Detail track record of meeting US-NCAP 5-star, IIHS Top Safety Pick+, and Euro NCAP crash requirements.',
      'Demonstrate proficient mesh pre-processing in ANSA / HyperMesh for complex BIW assemblies.'
    ]
  },
  {
    id: 'job-9',
    title: 'Data Science & Machine Learning Specialist (Engineering Analytics)',
    company: 'General Motors',
    location: 'Warren, MI / Hybrid',
    workplaceType: 'Hybrid',
    experienceLevel: 'Mid-Level',
    salaryRange: '$125,000 - $175,000 + Bonus',
    postedDate: '2 weeks ago',
    applyUrl: 'https://search-careers.gm.com',
    category: 'Data Science & ML',
    description: 'GM Virtual Design & Verification is transforming vehicle development through enterprise analytics and AI. Join our engineering data science group to apply modern ML and Georgia Tech OMSA analytical rigor to vehicle safety testing, fleet validation, and virtual simulation data pipelines.',
    responsibilities: [
      'Build end-to-end machine learning models predicting vehicle structural warranty and fatigue life.',
      'Apply unsupervised clustering and anomaly detection to gigabytes of physical crash test transducer data.',
      'Develop automated analytics apps in Python for engineering directors to inspect simulation vs test variance.',
      'Support transition from physical prototype crash tests to fully virtual AI-validated sign-offs.'
    ],
    requiredSkills: ['Python & Data Analysis (NumPy/Pandas)', 'OMSA / Applied Statistics & Modeling', 'Machine Learning & Deep Learning'],
    preferredSkills: ['Crash Safety & FMVSS/NCAP', 'LS-DYNA Explicit FEA', 'Mathematical Optimization & Simulation'],
    hybridAdvantage: 'Because you speak the language of vehicle crash and structural engineering, you do not require a translator to extract high-value features from automotive sensor and FEA telemetry.',
    resumeTalkingPoints: [
      'Highlight Georgia Tech OMSA master’s education in regression, classification, and statistical computing.',
      'Present examples of automated data cleansing, feature engineering, and predictive modeling in Python.',
      'Discuss domain expertise in vehicle safety testing and mechanical performance metrics.'
    ]
  },
  {
    id: 'job-10',
    title: 'Impact Dynamics & Dynamic Safety CAE Engineer',
    company: 'Joby Aviation',
    location: 'Santa Cruz, CA / San Carlos, CA',
    workplaceType: 'Hybrid',
    experienceLevel: 'Senior',
    salaryRange: '$150,000 - $205,000 + Options',
    postedDate: '1 week ago',
    applyUrl: 'https://www.jobyaviation.com/careers',
    category: 'Crash & LS-DYNA',
    description: 'Joby is certifying the worlds premier electric air taxi (eVTOL). We are looking for an Impact Dynamics CAE Engineer to lead emergency landing dynamic impact simulations, FAA 14 CFR § 27.562 / § 23.562 dynamic seat crash evaluations, and bird strike simulations using LS-DYNA SPH and explicit FEA.',
    responsibilities: [
      'Model composite cabin structure crashworthiness and dynamic seat energy attenuation in LS-DYNA.',
      'Conduct bird strike simulations using Smoothed Particle Hydrodynamics (SPH) and Arbitrary Lagrangian-Eulerian (ALE).',
      'Interface with FAA certification representatives on virtual dynamic compliance methodologies.',
      'Run parametric optimization studies on carbon composite sub-floor crush tubes and honeycombs.'
    ],
    requiredSkills: ['LS-DYNA Explicit FEA', 'Nonlinear Finite Element Analysis', 'HyperMesh / ANSA / Primer / D3PLOT', 'HPC & Linux Shell Scripting'],
    preferredSkills: ['Crash Safety & FMVSS/NCAP', 'Python & Data Analysis (NumPy/Pandas)', 'ATD Occupant Safety & Biomechanics'],
    hybridAdvantage: 'Aviation dynamic crash certification requires mathematical rigor and explicit finite element mastery. Your composite damage modeling and automated data processing streamline the FAA virtual compliance process.',
    resumeTalkingPoints: [
      'Highlight expertise in LS-DYNA explicit solver for high-velocity dynamic impact and composite delamination (*MAT_054/058).',
      'Discuss bird strike or projectile impact simulation using advanced LS-DYNA SPH formulations.',
      'Mention FAA or automotive dynamic seat impact test and simulation correlation.'
    ]
  },
  {
    id: 'job-11',
    title: 'Senior Optimization & Analytics Specialist - Engineering Systems',
    company: 'Ford Motor Company',
    location: 'Dearborn, MI / Hybrid',
    workplaceType: 'Hybrid',
    experienceLevel: 'Senior',
    salaryRange: '$135,000 - $185,000 + Bonus',
    postedDate: '3 days ago',
    applyUrl: 'https://careers.ford.com',
    category: 'OMSA Analytics & Optimization',
    description: 'At Ford Pro and EV Platforms, multi-disciplinary optimization (MDO) drives vehicle architecture decisions. We seek an Analytics & Optimization Specialist with an applied data science background (such as Georgia Tech OMSA) to develop algorithmic design trade-off engines balancing crash safety, weight, NVH, and battery packaging.',
    responsibilities: [
      'Formulate and execute large-scale Multi-Disciplinary Design Optimization (MDO) across crash, durability, and aero.',
      'Construct response surface surrogate models using Gaussian processes, polynomial chaos expansions, and neural nets.',
      'Automate high-throughput simulation runs across thousands of cluster nodes in Linux HPC environments.',
      'Translate complex optimization pareto frontiers into actionable product roadmap recommendations.'
    ],
    requiredSkills: ['OMSA / Applied Statistics & Modeling', 'Mathematical Optimization & Simulation', 'Python & Data Analysis (NumPy/Pandas)', 'HPC & Linux Shell Scripting'],
    preferredSkills: ['LS-DYNA Explicit FEA', 'Crash Safety & FMVSS/NCAP', 'Machine Learning & Deep Learning'],
    hybridAdvantage: 'Most optimization specialists lack mechanical domain knowledge, leading to unbuildable designs. Your foundational expertise in crash safety and LS-DYNA ensures optimization constraints reflect real-world physics.',
    resumeTalkingPoints: [
      'Describe implementation of multi-objective genetic algorithms (NSGA-II) and Bayesian optimization for vehicle engineering.',
      'Detail Georgia Tech OMSA coursework in Deterministic and Stochastic Optimization.',
      'Discuss scripting HPC job submission scripts (SLURM/PBS) and automated result summarization.'
    ]
  },
  {
    id: 'job-12',
    title: 'Robotics Impact & Structural AI Engineer',
    company: 'Boston Dynamics',
    location: 'Waltham, MA',
    workplaceType: 'On-site',
    experienceLevel: 'Senior',
    salaryRange: '$160,000 - $210,000 + Benefits',
    postedDate: '1 week ago',
    applyUrl: 'https://bostondynamics.com/careers',
    category: 'AI + Simulation',
    description: 'Atlas and Spot operate in rugged dynamic environments where catastrophic falls, sudden impacts, and high dynamic shocks occur. In this role, you will apply explicit dynamic simulation (LS-DYNA) and machine learning to predict impact loads, optimize structural survivability, and develop AI-driven impact detection models.',
    responsibilities: [
      'Simulate high-velocity dynamic drops and limb impacts for humanoid and quadruped robots using LS-DYNA.',
      'Train real-time ML impact detection models running on edge compute (Nvidia Jetson) using PyTorch.',
      'Optimize structural joint housings, high-stress titanium linkages, and shock absorption elements.',
      'Correlate multi-axis load cell and accelerometer telemetry during high-energy physical drop experiments.'
    ],
    requiredSkills: ['LS-DYNA Explicit FEA', 'Machine Learning & Deep Learning', 'PyTorch / Neural Networks', 'Nonlinear Finite Element Analysis', 'Python & Data Analysis (NumPy/Pandas)'],
    preferredSkills: ['Physics-Informed ML & Surrogate Modeling', 'OMSA / Applied Statistics & Modeling', 'HPC & Linux Shell Scripting'],
    hybridAdvantage: 'Robotics hardware survivability requires combining high-speed transient dynamics (LS-DYNA) with edge machine learning. You possess both sides of the coin.',
    resumeTalkingPoints: [
      'Showcase experience modeling transient shocks, contact non-linearities, and structural plasticity in LS-DYNA.',
      'Describe training lightweight neural networks in PyTorch for time-series anomaly and impact classification.',
      'Emphasize hands-on correlation of physical test instrumentation with numerical FEA.'
    ]
  }
];
