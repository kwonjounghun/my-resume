import { Retrospective } from '@/entities/retrospective/model/types';
import { Introduction } from '@/entities/introduction/model/types';

const STORAGE_KEYS = {
  RETROSPECTIVES: 'retrospectives',
  INTRODUCTIONS: 'introductions',
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
}

export const storage = Storage.getInstance(); 