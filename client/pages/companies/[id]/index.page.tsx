import { useRouter } from 'next/router';
import CompanyWishlistDetail from '@/pages/companies/CompaniesDetailPage';

export default function CompanyWishlistDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }

  return (
    <CompanyWishlistDetail id={id} />
  );
} 