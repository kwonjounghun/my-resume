import { CompanyWishlist } from '../model/types';

export async function updateCompanyWishlist(
  id: number,
  data: Partial<CompanyWishlist>
): Promise<CompanyWishlist> {
  try {
    const response = await fetch(`/api/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('관심기업을 수정할 수 없습니다.');
    }

    const updatedCompany = await response.json();
    return updatedCompany;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('관심기업을 수정할 수 없습니다.');
  }
} 