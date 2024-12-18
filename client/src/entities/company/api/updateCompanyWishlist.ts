import { CompanyWishlist } from '../model/types';
import { client } from '@/shared/api/client';

interface UpdateCompanyWishlistData {
  company: string;
  link: string;
  resumeId: string;
  description: string;
  isJobApplied: boolean;
  status: string;
}

export const updateCompanyWishlist = async (
  id: string,
  data: UpdateCompanyWishlistData
): Promise<CompanyWishlist> => {
  return client.put<CompanyWishlist>(`/company-wishlist/${id}`, data);
} 