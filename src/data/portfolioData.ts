export interface SkillDetail {
  name: string;
  confidence: number; // percentage
  years: number;
  projects: string[];
}

export interface SkillCategory {
  title: string;
  items: SkillDetail[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  extendedDescription: string;
  tech: string[];
  github: string;
  demo?: string;
  highlights: string[];
}

export interface AchievementItem {
  title: string;
  subtitle: string;
  description: string;
  date: string;
}

export const portfolioData = {
  profile: {
    name: "Priyanshu Chand",
    titles: [
      "AI Engineer",
      "Full Stack Developer",
      "Machine Learning Enthusiast",
      "Data Analyst",
      "Problem Solver"
    ],
    bio: "Building intelligent software that combines AI, modern web technologies, and data-driven solutions to solve real-world problems.",
    story: [
      "I'm a Computer Science student driven by curiosity and the desire to build software that makes an impact.",
      "From AI and Machine Learning to Full Stack Development and Data Analytics, I enjoy solving challenging problems through technology.",
      "Every project is an opportunity to learn something new.",
      "Every line of code moves me closer toward becoming a world-class software engineer."
    ],
    education: {
      degree: "B.Tech Computer Science & Engineering",
      institution: "DY Patil International University, Pune",
      year: "2024–2028"
    }
  },
  stats: [
    { value: "200+", label: "DSA Problems" },
    { value: "8+", label: "Projects Built" },
    { value: "3", label: "Internships Completed" },
    { value: "Multiple", label: "Hackathons" }
  ],
  experience: [
    {
      role: "AI Engineer Intern",
      company: "Springer Capital Investments LLC",
      period: "May 2026 – Aug 2026",
      bullets: [
        "Working as an AI Engineer Intern at a U.S.-based investment firm (Remote).",
        "Contributing to AI-driven financial analysis and investment decision tools.",
        "Building and deploying machine learning models for data-driven capital strategies.",
        "Collaborating with the engineering team on production AI pipeline development.",
        "Gaining deep hands-on expertise in AI systems design for the finance domain."
      ]
    },
    {
      role: "Full-Stack Developer Intern",
      company: "Jodetx – Banking & Payment Solutions",
      period: "Sep 2025 – Nov 2025",
      bullets: [
        "Developed and enhanced fintech application features using JavaScript and modern web development practices.",
        "Integrated REST APIs for payment processing, transaction management, and banking-related functionalities.",
        "Performed debugging, testing, and optimization to improve application performance and reliability.",
        "Collaborated with development teams using Git-based workflows and agile development methodologies."
      ]
    },
    {
      role: "Summer Intern",
      company: "Srajan Spastic Society",
      period: "May 2025 – Jul 2025",
      bullets: [
        "Assisted in social-impact initiatives focused on supporting differently-abled children and rehabilitation programs.",
        "Coordinated activities and communication between volunteers, educators, and participants.",
        "Developed teamwork, leadership, and problem-solving skills while working in a collaborative environment."
      ]
    }
  ] as ExperienceItem[],
  specialProject: {
    id: "lt-fault",
    title: "LT Line Fault Detection System",
    description: "An Apple-level product showcasing real-time AI fault diagnostics, embedded IoT sensor nodes, and instant cloud telemetry.",
    period: "Aug 2025 – Present",
    architecture: {
      sensors: "Distributed hardware sensors monitoring voltage, current, and phase shifts at 100Hz frequency.",
      embedded: "ESP32 microcontrollers running edge processing algorithms for immediate shockwave detection.",
      iot: "LoRaWAN & cellular modules broadcasting telemetry to an edge cluster gateway.",
      cloud: "Qdrant vector indexes and real-time MySQL clusters hosting time-series electrical dynamics.",
      prediction: "Deep neural network analyzing transient currents to classify fault types (Line-to-Ground, Line-to-Line, etc.) with 98.4% accuracy."
    }
  },
  projects: [
    {
      id: "plant-disease",
      title: "AI Based Plant Disease Detection",
      description: "Machine learning model to identify plant diseases from leaf images using image classification techniques.",
      extendedDescription: "Developed a machine learning model to identify plant diseases from leaf images. Performed image preprocessing, feature extraction, and dataset augmentation using OpenCV and Python. Trained and evaluated classification models in Google Colab to improve disease detection accuracy. Demonstrated the potential of AI-driven solutions for early disease diagnosis in agriculture.",
      tech: ["Python", "TensorFlow", "OpenCV", "Google Colab", "Machine Learning"],
      github: "https://github.com/priyanshu-chand",
      highlights: ["Image preprocessing & feature extraction", "Dataset augmentation with OpenCV", "AI-driven early disease diagnosis in agriculture"]
    },
    {
      id: "rag-chatbot",
      title: "RAG Chatbot",
      description: "Intelligent document question-answering system using LangChain and Qdrant vector database.",
      extendedDescription: "Developed an intelligent document question-answering system using LangChain and Qdrant vector database. Implemented PDF ingestion, text chunking, embedding generation, and semantic search pipelines. Generated context-aware responses using Large Language Models with Retrieval-Augmented Generation (RAG).",
      tech: ["Python", "LangChain", "Qdrant", "FastAPI", "OpenAI API"],
      github: "https://github.com/priyanshu-chand",
      highlights: ["PDF ingestion & text chunking pipelines", "Semantic search with vector embeddings", "Context-aware LLM responses with RAG"]
    },
    {
      id: "stock-agent",
      title: "Multi-Agent Stock Analysis Assistant",
      description: "Multi-agent workflow for stock market analysis and financial information retrieval.",
      extendedDescription: "Built a multi-agent workflow for stock market analysis and financial information retrieval. Designed agent routing and state management using LangGraph architecture. Automated report generation and data-driven insights from multiple financial data sources.",
      tech: ["Python", "LangGraph", "LangChain", "Matplotlib", "FastAPI"],
      github: "https://github.com/priyanshu-chand",
      highlights: ["Agent routing & state management with LangGraph", "Automated report generation", "Data-driven insights from multiple financial sources"]
    },
    {
      id: "cust-segment",
      title: "Customer Segmentation & Data Analytics",
      description: "Unsupervised machine learning clustering to identify customer behavior patterns and segments.",
      extendedDescription: "Performed exploratory data analysis and preprocessing on customer datasets. Applied clustering algorithms to identify customer behavior patterns and segments. Visualized insights using Matplotlib and Pandas for data-driven decision making.",
      tech: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "EDA"],
      github: "https://github.com/priyanshu-chand",
      highlights: ["Exploratory data analysis & preprocessing", "Clustering algorithms for behavior patterns", "Interactive data visualizations with Matplotlib"]
    },
    {
      id: "sales-forecast",
      title: "Sales Forecasting System",
      description: "Time-series predictive algorithm projecting sales demand dynamically.",
      extendedDescription: "An enterprise intelligence tool built on Auto-ARIMA and Prophet architectures. By evaluating multi-year historical logs, it projects seasonal demand, stocking requirements, and potential stockout events.",
      tech: ["Python", "Pandas", "NumPy", "Matplotlib", "EDA"],
      github: "https://github.com/priyanshu-chand",
      highlights: ["91% forecasting accuracy on seasonal demand spikes", "Dynamic pricing recommendation engine", "Interactive inventory telemetry panel"]
    },
    {
      id: "langgraph-workflow",
      title: "LangGraph AI Workflow",
      description: "Visual workspace designer generating structured multi-agent state machines.",
      extendedDescription: "An abstract developer dashboard that outputs LangGraph-compatible python scripts. Users construct computational state machines, node handlers, and edge conditions visually to generate agents.",
      tech: ["React", "Next.js", "LangGraph", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/priyanshu-chand",
      highlights: ["Drag-and-drop state canvas interface", "Real-time Python code generator preview", "Preconfigured safety and logging node templates"]
    }
  ] as ProjectDetail[],
  skills: [
    {
      title: "Programming",
      items: [
        { name: "Python", confidence: 95, years: 3, projects: ["AI Based Plant Disease Detection", "RAG Chatbot", "Multi-Agent Stock Analyst"] },
        { name: "Java", confidence: 80, years: 2, projects: ["DSA Practice", "University Projects"] },
        { name: "JavaScript", confidence: 90, years: 3, projects: ["Jodetx Internship", "LangGraph AI Workflow", "Personal Portfolio"] },
        { name: "SQL", confidence: 85, years: 2, projects: ["Banking Databases", "Sales Forecasting System"] },
        { name: "C", confidence: 75, years: 2, projects: ["Embedded ESP32 IoT Nodes"] }
      ]
    },
    {
      title: "AI & Machine Learning",
      items: [
        { name: "Machine Learning", confidence: 90, years: 2, projects: ["Customer Segmentation", "LT Line Fault Prediction"] },
        { name: "NLP", confidence: 85, years: 2, projects: ["RAG Chatbot", "Financial Sentiment Analysis"] },
        { name: "LangChain", confidence: 90, years: 2, projects: ["RAG Chatbot", "Multi-Agent Stock Analyst"] },
        { name: "LangGraph", confidence: 88, years: 1.5, projects: ["Multi-Agent Stock Analyst", "LangGraph AI Workflow"] },
        { name: "RAG", confidence: 92, years: 2, projects: ["RAG Chatbot", "Enterprise Document Indexer"] },
        { name: "OpenCV", confidence: 80, years: 1.5, projects: ["AI Based Plant Disease Detection", "Edge Video Feed Diagnostics"] },
        { name: "TensorFlow", confidence: 85, years: 2, projects: ["AI Based Plant Disease Detection"] }
      ]
    },
    {
      title: "Data Analytics",
      items: [
        { name: "Pandas", confidence: 92, years: 2, projects: ["Sales Forecasting System", "Customer Segmentation"] },
        { name: "NumPy", confidence: 90, years: 2, projects: ["Sales Forecasting System", "Vector Metrics"] },
        { name: "Matplotlib", confidence: 85, years: 2, projects: ["Multi-Agent Stock Analyst", "Customer Segmentation"] },
        { name: "EDA", confidence: 90, years: 2, projects: ["Sales Forecasting System", "Customer Segmentation"] }
      ]
    },
    {
      title: "Databases & APIs",
      items: [
        { name: "MySQL", confidence: 85, years: 2, projects: ["Banking Solutions", "Sales Database Schema"] },
        { name: "Qdrant", confidence: 88, years: 1.5, projects: ["RAG Chatbot", "LT Line Fault Detection System"] },
        { name: "REST APIs", confidence: 95, years: 3, projects: ["Jodetx Technologies", "RAG Chatbot Gateway"] }
      ]
    },
    {
      title: "Web Technologies",
      items: [
        { name: "React", confidence: 92, years: 3, projects: ["Jodetx Technologies", "LangGraph AI Workflow", "Personal Portfolio"] },
        { name: "Next.js", confidence: 90, years: 2, projects: ["Personal Portfolio", "LangGraph AI Workflow"] },
        { name: "Node.js", confidence: 85, years: 2, projects: ["Jodetx Technologies Backend", "Personal Projects"] },
        { name: "Tailwind", confidence: 95, years: 3, projects: ["Personal Portfolio", "LangGraph AI Workflow"] }
      ]
    },
    {
      title: "Developer Tools",
      items: [
        { name: "Git", confidence: 92, years: 3, projects: ["All Internships & Shared Projects"] },
        { name: "GitHub", confidence: 92, years: 3, projects: ["All Internships & Shared Projects"] },
        { name: "VS Code", confidence: 95, years: 3, projects: ["Daily Workspace"] }
      ]
    }
  ] as SkillCategory[],
  achievements: [
    {
      title: "Winner",
      subtitle: "Fyrst Ideation Challenge 2025",
      description: "Secured 1st place in the Fyrst Ideation Challenge organized by VIT-AP University for presenting an innovative technology-based solution.",
      date: "2025"
    },
    {
      title: "Shortlisted Innovator",
      subtitle: "All India Hackathon 2024",
      description: "Shortlisted among top engineering teams in the All India Hackathon for proposing a novel problem-solving project with practical real-world applications.",
      date: "2024"
    },
    {
      title: "200+ Solved",
      subtitle: "Data Structures & Algorithms",
      description: "Solved 200+ DSA problems across LeetCode, CodeChef, GeeksforGeeks, and HackerRank, strengthening problem-solving and algorithmic thinking.",
      date: "2024 – Present"
    },
    {
      title: "University Representative",
      subtitle: "Coding Competitions & Hackathons",
      description: "Actively participated in coding competitions, hackathons, and technology events representing DY Patil International University.",
      date: "2024 – Present"
    }
  ] as AchievementItem[]
};
