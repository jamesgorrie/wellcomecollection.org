import { storiesOf } from '@storybook/react';
import MoreLink from '../../../common/views/components/Links/MoreLink/MoreLink';

const stories = storiesOf('Components', module);
stories.add('MoreLink', () => (
  <MoreLink url={`#`} name={`View all exhibitions`} />
));
