// @flow
import {Fragment, Component} from 'react';
import {font, spacing, classNames} from '../../../utils/classnames';
import {CaptionedImage} from '../Images/Images';
import WobblyEdge from '../WobblyEdge/WobblyEdge';
import Button from '../Buttons/Button/Button';
import Icon from '../Icon/Icon';
import Layout12 from '../Layout12/Layout12';
import type {CaptionedImage as CaptionedImageProps} from '../../../model/captioned-image';

type Props = {|
  id: string,
  title: ?string,
  items: CaptionedImageProps[]
|}

type State = {|
  isActive: boolean,
  titleStyle: ? {|transform: string, maxWidth: string|}
|}

class ImageGallery extends Component<Props, State> {
  state = {
    isActive: true,
    titleStyle: null
  }

  showAllImages = () => {
    this.setState({
      isActive: true
    });
  }

  itemsToShow = () => {
    return this.state.isActive ? this.props.items : [this.props.items[0]];
  }

  componentDidMount() {
    this.setState({
      isActive: false
    });
  }

  // We want the image gallery title to be aligned with the first image
  // So we adjust the translateX and width accordingly
  setTitleStyle = (value: number) => {
    this.setState({
      titleStyle: {
        transform: `translateX(calc((100vw - ${value}px) / 2))`,
        maxWidth: `${value}px`
      }
    });
  }

  render() {
    const { title, items } = this.props;
    const { isActive, titleStyle } = this.state;

    return (
      <Fragment>
        <span
          style={titleStyle}
          className={classNames({
            'flex flex--v-top': true,
            [spacing({s: 4}, {margin: ['bottom']})]: true
          })}>
          <Icon name='gallery' extraClasses={`${spacing({s: 1}, {margin: ['right']})}`} />
          <h2 className='h2 no-margin'>{title || 'In pictures'}</h2>
        </span>
        <div className={classNames({
          [spacing({s: 10}, {margin: ['bottom']})]: true,
          'image-gallery-v2 row relative': true,
          'is-active font-white': isActive
        })}>
          <Layout12>
            <div className={`relative`}>
              {!isActive &&
                <Fragment>
                  <div className='image-gallery-v2__wobbly-edge absolute'>
                    <WobblyEdge
                      background='cream' />
                  </div>
                </Fragment>
              }

              {this.itemsToShow().map((captionedImage, i) => (
                <div
                  onClick={!isActive ? this.showAllImages : undefined}
                  className={classNames({
                    [spacing({s: 10}, {margin: ['bottom']})]: isActive
                  })}
                  key={captionedImage.image.contentUrl}>

                  <CaptionedImage
                    image={captionedImage.image}
                    caption={captionedImage.caption}
                    setTitleStyle={i === 0 ? this.setTitleStyle : undefined}
                    sizesQueries={'(max-width: 600px) 100vw, ' + (captionedImage.image.width / captionedImage.image.height) * 640 + 'px'}
                    preCaptionNode={
                      <div className={classNames({
                        [font({s: 'HNM5', m: 'HNM4'})]: true,
                        [spacing({s: 2}, {margin: ['bottom']})]: true
                      })}>
                        <span className='visually-hidden'>slide </span>{i + 1} of {items.length}
                      </div>
                    }>
                  </CaptionedImage>

                </div>
              ))}

              {!isActive &&
                <Button
                  type='primary'
                  icon='gallery'
                  clickHandler={this.showAllImages}
                  extraClasses='image-gallery-v2__button absolute'
                  text={`${items.length} images`} />
              }
            </div>
          </Layout12>
        </div>
      </Fragment>
    );
  }
};

export default ImageGallery;