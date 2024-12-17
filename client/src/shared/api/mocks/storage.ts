import { CompanyWishlist } from '@/entities/company/model/types';
import { Introduction } from '@/entities/introduction/model/types';
import { Resume } from '@/entities/resume/model/types';
import { Retrospective } from '@/entities/retrospective/model/types';

const DEFAULT_DATA = {
  company_wishlist: [
    {
      id: 1,
      userid: 1,
      company: '토스',
      link: 'https://toss.im/career/jobs',
      resumeId: 1,
      isJobApplied: false,
      status: 'DOCUMENT_SUBMITTED',
      description: '토스에서 프론트엔드 개발자를 찾습니다.',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ],
  introductions: [
    {
      id: 1,
      title: '프론트엔드 개발자 자기소개',
      content: '안녕하세요. 프론트엔드 개발자입니다.',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ],
  resumes: [
    {
      id: 1,
      userid: 1,
      selfIntroductionId: 1,
      title: '프론트엔드 개발자 이력서',
      content: '프론트엔드 개발자 이력서입니다.',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      isPublic: true,
      projects: [1],
      companyWishlist: [],
    },
  ],
  retrospectives: [
    {
      id: 1,
      title: '프로젝트 A',
      situation: '프로젝트 시작 단계에서 성능 이슈가 있었습니다.',
      task: '웹 애플리케이션의 초기 로딩 속도를 개선해야 했습니다.',
      action: 'Code Splitting과 이미지 최적화를 적용했습니다.',
      result: '초기 로딩 시간을 3초에서 1초로 단축했습니다.',
      isPublic: true,
      keywords: ['React', 'Performance'],
      company: '회사 A',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      summary: '성능 최적화 프로젝트를 성공적으로 완료했습니다.',
    },
  ],
};

export class Storage {
  private getItem<T>(key: string): T[] {
    if (typeof window === 'undefined') return [];
    const item = localStorage.getItem(key);
    if (!item) {
      const defaultData = DEFAULT_DATA[key as keyof typeof DEFAULT_DATA] as T[];
      this.setItem(key, defaultData);
      return defaultData;
    }
    return JSON.parse(item);
  }

  private setItem<T>(key: string, value: T[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Company Wishlist methods
  addCompanyWishlist(companyWishlist: CompanyWishlist): CompanyWishlist {
    const companyWishlists = this.getItem<CompanyWishlist>('company_wishlist');
    companyWishlists.push(companyWishlist);
    this.setItem('company_wishlist', companyWishlists);
    return companyWishlist;
  }

  getCompanyWishlists(): CompanyWishlist[] {
    return this.getItem<CompanyWishlist>('company_wishlist');
  }

  getCompanyWishlist(id: number): CompanyWishlist | undefined {
    const companyWishlists = this.getItem<CompanyWishlist>('company_wishlist');
    return companyWishlists.find((item) => item.id === id);
  }

  updateCompanyWishlist(id: number, data: Partial<CompanyWishlist>): CompanyWishlist | undefined {
    const companyWishlists = this.getItem<CompanyWishlist>('company_wishlist');
    const index = companyWishlists.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...companyWishlists[index], ...data };
    companyWishlists[index] = updatedItem;
    this.setItem('company_wishlist', companyWishlists);
    return updatedItem;
  }

  deleteCompanyWishlist(id: number): boolean {
    const companyWishlists = this.getItem<CompanyWishlist>('company_wishlist');
    const index = companyWishlists.findIndex((item) => item.id === id);
    if (index === -1) return false;

    companyWishlists.splice(index, 1);
    this.setItem('company_wishlist', companyWishlists);
    return true;
  }

  // Introduction methods
  addIntroduction(introduction: Introduction): Introduction {
    const introductions = this.getItem<Introduction>('introductions');
    introductions.push(introduction);
    this.setItem('introductions', introductions);
    return introduction;
  }

  getIntroductions(): Introduction[] {
    return this.getItem<Introduction>('introductions');
  }

  getIntroduction(id: number): Introduction | undefined {
    const introductions = this.getItem<Introduction>('introductions');
    return introductions.find((item) => item.id === id);
  }

  updateIntroduction(id: number, data: Partial<Introduction>): Introduction | undefined {
    const introductions = this.getItem<Introduction>('introductions');
    const index = introductions.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...introductions[index], ...data };
    introductions[index] = updatedItem;
    this.setItem('introductions', introductions);
    return updatedItem;
  }

  deleteIntroduction(id: number): boolean {
    const introductions = this.getItem<Introduction>('introductions');
    const index = introductions.findIndex((item) => item.id === id);
    if (index === -1) return false;

    introductions.splice(index, 1);
    this.setItem('introductions', introductions);
    return true;
  }

  // Resume methods
  addResume(resume: Resume): Resume {
    const resumes = this.getItem<Resume>('resumes');
    resumes.push(resume);
    this.setItem('resumes', resumes);
    return resume;
  }

  getResumes(): Resume[] {
    return this.getItem<Resume>('resumes');
  }

  getResume(id: number): Resume | undefined {
    const resumes = this.getItem<Resume>('resumes');
    return resumes.find((item) => item.id === id);
  }

  updateResume(id: number, data: Partial<Resume>): Resume | undefined {
    const resumes = this.getItem<Resume>('resumes');
    const index = resumes.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...resumes[index], ...data };
    resumes[index] = updatedItem;
    this.setItem('resumes', resumes);
    return updatedItem;
  }

  deleteResume(id: number): boolean {
    const resumes = this.getItem<Resume>('resumes');
    const index = resumes.findIndex((item) => item.id === id);
    if (index === -1) return false;

    resumes.splice(index, 1);
    this.setItem('resumes', resumes);
    return true;
  }

  // Retrospective methods
  addRetrospective(retrospective: Retrospective): Retrospective {
    const retrospectives = this.getItem<Retrospective>('retrospectives');
    retrospectives.push(retrospective);
    this.setItem('retrospectives', retrospectives);
    return retrospective;
  }

  getRetrospectives(): Retrospective[] {
    return this.getItem<Retrospective>('retrospectives');
  }

  getRetrospective(id: number): Retrospective | undefined {
    const retrospectives = this.getItem<Retrospective>('retrospectives');
    return retrospectives.find((item) => item.id === id);
  }

  updateRetrospective(id: number, data: Partial<Retrospective>): Retrospective | undefined {
    const retrospectives = this.getItem<Retrospective>('retrospectives');
    const index = retrospectives.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...retrospectives[index], ...data };
    retrospectives[index] = updatedItem;
    this.setItem('retrospectives', retrospectives);
    return updatedItem;
  }

  deleteRetrospective(id: number): boolean {
    const retrospectives = this.getItem<Retrospective>('retrospectives');
    const index = retrospectives.findIndex((item) => item.id === id);
    if (index === -1) return false;

    retrospectives.splice(index, 1);
    this.setItem('retrospectives', retrospectives);
    return true;
  }
} 