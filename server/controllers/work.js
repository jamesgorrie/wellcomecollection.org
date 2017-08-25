import {List} from 'immutable';
import {createPageConfig} from '../model/page-config';
import {getWork, getWorks} from '../services/wellcomecollection-api';
import {createResultsList} from '../model/results-list';
import {PaginationFactory} from '../model/pagination';

function imageUrlFromMiroId(id, useIiif, useOrigin) {
  const cleanedMiroId = id.match(/(^\w{1}[0-9]*)+/g, '')[0];
  const miroFolder = `${cleanedMiroId.slice(0, -3)}000`;

  return `https://s3-eu-west-1.amazonaws.com/miro-images-public/${miroFolder}/${id}.jpg`;
}

export const work = async(ctx, next) => {
  const id = ctx.params.id;
  const queryString = ctx.search;
  const singleWork = await getWork(id);

  const miroId = singleWork.identifiers[0].value;
  const imgWidth = '2048';
  const imgLink = imageUrlFromMiroId(miroId);

  ctx.render('pages/work', {
    id,
    queryString,
    pageConfig: createPageConfig({
      title: 'Work',
      inSection: 'images',
      category: 'collections',
      canonicalUri: `${ctx.globals.rootDomain}/works/${singleWork.id}`
    }),
    work: Object.assign({}, singleWork, {
      imgLink,
      imgWidth
    })
  });

  return next();
};

export const search = async (ctx, next) => {
  const { query, page } = ctx.query;
  const queryString = ctx.search;
  const results = query && query.trim() !== '' ? await getWorks(query, page) : null;
  const resultsArray = results && results.results || [];
  const pageSize = results && results.pageSize;
  const totalPages = results && results.totalPages;
  const totalResults = (results && results.totalResults) || 0;
  const resultsList = createResultsList({
    results: resultsArray,
    pageSize,
    totalPages,
    totalResults
  });
  const path = ctx.request.url;
  const pagination = PaginationFactory.fromList(List(resultsArray), parseInt(totalResults, 10) || 1, parseInt(page, 10) || 1, pageSize || 1, ctx.query);
  ctx.render('pages/search', {
    pageConfig: createPageConfig({
      path: path,
      inSection: 'images',
      canonicalUri: `${ctx.globals.rootDomain}/works`
    }),
    resultsList,
    query,
    pagination,
    queryString
  });
  return next();
};
