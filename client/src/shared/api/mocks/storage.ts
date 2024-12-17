import { CompanyWishlist } from '@/entities/company/model/types';
import { Introduction } from '@/entities/introduction/model/types';
import { Resume } from '@/entities/resume/model/types';
import { Retrospective } from '@/entities/retrospective/model/types';

export class Storage {
  private companyWishlists: CompanyWishlist[] = [];
  private introductions: Introduction[] = [];
  private resumes: Resume[] = [];
  private retrospectives: Retrospective[] = [];

  // Company Wishlist methods
  addCompanyWishlist(companyWishlist: CompanyWishlist): CompanyWishlist {
    this.companyWishlists.push(companyWishlist);
    return companyWishlist;
  }

  getCompanyWishlists(): CompanyWishlist[] {
    return this.companyWishlists;
  }

  getCompanyWishlist(id: number): CompanyWishlist | undefined {
    return this.companyWishlists.find((item) => item.id === id);
  }

  updateCompanyWishlist(id: number, data: Partial<CompanyWishlist>): CompanyWishlist | undefined {
    const index = this.companyWishlists.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...this.companyWishlists[index], ...data };
    this.companyWishlists[index] = updatedItem;
    return updatedItem;
  }

  deleteCompanyWishlist(id: number): boolean {
    const index = this.companyWishlists.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.companyWishlists.splice(index, 1);
    return true;
  }

  // Introduction methods
  addIntroduction(introduction: Introduction): Introduction {
    this.introductions.push(introduction);
    return introduction;
  }

  getIntroductions(): Introduction[] {
    return this.introductions;
  }

  getIntroduction(id: number): Introduction | undefined {
    return this.introductions.find((item) => item.id === id);
  }

  updateIntroduction(id: number, data: Partial<Introduction>): Introduction | undefined {
    const index = this.introductions.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...this.introductions[index], ...data };
    this.introductions[index] = updatedItem;
    return updatedItem;
  }

  deleteIntroduction(id: number): boolean {
    const index = this.introductions.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.introductions.splice(index, 1);
    return true;
  }

  // Resume methods
  addResume(resume: Resume): Resume {
    this.resumes.push(resume);
    return resume;
  }

  getResumes(): Resume[] {
    return this.resumes;
  }

  getResume(id: number): Resume | undefined {
    return this.resumes.find((item) => item.id === id);
  }

  updateResume(id: number, data: Partial<Resume>): Resume | undefined {
    const index = this.resumes.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...this.resumes[index], ...data };
    this.resumes[index] = updatedItem;
    return updatedItem;
  }

  deleteResume(id: number): boolean {
    const index = this.resumes.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.resumes.splice(index, 1);
    return true;
  }

  // Retrospective methods
  addRetrospective(retrospective: Retrospective): Retrospective {
    this.retrospectives.push(retrospective);
    return retrospective;
  }

  getRetrospectives(): Retrospective[] {
    return this.retrospectives;
  }

  getRetrospective(id: number): Retrospective | undefined {
    return this.retrospectives.find((item) => item.id === id);
  }

  updateRetrospective(id: number, data: Partial<Retrospective>): Retrospective | undefined {
    const index = this.retrospectives.findIndex((item) => item.id === id);
    if (index === -1) return undefined;

    const updatedItem = { ...this.retrospectives[index], ...data };
    this.retrospectives[index] = updatedItem;
    return updatedItem;
  }

  deleteRetrospective(id: number): boolean {
    const index = this.retrospectives.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.retrospectives.splice(index, 1);
    return true;
  }
} 