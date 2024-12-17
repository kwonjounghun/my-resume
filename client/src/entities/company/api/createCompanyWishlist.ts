import { CreateCompanyWishlistRequest, CreateCompanyWishlistResponse } from '../model/types';

export async function createCompanyWishlist(
  request: CreateCompanyWishlistRequest
): Promise<CreateCompanyWishlistResponse> {
  const response = await fetch('/api/company-wishlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to create company wishlist');
  }

  return response.json();
} 