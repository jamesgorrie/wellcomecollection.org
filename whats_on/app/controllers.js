import {model, prismic} from 'common';

import {
  shopPromo,
  cafePromo,
  readingRoomPromo,
  restaurantPromo,
  spiritBoothPromo,
  dailyTourPromo
} from '../../server/data/facility-promos';
const {createPageConfig} = model;
const {
  getExhibitionAndEventPromos
} = prismic;

export async function renderWhatsOn(ctx, next) {
  const exhibitionAndEventPromos = await getExhibitionAndEventPromos(ctx.query);

  ctx.render('pages/whats-on', {
    pageConfig: createPageConfig({
      path: ctx.request.url,
      title: 'What\'s on',
      inSection: 'whatson',
      category: 'public-programme',
      contentType: 'list',
      canonicalUri: '/whats-on',
      pageState: {
        dateRangeName: exhibitionAndEventPromos.active
      }
    }),
    exhibitionAndEventPromos,
    tryTheseTooPromos: [readingRoomPromo, spiritBoothPromo],
    eatShopPromos: [cafePromo, shopPromo, restaurantPromo],
    cafePromo,
    shopPromo,
    dailyTourPromo
  });

  return next();
}
