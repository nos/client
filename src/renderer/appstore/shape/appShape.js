import { shape, string, number } from 'prop-types';

export default shape({
  id: number,
  category: string,
  title: string,
  blurb: string,
  url: string,
  img_url: string
});
