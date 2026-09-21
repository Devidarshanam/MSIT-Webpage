// Simplified, high-clarity curriculum details for MSIT's Three Core Learning Pillars
// Clean, detailed, and easily digestible without unnecessary cognitive overload.

export const LEARNING_PILLARS = {
  'learning-to-learn': {
    id: 'learning-to-learn',
    number: '01',
    title: 'Learning to Learn',
    shortTitle: 'Learn to Learn',
    kicker: 'CORE PEDAGOGY PILLAR 01',
    tagline: 'Master Any New Technology Independently Without Waiting for Lectures',
    icon: 'BookOpenIcon',
    accentColor: '#1d4ed8',
    bgGradient: 'linear-gradient(135deg, #091e42 0%, #1e3a8a 50%, #1d4ed8 100%)',
    summary: 'The ability to self-direct your learning: reading official documentation, inspecting code, and mastering new AI tools, programming languages, and cloud frameworks on demand.',
    quote: {
      text: 'In the technology world, tools change every year. The true superpower is knowing how to learn anything independently overnight.',
      author: 'Prof. Raj Reddy',
      role: 'Turing Award Laureate & Founding Chair of MSIT'
    },

    // What it is (Clean 3-point breakdown)
    whatIsIt: [
      {
        title: 'Self-Directed Discovery',
        description: 'Instead of memorizing slides from classroom lectures, you learn by exploring official docs, API specs, and open-source code repositories directly.'
      },
      {
        title: 'Zero Waiting for Updates',
        description: 'When a new language, library, or foundation model is released, you can adopt it and build a working application within 48 to 72 hours.'
      },
      {
        title: 'Problem-First Immersion',
        description: 'You start with a real engineering problem and discover the concepts and tools needed to solve it step by step.'
      }
    ],

    // Why it matters (Simple career rationale)
    whyItMatters: [
      {
        title: 'Technologies Evolve Fast',
        description: 'Frameworks and tools go outdated quickly. Engineers who rely on rote college syllabi get left behind, while self-directed learners stay ahead.'
      },
      {
        title: 'High Career Adaptability',
        description: 'Top technology companies look for engineers who can jump into an unfamiliar tech stack on day one and be productive immediately.'
      },
      {
        title: 'AI as a Learning Partner',
        description: 'You use modern AI tools to ask questions and clarify concepts, without complete dependence on them.'
      }
    ],

    // Daily studio practice (A simple 3-step day)
    dailyPractice: [
      {
        step: '1',
        time: 'Morning Challenge',
        action: 'You receive a real-world problem statement with test cases—no pre-made lecture slides.'
      },
      {
        step: '2',
        time: 'Self-Guided Research',
        action: 'You read the official documentation, experiment with code in your studio workstation, and build your solution.'
      },
      {
        step: '3',
        time: 'Mentor Walkthrough',
        action: 'Faculty mentors conduct interactive code reviews to test your understanding of how and why your solution works.'
      }
    ],

    // Key skills gained (4 clean bullets)
    keySkills: [
      'Reading and understanding official API documentation and Technical Standards',
      'Rapidly learning and adopting new programming languages and frameworks',
      'Systematic debugging and isolating errors using logs and debuggers',
      'Using generative AI as an active research thinking partner'
    ],

    // Real-world practical example
    realWorldExample: {
      title: 'Practical Scenario: Learning a New Database Tool',
      situation: 'A team needs to add smart search to an application using a new database tool that has no tutorials.',
      solution: 'Applying Learning-to-Learn, the student reads the official documentation, tests sample code, and builds a working prototype in two days.',
      outcome: 'The feature is tested and launched smoothly ahead of schedule.'
    }
  },

  'learning-to-think': {
    id: 'learning-to-think',
    number: '02',
    title: 'Learning to Think',
    shortTitle: 'Learn to Think',
    kicker: 'CORE PEDAGOGY PILLAR 02',
    tagline: 'First-Principles Computational Reasoning, AI Literacy & Human Judgement',
    icon: 'CpuIcon',
    accentColor: '#0284c7',
    bgGradient: 'linear-gradient(135deg, #091e42 0%, #0369a1 50%, #0284c7 100%)',
    summary: 'Reasoning from first principles: breaking down complex problems, designing resilient architectures, evaluating trade-offs, and verifying AI-generated code with human judgement.',
    quote: {
      text: 'AI can write syntax in seconds, but only an engineer who understands first principles can tell whether that code is secure, scalable, and correct.',
      author: 'MSIT Academic Council',
      role: 'IIIT Hyderabad Consortium'
    },

    whatIsIt: [
      {
        title: 'First-Principles Thinking',
        description: 'Breaking down complex, confusing problems into simple step-by-step logic, clear math, and efficient data structures.'
      },
      {
        title: 'AI Literacy',
        description: 'Understanding trade-offs and AI capabilities: knowing when to use SQL vs. NoSQL, sync vs. async APIs, and designing systems that do not crash under high load.'
      },
      {
        title: 'Human Judgement',
        description: 'Critically auditing and verifying code suggested by AI tools to catch security holes, edge cases, and hidden bugs that automated tools miss.'
      }
    ],

    whyItMatters: [
      {
        title: 'Beyond Just Writing Code',
        description: 'Writing basic code can be automated by AI. Top tech companies hire engineers who understand how systems work deeply and can solve real-world problems.'
      },
      {
        title: 'Building Scalable Systems',
        description: 'Understanding memory limits, database indexing, and network latency ensures systems handle millions of users seamlessly.'
      },
      {
        title: 'Building Code That Never Crashes',
        description: 'You learn to predict what could go wrong—such as server overload, network lag, or unexpected inputs—so your applications stay fast and reliable.'
      }
    ],

    dailyPractice: [
      {
        step: '1',
        time: 'System Planning & Design',
        action: 'Before writing code, you draw system diagrams, sketch data flows, and plan how the components connect.'
      },
      {
        step: '2',
        time: 'Trade-off Analysis',
        action: 'You evaluate speed vs. complexity, analyzing time (Big-O) and memory requirements for your solution.'
      },
      {
        step: '3',
        time: 'Interactive Code Review',
        action: 'Mentors and peers test your code with tricky edge cases and heavy traffic simulations to ensure it never crashes.'
      }
    ],

    keySkills: [
      'Writing fast, memory-efficient code and optimizing performance',
      'System design: database choices, caching layers, and microservices',
      'Testing AI-generated code for security flaws and hidden bugs',
      'Breaking down complex, messy problems into clean step-by-step logic',
      'Designing backend systems that scale smoothly for thousands of users',
      'Explaining and defending technical architectural decisions with confidence'
    ],

    realWorldExample: {
      title: 'Real-World Example: Finding a Hidden Bug in AI Code',
      situation: 'An AI assistant generates an order-processing routine that passes normal tests, but locks up under 5,000 concurrent user requests.',
      solution: 'The engineer analyzes the lock acquisition sequence, spots a distributed deadlock, and rewires the code using an asynchronous queue.',
      outcome: 'Throughput increases by 10x with zero crashes under heavy user traffic.'
    }
  },

  'learning-to-do': {
    id: 'learning-to-do',
    number: '03',
    title: 'Learning to Do',
    shortTitle: 'Learn to Do',
    kicker: 'CORE PEDAGOGY PILLAR 03',
    tagline: '100% Studio-Based Software Engineering & Real Industry Practicum',
    icon: 'BriefcaseIcon',
    accentColor: '#16a34a',
    bgGradient: 'linear-gradient(135deg, #091e42 0%, #166534 50%, #16a34a 100%)',
    summary: 'Building, testing, debugging, and shipping production-grade software daily in collaborative studios, with ~50% of the program spent in real corporate industry co-ops.',
    quote: {
      text: 'You cannot learn to swim by reading books in a library. You become a world-class engineer by building, breaking, and shipping real systems every day.',
      author: 'Prof. Raj Reddy',
      role: 'Founding Vision of MSIT'
    },

    whatIsIt: [
      {
        title: 'Active Studio Culture',
        description: 'No boring classroom lectures. You spend your day in modern computing studios collaborating, coding, and building software.'
      },
      {
        title: '6-Stage Active Learning Cycle',
        description: 'A continuous rhythm: Learn concepts, Think through logic, Build code, Apply to real problems, Reflect on feedback, and Improve.'
      },
      {
        title: 'Corporate Practicum (~50% Tenure)',
        description: 'Around half of your postgraduate program is spent embedded directly inside tech companies working on genuine corporate projects.'
      }
    ],

    whyItMatters: [
      {
        title: 'Industry-Ready on Day One',
        description: 'You graduate having already worked with professional git workflows, CI/CD pipelines, automated testing, and team code reviews.'
      },
      {
        title: 'Real Portfolio, Not Just Grades',
        description: 'You show prospective employers working production systems, deployed applications, and verified co-op experience.'
      },
      {
        title: 'Paid Corporate Experience',
        description: 'Gain real workplace exposure, mentorship from engineering directors, and direct pathways to top placement packages.'
      }
    ],

    dailyPractice: [
      {
        step: '1',
        time: 'Morning Sprint Standup',
        action: 'Teams review project boards, prioritize daily tasks, and set feature delivery goals.'
      },
      {
        step: '2',
        time: 'Studio Development & Testing',
        action: 'Writing modular code, setting up automated unit tests, and building Docker containers.'
      },
      {
        step: '3',
        time: 'Pull Request & Deployment',
        action: 'Submitting pull requests for peer reviews, running CI/CD checks, and deploying to cloud servers.'
      }
    ],

    keySkills: [
      'Building production CI/CD automation pipelines and cloud deployments',
      'Test-driven development (TDD) and writing reliable unit test suites',
      'Designing modern REST and microservice APIs with clean contracts',
      'Professional git collaboration, branching models, and code reviews',
      'Containerizing full-stack applications using Docker and cloud services',
      'Working directly on live corporate codebases during real-world practicum'
    ],

    realWorldExample: {
      title: 'Real-World Example: Shipping an Enterprise Cloud Service',
      situation: 'An industry partner needs an internal search service across 50,000 documents with fast responses and high reliability.',
      solution: 'Students build the backend API, integrate a cloud vector database, set up automated GitHub Actions tests, and deploy via Docker.',
      outcome: 'The service is successfully launched into daily company operations, cutting research time for employees by over 60%.'
    }
  }
};
