import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '38926038-9764a0475e6c51ddc0f5eb34a';

export const fetchImageGallery = async (searchName, page_number) => {
  console.log(page_number);
  const paramsRequest = {
    key: API_KEY,
    q: searchName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page_number,
    per_page: 12,
  };
  const { data } = await axios.get(URL, { params: paramsRequest });
  return data;
};
export const normalizedImages = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });
