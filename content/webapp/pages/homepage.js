// @flow
import type {Context} from 'next';
import {Component} from 'react';
import {classNames, font, spacing, cssGrid} from '@weco/common/utils/classnames';
import {getExhibitions} from '@weco/common/services/prismic/exhibitions';
import {
  getEvents,
  orderEventsByNextAvailableDate,
  filterEventsForNext7Days
} from '@weco/common/services/prismic/events';
import {getArticles} from '@weco/common/services/prismic/articles';
import {convertJsonToDates} from './event';
import pharmacyOfColourData from '@weco/common/data/the-pharmacy-of-colour';
import {
  exhibitionLd,
  eventLd,
  articleLd
} from '@weco/common/utils/json-ld';
import StoryPromo from '@weco/common/views/components/StoryPromo/StoryPromo';
import SectionHeader from '@weco/common/views/components/SectionHeader/SectionHeader';
import ExhibitionsAndEvents from '@weco/common/views/components/ExhibitionsAndEvents/ExhibitionsAndEvents';
import SpacingSection from '@weco/common/views/components/SpacingSection/SpacingSection';
import PageLayout from '@weco/common/views/components/PageLayout/PageLayout';
import type {UiExhibition} from '@weco/common/model/exhibitions';
import type {UiEvent} from '@weco/common/model/events';
import type {Article} from '@weco/common/model/articles';
import type {PaginatedResults} from '@weco/common/services/prismic/types';

type Props = {|
  exhibitions: PaginatedResults<UiExhibition>,
  events: PaginatedResults<UiEvent>,
  articles: PaginatedResults<Article>
|}

const pageDescription = 'Visit our free museum and library in central London connecting science, medicine, life and art. Explore our exhibitions, live events, gallery tours, restaurant, cafe, bookshop, and cafe. Fully accessible. Open late on Thursday evenings.';
const pageImage = 'https://iiif.wellcomecollection.org/image/prismic:fc1e68b0528abbab8429d95afb5cfa4c74d40d52_tf_180516_2060224.jpg/full/800,/0/default.jpg';
export class HomePage extends Component<Props> {
  static getInitialProps = async (ctx: Context) => {
    const exhibitionsPromise = getExhibitions(ctx.req, {
      period: 'next-seven-days',
      order: 'asc'
    });
    const eventsPromise = getEvents(ctx.req, {
      period: 'current-and-coming-up'
    });
    const articlesPromise = getArticles(ctx.req, {pageSize: 4});
    const [exhibitions, events, articles] = await Promise.all([
      exhibitionsPromise, eventsPromise, articlesPromise
    ]);

    if (events && exhibitions && articles) {
      return {
        exhibitions,
        events,
        articles
      };
    } else {
      return {statusCode: 404};
    }
  }

  render() {
    const events = this.props.events.results.map(convertJsonToDates);
    const exhibitions = this.props.exhibitions.results.map(exhibition => {
      return {
        start: exhibition.start && new Date(exhibition.start),
        end: exhibition.end && new Date(exhibition.end),
        ...exhibition
      };
    });
    const articles = this.props.articles;
    return (
      <PageLayout
        title={''}
        description={pageDescription}
        url={'/'}
        jsonLd={
          [
            ...exhibitions.map(exhibitionLd),
            ...events.map(eventLd),
            ...articles.results.map(articleLd)
          ]
        }
        openGraphType={'website'}
        siteSection={null}
        imageUrl={pageImage}
        imageAltText={''}>
        <SpacingSection>
          <div className='css-grid__container'>
            <div className='css-grid'>
              <div className={classNames({
                [cssGrid({s: 12, m: 12, l: 10, xl: 9})]: true
              })}>
                <h1 className={classNames({
                  [font({s: 'WB4', m: 'WB3'})]: true,
                  [spacing({s: 3}, {margin: ['top']})]: true,
                  [spacing({s: 0}, {margin: ['bottom']})]: true
                })}>
                  The free museum and library for the incurably curious
                </h1>
              </div>
            </div>
          </div>
        </SpacingSection>

        <SpacingSection>
          <SectionHeader
            title='This week at Wellcome Collection'
            linkText='All exhibitions and events'
            linkUrl='/whats-on'
          />
          <ExhibitionsAndEvents
            exhibitions={exhibitions}
            events={
              orderEventsByNextAvailableDate(
                filterEventsForNext7Days(events)
              )}
            extras={[pharmacyOfColourData]}
          />
        </SpacingSection>

        <SpacingSection>
          <SectionHeader
            title='Latest articles, comics and more'
            linkText='All stories'
            linkUrl='/stories'
          />
          <div className='css-grid__container'>
            <div className='css-grid'>
              {articles.results.map((article, i) => {
                return (
                  <div
                    key={article.id}
                    className={classNames({
                      [cssGrid({s: 12, m: 6, l: 3, xl: 3})]: true
                    })}>
                    <StoryPromo
                      item={article}
                      position={i}
                      hasTransparentBackground={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </SpacingSection>
      </PageLayout>
    );
  }
};

export default HomePage;
