import { CompanyWishlist } from '../model/types';
import { client } from '@/shared/api/client';

interface CreateCompanyWishlistData {
  company: string;
  link: string;
  resumeId?: string;
  description?: string;
  isJobApplied?: boolean;
  status?: string;
}

export const createCompanyWishlist = async (data: CreateCompanyWishlistData): Promise<CompanyWishlist> => {
  return client.post<CompanyWishlist>('/company-wishlist', data);
} 