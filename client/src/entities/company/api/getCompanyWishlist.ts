import { CompanyWishlist } from '../model/types';

interface GetCompanyWishlistResponse {
  companyWishlist: CompanyWishlist[];
}

export const getCompanyWishlist = async (): Promise<GetCompanyWishlistResponse> => {
  const response = await fetch('/api/company-wishlist');

  if (!response.ok) {
    throw new Error('관심기업 목록을 조회하는데 실패했습니다.');
  }

  return response.json();
}; 