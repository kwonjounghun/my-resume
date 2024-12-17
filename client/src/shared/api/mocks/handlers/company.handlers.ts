import { http, HttpResponse } from 'msw';
import { Storage } from '../storage';

const storage = new Storage();

export const companyWishlistHandlers = [
  http.get('/api/company-wishlist', () => {
    const companyWishlist = storage.getCompanyWishlists();
    return HttpResponse.json({
      companyWishlist,
      total: companyWishlist.length,
    });
  }),

  http.get('/api/company-wishlist/:id', ({ params }) => {
    const { id } = params;
    const companyWishlist = storage.getCompanyWishlist(Number(id));
    if (!companyWishlist) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(companyWishlist);
  }),

  http.put('/api/company-wishlist/:id', async ({ params, request }) => {
    const { id } = params;
    const data = await request.json();
    const companyWishlist = storage.updateCompanyWishlist(Number(id), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    if (!companyWishlist) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(companyWishlist);
  }),

  http.delete('/api/company-wishlist/:id', ({ params }) => {
    const { id } = params;
    const success = storage.deleteCompanyWishlist(Number(id));
    if (!success) {
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 });
  }),

  http.post('/api/company-wishlist', async ({ request }) => {
    const data = await request.json();
    const companyWishlist = storage.addCompanyWishlist({
      ...data,
      id: Date.now(),
      isJobApplied: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return HttpResponse.json(companyWishlist);
  }),
]; 