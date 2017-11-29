import {setupApp} from './setup-app';
import {createPageConfig} from './model/page-config';
import {default as filtersMap} from './filters';
import Prismic from 'prismic-javascript';
import {getPrismicApi} from './services/prismic';
import {
  parsePromoListItem,
  parseExhibitionsDoc,
  prismicImage,
  asText
} from './services/prismic-parsers';

export {setupApp};
export const filters = filtersMap.toJS();
export const model = {createPageConfig};
export {Prismic};
export const prismicParsers = {
  parsePromoListItem,
  parseExhibitionsDoc,
  prismicImage,
  asText
};
export const services = {getPrismicApi};
