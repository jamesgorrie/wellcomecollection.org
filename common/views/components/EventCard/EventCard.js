// @flow
import CompactCard from '../CompactCard/CompactCard';
import Image from '../Image/Image';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import EventDateRange from '../EventDateRange/EventDateRange';
import type {UiEvent} from '../../../model/events';

type Props = {|
  event: UiEvent
|}

const EventCard = ({ event }: Props) => {
  const DateRangeComponent = EventDateRange({event});
  const ImageComponent = event.promo && event.promo.image && <Image {...event.promo.image} />;

  const firstTime = event.times[0];
  const lastTime = event.times[event.times.length - 1];
  const StatusIndicatorComponent =
    event.isPast ? <StatusIndicator start={firstTime.range.startDateTime} end={lastTime.range.endDateTime} /> : null;

  return <CompactCard
    url={`/events/${event.id}`}
    title={event.title}
    partNumber={null}
    color={null}
    labels={{labels: event.labels}}
    description={null}
    urlOverride={event.promo && event.promo.link}
    Image={ImageComponent}
    DateInfo={DateRangeComponent}
    StatusIndicator={StatusIndicatorComponent}
  />;
};

export default EventCard;
