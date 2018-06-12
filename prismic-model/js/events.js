// @flow
import title from './parts/title';
import contributors from './parts/contributors';
import promo from './parts/promo';
import timestamp from './parts/timestamp';
import place from './parts/place';
import link from './parts/link';
import list from './parts/list';
import structuredText from './parts/structured-text';
import embed from './parts/embed';
import boolean from './parts/boolean';
import text from './parts/text';

const Events = {
  Event: {
    title,
    format: link('Format', 'document', ['event-formats']),
    place: place,
    series: list('Event series', {
      series: link('Series', 'document', ['event-series'])
    }),
    times: list('Times', {
      startDateTime: timestamp('Start'),
      endDateTime: timestamp('End'),
      isFullyBooked: boolean('Fully booked')
    }),
    description: structuredText('Description', 'multi', ['heading2', 'list-item'])
  },
  Access: {
    interpretations: list('Interpretations', {
      interpretationType: link('Interpretation', 'document', ['interpretation-types']),
      isPrimary: boolean('Primary interprtation')
    }),
    audiences: list('Audiences', {
      audience: link('Audience', 'document', ['audiences'])
    })
  },
  Reservation: {
    bookingEnquiryTeam: link('Booking enquiry team', 'document', ['teams']),
    eventbriteEvent: embed('Eventbrite event'),
    isDropIn: boolean('Drop in'),
    bookingInformation: structuredText('Event specific booking information'),
    cost: text('Cost')
  },
  Schedule: {
    schedule: list('Events', {
      event: link('Event', 'document', ['events'])
    }),
    backgroundTexture: link('Background texture', 'document', ['background-textures'])
  },
  Contributors: {
    contributors
  },
  Promo: {
    promo
  }
};

export default Events;