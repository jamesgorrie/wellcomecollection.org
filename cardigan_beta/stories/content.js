import faker from 'faker';

function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export const id = randomNumber(1000, 2000);

export const url = faker.internet.url();

export const image = () => {
  // const contentUrl = faker.image.imageUrl(800, 450, 'city'); // lorempixel taking too long to load
  const contentUrl = 'https://wellcomecollection.cdn.prismic.io/wellcomecollection/5b28b809814fc6d1d716b0082725b24e0a0ad6a9_ep_000012_089.jpg';
  return {
    contentUrl: contentUrl,
    width: 640,
    height: 480,
    alt: 'an image with some alt text',
    tasl: {
      contentUrl: contentUrl,
      title: 'The title of the image',
      author: 'The author',
      sourceName: 'Wellcome Collection',
      sourceLink: 'https://wellcomecollection.org/works',
      license: 'CC-BY-NC'
    }
  };
};

export const imageTall = () => {
  // const contentUrl = faker.image.imageUrl(450, 1600, 'city'); // lorempixel taking too long to load
  const contentUrl = 'https://iiif.wellcomecollection.org/image/L0030820.jpg/full/full/0/default.jpg';

  return {
    contentUrl: contentUrl,
    width: 800,
    height: 1560,
    alt: 'an image with some alt text',
    tasl: {
      contentUrl: contentUrl,
      title: 'The title of the image',
      author: 'The author',
      sourceName: 'Wellcome Collection',
      sourceLink: 'https://wellcomecollection.org/works',
      license: 'CC-BY-NC'
    }
  };
};

export const captionedImage = () => ({
  image: image(),
  caption: [{
    type: 'paragraph',
    text: faker.random.words(randomNumber(5, 15)),
    spans: []
  }]
});

export const text = () => Array(randomNumber(1, 2)).fill().map(() => ({
  'type': 'paragraph',
  'text': `${faker.random.words(randomNumber(25, 40))}`,
  'spans': []
}));

export const videoEmbed = { embedUrl: 'https://www.youtube.com/embed/VYOjWnS4cMY' };

export const imageGallery = () => {
  const items = Array(randomNumber(3, 5)).fill().map(captionedImage);
  return {
    id: '123',
    title: faker.random.words(randomNumber(3, 8)),
    items: items
  };
};

export const quote = () => ({
  text: [{
    type: 'paragraph',
    text: 'Said Hamlet to Ophelia,\nI\'ll draw a sketch of thee,\nWhat kind of pencil shall I use?\n2B or not 2B?',
    spans: []
  }],
  citation: [{
    type: 'paragraph',
    text: 'Spike Milligan - A Silly Poem',
    spans: [{
      type: 'hyperlink',
      start: 0,
      end: 29,
      data: {
        url: 'https://www.poemhunter.com/poem/a-silly-poem/'
      }
    }]
  }]
});
