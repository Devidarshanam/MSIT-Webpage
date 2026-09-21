// Detailed pedagogical and curriculum content for MSIT's Three Core Learning Pillars
// Anchored in Prof. Raj Reddy's founding vision and CETLS at IIIT Hyderabad

export const LEARNING_PILLARS = {
  'learning-to-learn': {
    id: 'learning-to-learn',
    number: '01',
    title: 'Learning to Learn',
    shortTitle: 'Learn to Learn',
    kicker: 'CORE PEDAGOGY PILLAR 01',
    tagline: 'Autonomous Knowledge Mastery in an Ever-Evolving Technological Landscape',
    icon: 'BookOpenIcon',
    accentColor: '#1d4ed8',
    bgGradient: 'linear-gradient(135deg, #091e42 0%, #1e3a8a 50%, #1d4ed8 100%)',
    summary: 'The capacity to independently explore, deconstruct, and master emerging programming languages, cloud frameworks, and AI foundation models without waiting for traditional classroom lectures.',
    quote: {
      text: 'In the information age, the most critical skill an engineer can possess is not the memorization of existing syntax, but the cognitive agility to master any new tool overnight.',
      author: 'Prof. Raj Reddy',
      role: 'Turing Award Laureate & Founding Chair of MSIT'
    },
    overview: `At MSIT, "Learning to Learn" is not a vague aspiration—it is an engineered educational methodology developed in collaboration with the Centre for Educational Technology and Learning Sciences (CETLS) at IIIT Hyderabad. Instead of delivering pre-digested lecture slides, the curriculum plunges students into problem-first challenges where reading technical documentation, dissecting open-source code repositories, and experimenting with software frameworks are daily requirements.`,
    
    foundations: [
      {
        title: 'Bloom’s 2-Sigma Mastery Model',
        description: 'Students advance only upon demonstrating 100% conceptual mastery of foundational modules through personalized pacing and continuous feedback, rather than time-bound memorization.'
      },
      {
        title: 'Cognitive Scaffolding by CETLS',
        description: 'Learning pathways are structured with intentional cognitive supports that progressively recede as students develop self-regulation, documentation fluency, and independent debugging tenacity.'
      },
      {
        title: 'Active Technical Literacy',
        description: 'Engineers learn to read formal RFCs, standard specifications, API contracts, and source code repositories directly, eliminating reliance on secondary tutorials.'
      }
    ],

    dailyStudioPractice: {
      title: 'A Day in the Studio: Practicing Autonomous Learning',
      description: 'How MSIT students cultivate independent learning habits every single day on campus:',
      steps: [
        {
          time: '09:00 AM — Problem Immersion',
          action: 'A real-world engineering challenge is released with technical specifications and unit test suites—no lecture slides provided.'
        },
        {
          time: '10:30 AM — Self-Directed Inquiry',
          action: 'Students analyze official language specifications, cloud documentation, and library source code to formulate implementation strategies.'
        },
        {
          time: '02:00 PM — Pair Discovery & Experimentation',
          action: 'Students test hypotheses in sandbox environments, utilizing AI tools as active inquiry partners to clarify documentation nuances.'
        },
        {
          time: '04:30 PM — Mentor Scrutiny & Viva',
          action: 'Domain mentors conduct rigorous code walkthroughs, probing the "why" behind design decisions rather than just checking if the code compiles.'
        }
      ]
    },

    comparisonTable: {
      title: 'Traditional Engineering College vs. MSIT Learning-to-Learn',
      rows: [
        {
          aspect: 'Knowledge Acquisition',
          traditional: 'Passive listening to 50-minute blackboard/slide lectures',
          msit: 'Active documentation analysis, RFC exploration & problem-first building'
        },
        {
          aspect: 'New Framework Adoption',
          traditional: 'Wait for curriculum revision committee (often 3–5 year lag)',
          msit: 'Sprint-based adoption of newly released libraries/models in 48 hours'
        },
        {
          aspect: 'Error Handling',
          traditional: 'Copy solutions from forums or ask teaching assistants for answers',
          msit: 'Systematic stack-trace analysis, debugging harnesses & root-cause isolation'
        },
        {
          aspect: 'Role of AI Tools',
          traditional: 'Prohibited or used blindly for automated plagiarism',
          msit: 'Integrated as conversational research copilots with rigorous human validation'
        }
      ]
    },

    coreCompetencies: [
      {
        title: 'Documentation & RFC Comprehension',
        description: 'Mastery in extracting architecture patterns, edge cases, and API contracts directly from authoritative technical documentation.'
      },
      {
        title: 'Rapid Tech Stack Onboarding',
        description: 'Proven capability to transition into completely unfamiliar languages, frameworks, or cloud SDKs and build working prototypes within 48–72 hours.'
      },
      {
        title: 'Root-Cause Debugging Tenacity',
        description: 'Deep investigative skills using profilers, log parsers, and debuggers to isolate complex concurrency and memory issues independently.'
      },
      {
        title: 'Prompt-Assisted Deep Research',
        description: 'Using large language models as intelligent sparring partners to explore alternative algorithms while independently validating outputs.'
      }
    ],

    realWorldCaseStudy: {
      title: 'Real-World Scenario: Mastering a Newly Released Foundation Model SDK in 48 Hours',
      context: 'During an intensive cloud practicum sprint, an enterprise partner updated their API specification to require an unfamiliar multimodal vector database and streaming inference protocol.',
      challenge: 'No textbook, tutorial, or course lecture existed for the updated SDK. The team had 48 hours to refactor an indexing pipeline and ship a resilient microservice.',
      execution: 'Applying "Learning to Learn" principles, the MSIT student engineers dissected the open-source client library, ran automated smoke tests against endpoint schemas, and built an end-to-end integration harness.',
      outcome: 'The refactored microservice passed 100% of latency and regression benchmarks and was deployed to staging within the 48-hour deadline.'
    },

    evaluationRubric: [
      {
        criterion: 'Technical Self-Reliance',
        detail: 'Ability to overcome blockers and find verified solutions using primary documentation without escalating routine questions.'
      },
      {
        criterion: 'Conceptual Depth in Viva',
        detail: 'Demonstrated clarity during mentor code defense, explaining underlying runtime mechanics, memory models, and trade-offs.'
      },
      {
        criterion: 'Adaptability Velocity',
        detail: 'Speed and precision when tasked with switching languages (e.g., Python to Rust or Go) to solve performance bottlenecks.'
      }
    ]
  },

  'learning-to-think': {
    id: 'learning-to-think',
    number: '02',
    title: 'Learning to Think',
    shortTitle: 'Learn to Think',
    kicker: 'CORE PEDAGOGY PILLAR 02',
    tagline: 'First-Principles Computational Reasoning, Systems Architecture & AI Discernment',
    icon: 'CpuIcon',
    accentColor: '#0284c7',
    bgGradient: 'linear-gradient(135deg, #091e42 0%, #0369a1 50%, #0284c7 100%)',
    summary: 'Reasoning from fundamental mathematical and computational principles, questioning assumptions, evaluating architectural trade-offs, and auditing AI-generated code with rigorous human discernment.',
    quote: {
      text: 'Anyone can generate code with modern AI, but only an engineer who understands first principles can determine whether that code is secure, scalable, and correct.',
      author: 'MSIT Academic Council',
      role: 'IIIT Hyderabad Consortium'
    },
    overview: `In an era where automated copilots generate boilerplate syntax in milliseconds, the value of a software engineer has fundamentally shifted from typing code to architectural discernment. "Learning to Think" trains students to dissect complex real-world ambiguity into precise mathematical logic, algorithm complexity bounds, and fault-tolerant distributed system architectures.`,

    foundations: [
      {
        title: 'First-Principles Computational Thinking',
        description: 'Deconstructing massive enterprise problems down to fundamental invariants: data structures, time/space complexity, cache locality, and state consistency.'
      },
      {
        title: 'Adversarial Code & Architecture Review',
        description: 'Daily peer and mentor interrogation where every line of code, database index, and network call must be defended against scale and security edge cases.'
      },
      {
        title: 'Human Judgement in an AI-Native Era',
        description: 'Treating AI suggestions as unverified hypotheses. Students are trained to actively hunt for subtle race conditions, hallucinated dependencies, and token-cost leaks.'
      }
    ],

    dailyStudioPractice: {
      title: 'A Day in the Studio: Cultivating Critical Thinking',
      description: 'How MSIT engineers train their analytical and architectural instincts:',
      steps: [
        {
          time: '10:00 AM — Architecture Whiteboarding',
          action: 'Before writing any code, students diagram domain entities, transaction boundaries, CAP theorem choices, and failure domains.'
        },
        {
          time: '11:30 AM — Complexity & Trade-Off Matrix',
          action: 'Teams evaluate alternative data models and database engines, benchmarking latency versus operational complexity.'
        },
        {
          time: '03:00 PM — AI Output Verification Drill',
          action: 'Students audit AI-generated code snippets for security vulnerabilities (e.g., SQL injections, memory leaks, concurrency locks).'
        },
        {
          time: '05:00 PM — Socratic Defense Session',
          action: 'Mentors challenge architectural assumptions with catastrophic simulation prompts (e.g., "What happens when network partition occurs?").'
        }
      ]
    },

    comparisonTable: {
      title: 'Rote Coding vs. MSIT First-Principles Thinking',
      rows: [
        {
          aspect: 'Problem Solving Approach',
          traditional: 'Memorizing specific algorithm templates for exams',
          msit: 'First-principles reasoning from mathematical axioms, constraints & invariants'
        },
        {
          aspect: 'Code Generation Mindset',
          traditional: 'If the test passes on happy path, code is deemed complete',
          msit: 'Adversarial testing: stress tests, chaos engineering, edge-case boundary checks'
        },
        {
          aspect: 'AI Copilot Integration',
          traditional: 'Passive acceptance of AI auto-completes without deep inspection',
          msit: 'Critical audit: verifying security, memory usage, algorithm bounds & license compliance'
        },
        {
          aspect: 'System Design',
          traditional: 'Monolithic assignments with single-threaded assumptions',
          msit: 'Distributed systems: eventual consistency, idempotency, backpressure & fault isolation'
        }
      ]
    },

    coreCompetencies: [
      {
        title: 'Algorithmic Complexity & Optimization',
        description: 'Rigorous asymptotic analysis (Big-O, Big-Theta) to eliminate algorithmic bottlenecks before code reaches production.'
      },
      {
        title: 'Distributed Systems & Trade-Off Analysis',
        description: 'Practical application of CAP theorem, consensus protocols, idempotency, caching tiers, and event-driven microservices.'
      },
      {
        title: 'Adversarial Security Auditing',
        description: 'Instinctive identification of race conditions, memory leaks, unauthorized state mutations, and common CVE vectors.'
      },
      {
        title: 'AI Code Verification & Guardrails',
        description: 'Designing deterministic verification test harnesses to rigorously validate outputs from probabilistic generative models.'
      }
    ],

    realWorldCaseStudy: {
      title: 'Real-World Scenario: Catching a Subtle Distributed Deadlock in AI-Generated Code',
      context: 'In an applied fintech practicum sprint, an AI code assistant generated an asynchronous order-matching algorithm that successfully passed all unit tests with 100% code coverage.',
      challenge: 'Under high-concurrency simulation (10,000 concurrent websocket trades), the engine intermittently froze due to an inverted lock acquisition order across distributed worker nodes.',
      execution: 'Applying "Learning to Think" disciplines, MSIT students drew lock graph dependency diagrams, analyzed database deadlock traces, and redesigned the subsystem using lock-free ring buffers and optimistic concurrency control.',
      outcome: 'System throughput surged from 1,200 to 18,500 operations per second with zero deadlocks under sustained stress testing.'
    },

    evaluationRubric: [
      {
        criterion: 'Architectural Justification',
        detail: 'Quality of reasoning behind database selection, API schema design, and asynchronous communication patterns.'
      },
      {
        criterion: 'Edge-Case Thoroughness',
        detail: 'Demonstrated resilience against network drops, corrupt payloads, thread starvations, and scale spikes.'
      },
      {
        criterion: 'Socratic Defense Precision',
        detail: 'Clarity and composure when defending system trade-offs against probing faculty and industry practitioner critique.'
      }
    ]
  },

  'learning-to-do': {
    id: 'learning-to-do',
    number: '03',
    title: 'Learning to Do',
    shortTitle: 'Learn to Do',
    kicker: 'CORE PEDAGOGY PILLAR 03',
    tagline: 'Immersive Studio Engineering, Production Craftsmanship & Paid Co-op Practicum',
    icon: 'BriefcaseIcon',
    accentColor: '#16a34a',
    bgGradient: 'linear-gradient(135deg, #091e42 0%, #166534 50%, #16a34a 100%)',
    summary: 'Experiential software engineering where students write, test, debug, and deploy production-grade software daily in high-spec studios, spending ~50% of their program in real industry co-ops.',
    quote: {
      text: 'You cannot learn to swim by reading about water in a library. You learn to build world-class software by writing, breaking, and shipping real systems every single day.',
      author: 'Prof. Raj Reddy',
      role: 'Founding Vision of MSIT'
    },
    overview: `MSIT eliminates passive lecture halls entirely. In their place stands an immersive 100% studio learning environment where students sit in collaborative software development pods equipped with multi-monitor workstations, automated CI/CD build servers, and enterprise development tooling. Real software engineering intuition is forged through hands-on craftsmanship.`,

    foundations: [
      {
        title: 'Studio-Based Learning Environment',
        description: 'Physical and virtual studio pods designed after modern high-growth tech engineering bays, fostering constant peer programming, code reviews, and pair debugging.'
      },
      {
        title: '6-Stage Active Learning Cycle',
        description: 'Every technical domain follows a tight pedagogical loop: Learn fundamental concepts, Think through architectures, Build working code, Apply to practical scenarios, Reflect on metrics, and Improve via code reviews.'
      },
      {
        title: 'Real-World Practicum (~50% Tenure)',
        description: 'Substantial program duration dedicated to corporate industry co-ops and living labs, solving genuine enterprise engineering challenges under senior tech leadership.'
      }
    ],

    dailyStudioPractice: {
      title: 'A Day in the Studio: Living the Builder’s Rhythm',
      description: 'The immersive daily cadence of an MSIT software engineer:',
      steps: [
        {
          time: '09:00 AM — Morning Standup & Sprint Planning',
          action: 'Teams assemble to review Kanban boards, assign feature tasks, and commit to daily deployment goals.'
        },
        {
          time: '10:00 AM — Deep Coding & System Implementation',
          action: 'Intensive engineering sprints writing production code, crafting unit/integration tests, and building Docker containers.'
        },
        {
          time: '02:30 PM — Automated CI/CD & Security Scans',
          action: 'Commits trigger automated pipelines running static analysis, linting, security audits, and regression test suites.'
        },
        {
          time: '04:30 PM — Peer Pull Request (PR) Reviews',
          action: 'Every piece of student code undergoes strict peer review with mentor sign-off before merging into the main branch.'
        }
      ]
    },

    comparisonTable: {
      title: 'Traditional Lab Exercises vs. MSIT Production Studio',
      rows: [
        {
          aspect: 'Coding Environment',
          traditional: 'Isolated 2-hour weekly lab writing toy programs from printouts',
          msit: 'Full-time daily studio workspace modeled on enterprise engineering bays'
        },
        {
          aspect: 'Project Scope',
          traditional: 'Trivial single-file academic exercises with throwaway code',
          msit: 'Multi-tiered microservices, live database clusters & real production pipelines'
        },
        {
          aspect: 'Deployment Standards',
          traditional: 'Code is demonstrated on student laptops and immediately discarded',
          msit: 'Production deployment via CI/CD, Kubernetes clusters & monitored cloud infrastructure'
        },
        {
          aspect: 'Industry Exposure',
          traditional: 'Optional short summer training with minimal engineering responsibility',
          msit: 'Intensive ~50% tenure corporate practicum embedded directly in industry engineering teams'
        }
      ]
    },

    coreCompetencies: [
      {
        title: 'Production CI/CD & Cloud Orchestration',
        description: 'Building automated GitHub Actions pipelines, Docker container workflows, and cloud deployments on AWS/GCP.'
      },
      {
        title: 'Test-Driven Development (TDD)',
        description: 'Writing robust unit, integration, and end-to-end test suites to guarantee regression-proof software delivery.'
      },
      {
        title: 'API & Microservice Engineering',
        description: 'Designing high-performance REST, GraphQL, and gRPC service contracts with comprehensive swagger documentation and rate limiting.'
      },
      {
        title: 'Collaborative Git & Trunk-Based Development',
        description: 'Professional git workflows, semantic versioning, feature flags, and constructive peer code review practices.'
      }
    ],

    realWorldCaseStudy: {
      title: 'Real-World Scenario: Building an Enterprise RAG Pipeline in Industry Co-op',
      context: 'An enterprise healthcare partner required an intelligent document retrieval and HIPAA-compliant search engine across hundreds of thousands of clinical research publications.',
      challenge: 'The system demanded sub-200ms semantic search latency, strict role-based data isolation, zero data leaks to public APIs, and 99.9% service availability.',
      execution: 'MSIT students architected a hybrid dense/sparse vector retrieval service using Qdrant, deployed on private cloud Kubernetes, integrated asynchronous Redis queues for batch ingestion, and established an automated evaluation harness measuring retrieval recall.',
      outcome: 'The service was successfully accepted into production, reducing clinical staff research time by 64% and serving over 50,000 queries daily.'
    },

    evaluationRubric: [
      {
        criterion: 'Production Code Quality',
        detail: 'Adherence to defensive coding patterns, zero lint warnings, modular architecture, and comprehensive test coverage (>80%).'
      },
      {
        criterion: 'Operational Reliability',
        detail: 'Resilience of deployed systems under simulated chaos testing, memory leak audits, and peak load benchmarks.'
      },
      {
        criterion: 'Practicum Mentor Appraisal',
        detail: 'Formal performance evaluations from corporate engineering managers regarding initiative, velocity, and craftsmanship.'
      }
    ]
  }
};
