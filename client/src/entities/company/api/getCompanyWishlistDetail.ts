import { CompanyWishlist } from '../model/types';

export const getCompanyWishlistDetail = async (id: number): Promise<CompanyWishlist> => {
  const response = await fetch(`/api/company-wishlist/${id}`);
  if (!response.ok) {
    throw new Error('관심기업을 찾을 수 없습니다.');
  }
  return response.json();
}; 