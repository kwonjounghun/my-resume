export interface Link {
  type: 'Link';
  url: string;
  description: string;
}

export interface Education {
  schoolName: string;
  major: string;
  startDate: string; // YYYY.MM
  endDate: string; // YYYY.MM
  isAttending: boolean;
}

export interface Skill {
  name: string;
  level: number; // 1-5
}

export interface Award {
  title: string;
  date: string; // YYYY.MM
  description: string;
}

export interface Language {
  name: string;
  level: string; // 상/중/하
  certifications: {
    name: string;
    score: string;
    date: string; // YYYY.MM
  }[];
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: Education[];
  skills: Skill[];
  awards: Award[];
  languages: Language[];
  links: Link[];
  createdAt: string;
  updatedAt: string;
}

export type ProfileResponse = {
  profile: Profile;
};

export type ProfileFormData = {
  name: string;
  email: string;
  phone: string;
  education: Education[];
  skills: Skill[];
  awards: Award[];
  languages: Language[];
  links: Link[];
};

export type CreateProfileRequest = ProfileFormData;
export type UpdateProfileRequest = Partial<CreateProfileRequest>; 