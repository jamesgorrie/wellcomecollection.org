// @flow

import {Fragment} from 'react';
import HeaderText from '../HeaderText/HeaderText';
import WobblyBottom from '../WobblyBottom/WobblyBottom';
import FreeSticker from '../FreeSticker/FreeSticker';
import {BasePageColumn} from '../BasePage/BasePage';
import {classNames, spacing} from '../../../utils/classnames';
import type {Node} from 'react';
import type {FeaturedMedia as FeaturedMediaType} from '../BaseHeader/BaseHeader';

type Props = {|
  title: string,
  DateInfo: ?Node,
  InfoBar: ?Node,
  FeaturedMedia: ?FeaturedMediaType,
|}

const ExhibitionHeader = ({
  title,
  FeaturedMedia,
  DateInfo,
  InfoBar
}: Props) => {
  return (
    <Fragment>
      <BasePageColumn>
        <div className='relative' style={{zIndex: 1}}>
          <FreeSticker />
        </div>
        <HeaderText
          topLink={{url: '/exhibitions', text: 'Exhibitions'}}
          Heading={<h1 className='h0 inline-block no-margin'>{title}</h1>}
          DateInfo={DateInfo}
          InfoBar={InfoBar}
          Description={null}
          TagBar={null} />
      </BasePageColumn>
      <div className='relative'>
        <div className={classNames({
          'margin-h-auto': true,
          [spacing({s: 2, m: 4}, {padding: ['left', 'right']})]: true
        })} style={{maxWidth: '1450px'}}>
          <WobblyBottom color='white'>
            {FeaturedMedia}
          </WobblyBottom>
        </div>
      </div>
    </Fragment>
  );
};

export default ExhibitionHeader;
