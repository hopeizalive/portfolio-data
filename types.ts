export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  github?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: 'Github' | 'Linkedin' | 'Twitter' | 'Mail';
}

export interface PortfolioData {
  name: string;
  role: string;
  tagline: string;
  about: string;
  location: string;
  phone: string;
  email: string;
  availability: string;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  socials: SocialLink[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}