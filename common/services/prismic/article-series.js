// @flow
import Prismic from 'prismic-javascript';
import {getDocument} from './api';
import {getArticles} from './articles';
import {parseGenericFields} from './parsers';
import type {PrismicDocument} from './types';
import type {ArticleSeries} from '../../model/article-series';
import type {Article} from '../../model/articles';

export function parseArticleSeries(document: PrismicDocument): ArticleSeries {
  const {data} = document;
  const genericFields = parseGenericFields(document);

  return {
    ...genericFields,
    type: 'article-series',

    // Amazing old crap fields
    title: data.name, // This was a text field
    description: data.description
  };
}

type ArticleSeriesProps = {| id: string |}
type ArticleSeriesWithArticles = {|
  series: ArticleSeries,
  articles: Article[]
|}

export async function getArticleSeries(req: ?Request, {
  id
}: ArticleSeriesProps): Promise<?ArticleSeriesWithArticles> {
  const articles = await getArticles(req, {
    page: 1,
    predicates: [Prismic.Predicates.at('my.articles.series.series', id)],
    order: 'desc'
  });

  if (articles && articles.results.length > 0) {
    const series = articles.results[0].series.find(series => series.id === id);

    return series && {
      series,
      articles: articles.results
    };
  } else {
    // TODO: (perf) we shouldn't really be doing two calls here, but it's for
    // when a series has no events attached.
    const document = await getDocument(req, id, {});
    return document && { series: parseArticleSeries(document), articles: [] };
  }
}
