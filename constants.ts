import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "Adil Rajput",
  role: "System Analyst / Team Lead",
  tagline: "Expert in full-stack development, system analysis, and technical leadership with 10+ years of experience.",
  location: "Pakistan (Hybrid)",
  phone: "+92-3327302240",
  email: "adiljv@gmail.com",
  availability: "Open to leadership positions",
  about: "Seeking a challenging and leadership-focused position where extensive experience in full-stack software development, system analysis, and team leadership can be leveraged to design, develop, and deliver cutting-edge enterprise solutions. Proven ability to translate complex business requirements into robust technical architectures and drive teams toward high-quality, optimized code. Expert in implementing robust MVC Architecture across Web Applications and cloud-based PaaS technology.",
  skills: [
    {
      category: "Programming Languages",
      items: ["Java SE/EE", "C# / .NET", "Node.js", "PHP", "JavaScript (ES6+)", "TypeScript", "SQL", "JSON", "YAML"]
    },
    {
      category: "Frontend Stack",
      items: ["React.js", "Vue.js", "Next.js", "Nuxt.js", "Redux", "Context API", "Material UI", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Backend Frameworks",
      items: ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate / JPA", "Express.js", "NestJS", "Fastify", "Koa.js", "Struts", "Servlets", "JSP"]
    },
    {
      category: "Databases & DevOps",
      items: ["MySQL", "PostgreSQL", "MongoDB", "Firebase", "Docker", "CI/CD (GitHub/GitLab)", "AWS Basics", "Nginx", "Apache Tomcat"]
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Team Lead",
      company: "Ornesol (Pvt) Ltd",
      period: "Oct 2024 – Present",
      description: [
        "Spearheaded and provided technical leadership to development and system analysis teams for complex enterprise-level solutions.",
        "Directed critical architectural decisions, sprint planning, and resource allocation.",
        "Implemented rigorous code reviews to enforce best practices and ensure highly optimized code.",
        "Facilitated coordination between business stakeholders and technical teams to reduce scope creep."
      ]
    },
    {
      id: "exp-2",
      role: "System Analyst",
      company: "Dimensional Sys, Inc",
      period: "Oct 2021 – Dec 2024",
      description: [
        "Conducted comprehensive requirement analysis, translating complex business needs into clear technical workflows.",
        "Enhanced backend architecture using Firebase, MongoDB, Node.js, and Dotnet Core with advanced performance tuning.",
        "Maintained high software quality standards through rigorous validation and testing support."
      ]
    },
    {
      id: "exp-3",
      role: "System Analyst",
      company: "FWU AG Pakistan",
      period: "Jan 2020 – Oct 2021",
      description: [
        "Analyzed functional requirements and designed scalable system architecture based on MVC and cloud-oriented patterns.",
        "Provided technical guidance, debugging expertise, and optimization assistance to junior development teams.",
        "Ensured smooth deployment cycles with a focus on SQA and performance stability."
      ]
    },
    {
      id: "exp-4",
      role: "Programming Analyst",
      company: "FWU AG Pakistan",
      period: "Jan 2019 – Jan 2020",
      description: [
        "Developed scalable program modules aligned with PaaS-based architecture.",
        "Participated in high-impact performance tuning and code optimization initiatives.",
        "Ensured adherence to code quality standards via SQA practices."
      ]
    },
    {
      id: "exp-5",
      role: "Java Developer",
      company: "FWU AG Pakistan",
      period: "Mar 2018 – Jan 2019",
      description: [
        "Engineered Java-based enterprise applications utilizing MVC architecture for core operations.",
        "Resolved critical production issues and improved application stability and UX.",
        "Contributed to requirement analysis and module enhancement."
      ]
    },
    {
      id: "exp-6",
      role: "Java Developer",
      company: "Centegy Technologies",
      location: "Karachi",
      period: "Mar 2017 – Mar 2018",
      description: [
        "Developed sophisticated insurance products focusing on Individual Life & Banca Solutions.",
        "Focused on robust backend development and seamless module integration.",
        "Championed continuous quality improvements across release cycles."
      ]
    },
    {
      id: "exp-7",
      role: "ASP .NET Developer",
      company: "INFOBITS LIMITED",
      period: "Nov 2016 – Feb 2017",
      description: [
        "Developed ASP.NET modules using MVC frameworks for enterprise applications.",
        "Conducted rigorous bug fixing, code reviews, and testing to ensure high delivery quality."
      ]
    },
    {
      id: "exp-8",
      role: "Java Web Developer",
      company: "Halkar Inc",
      period: "Oct 2012 – 2014",
      description: [
        "Developed and maintained Halkar.com, a Java PaaS business management platform.",
        "Implemented User Profile, Calendar, Meetings, and Partner Agreement modules.",
        "Designed core features for social networking and workflow management."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Halkar.com Platform",
      description: "A large-scale Java PaaS platform for business management, featuring complex modules for scheduling, meetings, and partner agreements.",
      tags: ["Java", "PaaS", "Workflow", "MVC"],
      imageUrl: "https://picsum.photos/800/600?random=11",
    },
    {
      id: "proj-2",
      title: "Individual Life & Banca Solutions",
      description: "Sophisticated insurance product suite developed at Centegy Technologies, focusing on high-reliability backend and module integration.",
      tags: ["Java", "FinTech", "Backend"],
      imageUrl: "https://picsum.photos/800/600?random=12",
    },
    {
      id: "proj-3",
      title: "Cloud-Oriented MVC Architectures",
      description: "Series of scalable system architectures designed for FWU AG, implementing cloud-native patterns and strict performance metrics.",
      tags: ["Architecture", "MVC", "Cloud", "SQA"],
      imageUrl: "https://picsum.photos/800/600?random=13",
    },
    {
      id: "proj-4",
      title: "Dimensional Enterprise Backend",
      description: "Modern backend optimization for enterprise systems utilizing a hybrid stack of Node.js and .NET Core.",
      tags: ["Node.js", ".NET Core", "MongoDB", "Firebase"],
      imageUrl: "https://picsum.photos/800/600?random=14",
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

Personal Details:
- Name: ${PORTFOLIO_DATA.name}
- Role: ${PORTFOLIO_DATA.role}
- Phone: ${PORTFOLIO_DATA.phone}
- Email: ${PORTFOLIO_DATA.email}
- Location: ${PORTFOLIO_DATA.location}

Full Experience Data:
${JSON.stringify(PORTFOLIO_DATA.experience, null, 2)}

Full Skills Data:
${JSON.stringify(PORTFOLIO_DATA.skills, null, 2)}

Rules:
1. Keep answers concise and engaging.
2. If asked about contact info, provide the LinkedIn, Email, or Cell number (${PORTFOLIO_DATA.phone}).
3. If asked about something not in the data, professionally state that you don't have that information but suggest contacting ${PORTFOLIO_DATA.name} directly.
4. Highlight technical skills (Java, .NET, Node.js) and team leadership experience.
5. Do not make up facts.
6. When using voice mode, speak naturally and professionally.
`;