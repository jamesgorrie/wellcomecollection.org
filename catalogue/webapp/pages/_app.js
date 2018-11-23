// @flow
import type {AppInitialProps} from 'next/app';
import App, { Container } from 'next/app';
import Router from 'next/router';
import Head from 'next/head';
import ReactGA from 'react-ga';
import {parseOpeningTimesFromCollectionVenues} from '@weco/common/services/prismic/opening-times';
import Header from '@weco/common/views/components/Header/Header';
import InfoBanner from '@weco/common/views/components/InfoBanner/InfoBanner';
import NewsletterPromo from '@weco/common/views/components/NewsletterPromo/NewsletterPromo';
import Footer from '@weco/common/views/components/Footer/Footer';

const isServer = typeof window === 'undefined';
const isClient = !isServer;

let toggles = {};
let openingTimes;
let globalAlert;

export default class WecoApp extends App {
  static async getInitialProps({ Component, router, ctx }: AppInitialProps) {
    // Caching things from the server request to be available to the client
    toggles = isServer ? router.query.toggles : toggles;
    openingTimes = isServer ? router.query.openingTimes : openingTimes;
    globalAlert = isServer ? router.query.globalAlert : globalAlert;

    let pageProps = {};
    if (Component.getInitialProps) {
      ctx.query.toggles = toggles;
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps,
      toggles,
      openingTimes,
      globalAlert
    };
  }

  // TODO: (flowtype) 😡
  constructor(props: any) {
    if (isClient && !toggles) { toggles = props.toggles; }
    if (isClient && !openingTimes) { openingTimes = props.openingTimes; }
    if (isClient && !globalAlert) { globalAlert = props.globalAlert; }
    super(props);
  }

  componentDidMount() {
    // $FlowFixMe
    document.documentElement.classList.add('enhanced');

    // TODO: lazysizes
    // TODO: GA
    ReactGA.initialize([{
      trackingId: 'UA-55614-6',
      titleCase: false
    }, {
      trackingId: 'UA-55614-24',
      titleCase: false,
      gaOptions: {
        name: 'v2'
      }
    }]);
    const page = `${window.location.pathname}${window.location.search}`;
    console.info('pageview');
    ReactGA.pageview(page, ['v2']);
    Router.events.on('routeChangeComplete', () => {
      console.info('pageview');
      ReactGA.pageview(page, ['v2']);
    });
  }

  render () {
    const {
      Component,
      pageProps,
      openingTimes,
      globalAlert
    } = this.props;
    const polyfillFeatures = [
      'default',
      'Array.prototype.find',
      'Array.prototype.includes',
      'WeakMap',
      'URL'
    ];
    const isPreview = false;
    const parsedOpeningTimes = parseOpeningTimesFromCollectionVenues(openingTimes);

    return (
      <Container>
        <Head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <script src={`https://cdn.polyfill.io/v2/polyfill.js?features=${polyfillFeatures.join(',')}`}></script>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='apple-touch-icon' sizes='180x180' href='https://i.wellcomecollection.org/assets/icons/apple-touch-icon.png' />
          <link rel='shortcut icon' href='https://i.wellcomecollection.org/assets/icons/favicon.ico' type='image/ico' />
          <link rel='icon' type='image/png' href='https://i.wellcomecollection.org/assets/icons/favicon-32x32.png' sizes='32x32' />
          <link rel='icon' type='image/png' href='https://i.wellcomecollection.org/assets/icons/favicon-16x16.png' sizes='16x16' />
          <link rel='manifest' href='https://i.wellcomecollection.org/assets/icons/manifest.json' />
          <link rel='mask-icon' href='https://i.wellcomecollection.org/assets/icons/safari-pinned-tab.svg' color='#000000' />
          <script src='https://i.wellcomecollection.org/assets/libs/picturefill.min.js' async />
        </Head>

        <div className={isPreview ? 'is-preview' : undefined}>
          <a className='skip-link' href='#main'>Skip to main content</a>
          <Header siteSection={'works'} />
          {globalAlert.isShown === 'show' &&
            <InfoBanner text={globalAlert.text} cookieName='WC_globalAlert' />
          }
          <div id='main' className='main' role='main'>
            <Component {...pageProps} />
          </div>
          <NewsletterPromo />
          <Footer
            openingHoursId='footer'
            groupedVenues={parsedOpeningTimes.groupedVenues}
            upcomingExceptionalOpeningPeriods={parsedOpeningTimes.upcomingExceptionalOpeningPeriods} />
        </div>
      </Container>
    );
  }
}
