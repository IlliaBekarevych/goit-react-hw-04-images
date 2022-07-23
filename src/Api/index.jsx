import PropTypes from 'prop-types';

const axios = require('axios').default;
const KEY = '27749026-40df02137ce148c7a01fdd112';
const API_URL = 'https://pixabay.com/api/';

async function fetchImages(name, page, per_page) {
  const response = await axios.get(
    `${API_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&page=${page}&per_page=${per_page}`
  );

  return response.data;
}

fetchImages.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  per_page: PropTypes.number.isRequired,
};
export default fetchImages;
