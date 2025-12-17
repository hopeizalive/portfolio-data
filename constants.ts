import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Adil Rajput",
  role: "System Analyst / Team Lead",
  tagline: "Designing robust, scalable technical architectures and delivering state-of-the-art enterprise solutions.",
  location: "Pakistan (Hybrid)",
  availability: "Open to new opportunities",
  about: "I am a highly innovative software developer and leader with over a decade of extensive experience in the complete software development lifecycle (SDLC). My expertise spans Full Stack Development (Java, Node.js, Frontend), System Analysis, and Technical Team Leadership. I have a proven track record of translating complex business requirements into robust technical architectures and driving teams to deliver optimized, high-quality code.",
  skills: [
    {
      category: "Backend & Core",
      items: ["Java SE/EE", "C# / .NET", "Node.js", "Spring Boot", "Express.js", "NestJS", "PHP"]
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Vue.js", "Redux", "TypeScript", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Database",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "SQL Optimization"]
    },
    {
      category: "DevOps & Cloud",
      items: ["Docker", "AWS", "CI/CD (GitHub Actions/GitLab)", "Apache Tomcat", "Nginx"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Team Lead",
      company: "Ornesol (Pvt) Ltd",
      period: "Oct 2024 – Present",
      description: [
        "Spearhead technical leadership for development and system analysis teams, ensuring successful delivery of complex enterprise solutions.",
        "Direct critical architectural decisions, sprint planning, and resource allocation.",
        "Implement and enforce software quality assurance (SQA) best practices and performance optimization strategies."
      ]
    },
    {
      id: "exp-2",
      role: "System Analyst",
      company: "Dimensional Sys, Inc",
      period: "Oct 2021 – Dec 2024",
      description: [
        "Conducted comprehensive requirement analysis, expertly translating complex business needs into technical workflows.",
        "Enhanced backend architecture using Node.js, Dotnet Core, and MongoDB, improving system efficiency.",
        "Maintained high software quality standards through rigorous validation and collaborative QA efforts."
      ]
    },
    {
      id: "exp-3",
      role: "System Analyst",
      company: "FWU AG Pakistan",
      period: "Jan 2020 – Oct 2021",
      description: [
        "Analyzed complex functional requirements and designed scalable system architecture based on MVC and cloud-oriented patterns.",
        "Provided technical guidance and debugging expertise to junior development teams.",
        "Ensured smooth deployment cycles with a focus on performance stability."
      ]
    },
    {
      id: "exp-4",
      role: "Programming Analyst",
      company: "FWU AG Pakistan",
      period: "Jan 2019 – Jan 2020",
      description: [
        "Developed scalable program modules aligned with defined system requirements and PaaS-based architecture.",
        "Participated in high-impact performance tuning and code optimization initiatives.",
        "Ensured adherence to code quality standards and internal coding guidelines."
      ]
    },
    {
      id: "exp-5",
      role: "Java Developer",
      company: "FWU AG Pakistan",
      period: "Mar 2018 – Jan 2019",
      description: [
        "Engineered Java-based enterprise applications utilizing MVC architecture.",
        "Resolved critical production issues and measurably improved application stability.",
        "Contributed significantly to requirement analysis and module enhancement processes."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Halkar.com Platform",
      description: "A Java PaaS business management platform. Designed and delivered core features for social networking, advanced scheduling, and workflow management including User Profile, Calendar, and Partner Agreement modules.",
      tags: ["Java", "PaaS", "Workflow Mgmt"],
      imageUrl: "https://picsum.photos/800/600?random=1",
    },
    {
      id: "proj-2",
      title: "Insurance Products Suite",
      description: "Developed sophisticated insurance solutions focusing on Individual Life & Banca Solutions. Focused on robust backend development, seamless module integration, and comprehensive code optimization.",
      tags: ["Java", "Backend", "FinTech"],
      imageUrl: "https://picsum.photos/800/600?random=2",
    },
    {
      id: "proj-3",
      title: "Enterprise MVC Architecture",
      description: "Designed scalable system architectures based on MVC and cloud-oriented patterns for core business operations at FWU AG, handling complex functional requirements.",
      tags: ["MVC", "Cloud Architecture", "System Design"],
      imageUrl: "https://picsum.photos/800/600?random=3",
    },
    {
      id: "proj-4",
      title: "Dimensional Sys Backend",
      description: "Enhanced backend architecture using Node.js, Dotnet Core, and MongoDB. Applied advanced code optimization techniques to improve system efficiency for enterprise clients.",
      tags: ["Node.js", ".NET Core", "MongoDB"],
      imageUrl: "https://picsum.photos/800/600?random=4",
    }
  ],
  socials: [
    {
      platform: "Linkedin",
      url: "https://www.linkedin.com/in/javalover/",
      iconName: "Linkedin"
    },
    {
      platform: "Mail",
      url: "mailto:adiljv@gmail.com",
      iconName: "Mail"
    }
  ]
};

export const SYSTEM_PROMPT = `
You are an AI assistant for ${PORTFOLIO_DATA.name}'s portfolio website. 
Your goal is to answer visitor questions about ${PORTFOLIO_DATA.name} based STRICTLY on the provided data.
Act as a professional, friendly, and knowledgeable representative of ${PORTFOLIO_DATA.name}.

Here is the data about ${PORTFOLIO_DATA.name}:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}
Additional Contact: Cell: +92-3327302240

Rules:
1. Keep answers concise and engaging.
2. If asked about contact info, provide the LinkedIn, Email, or Cell number.
3. If asked about something not in the data, professionally state that you don't have that information but suggest contacting ${PORTFOLIO_DATA.name} directly.
4. Highlight technical skills (Java, .NET, Node.js) and team leadership experience.
5. Do not make up facts.
`;