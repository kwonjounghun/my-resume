import { useRouter } from 'next/router';
import CompaniesUpdatePage from '@/pages/companies/CompaniesUpdatePage';

export default function CompanyWishlistEditPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }


  return (
    <CompaniesUpdatePage id={id} />
  );
} 