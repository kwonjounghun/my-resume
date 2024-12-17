import { companyWishlistHandlers } from './company.handlers';
import { introductionHandlers } from './introduction.handlers';
import { resumeHandlers } from './resume.handlers';
import { retrospectiveHandlers } from './retrospective.handlers';

export const handlers = [
  ...companyWishlistHandlers,
  ...introductionHandlers,
  ...resumeHandlers,
  ...retrospectiveHandlers,
]; 