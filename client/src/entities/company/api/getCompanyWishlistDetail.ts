import { CompanyWishlist } from '../model/types';
import { client } from '@/shared/api/client';

export const getCompanyWishlistDetail = async (id: string): Promise<CompanyWishlist> => {
  return client.get<CompanyWishlist>(`/company-wishlist/${id}`);
}; 