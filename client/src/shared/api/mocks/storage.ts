import { Retrospective } from '@/entities/retrospective/model/types';
import { Introduction } from '@/entities/introduction/model/types';
import { Resume } from '@/entities/resume/model/types';
import { CompanyWishlist } from '@/entities/company/model/types';

const STORAGE_KEYS = {
  RETROSPECTIVES: 'retrospectives',
  INTRODUCTIONS: 'introductions',
  RESUMES: 'resumes',
  COMPANY_WISHLIST: 'company_wishlist',
} as const;

const mockRetrospectives = [
  {
    id: 1,
    title: '프로젝트 A',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    isPublic: true,
    keywords: ['React', 'TypeScript'],
    summary: '프로젝트 요약',
    company: '회사 A',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
  },
  {
    id: 2,
    title: '프로젝트 B',
    situation: '상황',
    task: '과제',
    action: '행동',
    result: '결과',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
    isPublic: true,
    keywords: ['Next.js', 'TypeScript'],
    summary: '프로젝트 요약',
    company: '회사 B',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
  },
];

const mockIntroductions = [
  {
    id: 1,
    title: '프론트엔드 개발자 자기소개',
    content: '안녕하세요. 프론트엔드 개발자입니다.',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 2,
    title: '백엔드 개발자 자기소개',
    content: '안녕하세요. 백엔드 개발자입니다.',
    createdAt: '2024-02-01T00:00:00.000Z',
    updatedAt: '2024-02-01T00:00:00.000Z',
  },
];

const mockResumes = [
  {
    id: 1,
    userId: 1,
    selfIntroductionId: 1,
    title: '프론트엔드 개발자 이력서',
    content: '이력서 내용',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    isPublic: true,
    projects: [1, 2],
    companyWishlist: [1],
  },
];

const mockCompanyWishlist = [
  {
    id: 1,
    userId: 1,
    company: '회사 A',
    link: 'https://example.com',
    resumeId: 1,
    isJobApplied: false,
    status: 'DOCUMENT_SUBMITTED',
    description: '회사 설명',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];

export class Storage {
  private static instance: Storage;

  private constructor() {
    this.initializeStorage();
  }

  public static getInstance(): Storage {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }

  private initializeStorage() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.RETROSPECTIVES)) {
      localStorage.setItem(
        STORAGE_KEYS.RETROSPECTIVES,
        JSON.stringify(mockRetrospectives)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.INTRODUCTIONS)) {
      localStorage.setItem(
        STORAGE_KEYS.INTRODUCTIONS,
        JSON.stringify(mockIntroductions)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.RESUMES)) {
      localStorage.setItem(
        STORAGE_KEYS.RESUMES,
        JSON.stringify(mockResumes)
      );
    }

    if (!localStorage.getItem(STORAGE_KEYS.COMPANY_WISHLIST)) {
      localStorage.setItem(
        STORAGE_KEYS.COMPANY_WISHLIST,
        JSON.stringify(mockCompanyWishlist)
      );
    }
  }

  getRetrospectives(): Retrospective[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.RETROSPECTIVES);
    return data ? JSON.parse(data) : [];
  }

  addRetrospective(retrospective: Omit<Retrospective, 'id' | 'createdAt' | 'updatedAt'>): Retrospective {
    const retrospectives = this.getRetrospectives();
    const newId = retrospectives.length > 0 ? Math.max(...retrospectives.map(r => r.id)) + 1 : 1;
    
    const now = new Date().toISOString();
    const newRetrospective: Retrospective = {
      ...retrospective,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    localStorage.setItem(
      STORAGE_KEYS.RETROSPECTIVES,
      JSON.stringify([...retrospectives, newRetrospective])
    );

    return newRetrospective;
  }

  updateRetrospective(id: number, data: Partial<Retrospective>): Retrospective | null {
    const retrospectives = this.getRetrospectives();
    const index = retrospectives.findIndex(r => r.id === id);
    
    if (index === -1) return null;

    const updatedRetrospective = {
      ...retrospectives[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    retrospectives[index] = updatedRetrospective;
    localStorage.setItem(STORAGE_KEYS.RETROSPECTIVES, JSON.stringify(retrospectives));

    return updatedRetrospective;
  }

  deleteRetrospective(id: number): boolean {
    const retrospectives = this.getRetrospectives();
    const filteredRetrospectives = retrospectives.filter(r => r.id !== id);
    
    if (filteredRetrospectives.length === retrospectives.length) return false;

    localStorage.setItem(STORAGE_KEYS.RETROSPECTIVES, JSON.stringify(filteredRetrospectives));
    return true;
  }

  getIntroductions(): Introduction[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.INTRODUCTIONS);
    return data ? JSON.parse(data) : [];
  }

  addIntroduction(introduction: Omit<Introduction, 'id' | 'createdAt' | 'updatedAt'>): Introduction {
    const introductions = this.getIntroductions();
    const newId = introductions.length > 0 ? Math.max(...introductions.map(i => i.id)) + 1 : 1;
    
    const now = new Date().toISOString();
    const newIntroduction: Introduction = {
      ...introduction,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    localStorage.setItem(
      STORAGE_KEYS.INTRODUCTIONS,
      JSON.stringify([...introductions, newIntroduction])
    );

    return newIntroduction;
  }

  updateIntroduction(id: number, data: Partial<Introduction>): Introduction | null {
    const introductions = this.getIntroductions();
    const index = introductions.findIndex(i => i.id === id);
    
    if (index === -1) return null;

    const updatedIntroduction = {
      ...introductions[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    introductions[index] = updatedIntroduction;
    localStorage.setItem(STORAGE_KEYS.INTRODUCTIONS, JSON.stringify(introductions));

    return updatedIntroduction;
  }

  deleteIntroduction(id: number): boolean {
    const introductions = this.getIntroductions();
    const filteredIntroductions = introductions.filter(i => i.id !== id);
    
    if (filteredIntroductions.length === introductions.length) return false;

    localStorage.setItem(STORAGE_KEYS.INTRODUCTIONS, JSON.stringify(filteredIntroductions));
    return true;
  }

  getResumes(): Resume[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.RESUMES);
    return data ? JSON.parse(data) : [];
  }

  addResume(resume: Omit<Resume, 'id' | 'createdAt' | 'updatedAt'>): Resume {
    const resumes = this.getResumes();
    const newId = resumes.length > 0 ? Math.max(...resumes.map(r => r.id)) + 1 : 1;
    
    const now = new Date().toISOString();
    const newResume: Resume = {
      ...resume,
      id: newId,
      createdAt: now,
      updatedAt: now,
    };

    localStorage.setItem(
      STORAGE_KEYS.RESUMES,
      JSON.stringify([...resumes, newResume])
    );

    return newResume;
  }

  updateResume(id: number, data: Partial<Resume>): Resume | null {
    const resumes = this.getResumes();
    const index = resumes.findIndex(r => r.id === id);
    
    if (index === -1) return null;

    const updatedResume = {
      ...resumes[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    resumes[index] = updatedResume;
    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));

    return updatedResume;
  }

  deleteResume(id: number): boolean {
    const resumes = this.getResumes();
    const filteredResumes = resumes.filter(r => r.id !== id);
    
    if (filteredResumes.length === resumes.length) return false;

    localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(filteredResumes));
    return true;
  }

  getCompanyWishlist(): CompanyWishlist[] {
    if (typeof window === 'undefined') return [];

    const data = localStorage.getItem(STORAGE_KEYS.COMPANY_WISHLIST);
    return data ? JSON.parse(data) : [];
  }

  getRetrospective(id: number): Retrospective | null {
    const retrospectives = this.getRetrospectives();
    return retrospectives.find(r => r.id === id) || null;
  }

  getIntroduction(id: number): Introduction | null {
    const introductions = this.getIntroductions();
    return introductions.find(i => i.id === id) || null;
  }

  getResume(id: number): Resume | null {
    const resumes = this.getResumes();
    return resumes.find(r => r.id === id) || null;
  }

  createRetrospective = this.addRetrospective;
  createIntroduction = this.addIntroduction;
  createResume = this.addResume;
}

export const storage = Storage.getInstance(); 