import { NextPage } from 'next';
import CompanyWishlist from '@/widgets/company-wishlist/ui/CompanyWishlist';
import withAuth from '@/shared/hocs/withAuth';

const CompaniesPage: NextPage = () => {
  return <CompanyWishlist />;
};

export default withAuth(CompaniesPage); 