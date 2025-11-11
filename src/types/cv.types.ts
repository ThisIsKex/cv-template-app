export interface PersonalInfo {
  name: string;
  location: string;
  phone: string;
  email: string;
  github?: string;
  linkedin?: string;
  profileImage?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface Project {
  name: string;
  description: string;
  icon?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  profile: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  interests: string;
}
