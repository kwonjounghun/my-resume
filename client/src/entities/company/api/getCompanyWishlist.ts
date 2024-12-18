import { CompanyWishlist } from '../model/types';
import { client } from '@/shared/api/client';

interface GetCompanyWishlistParams {
  page?: number;
  limit?: number;
}

interface GetCompanyWishlistResponse {
  companyWishlist: CompanyWishlist[];
  total: number;
}

export const getCompanyWishlist = async ({
  page = 1,
  limit = 10,
}: GetCompanyWishlistParams = {}): Promise<GetCompanyWishlistResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  return client.get<GetCompanyWishlistResponse>(`/company-wishlist?${params}`);
}; 