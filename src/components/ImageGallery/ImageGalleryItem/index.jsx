import s from './index.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({  webformatURL, largeImageURL, tags, toggleModal  }) {
  
  return (
    <li className={s.ImageGalleryItem}  onClick={() => {
      toggleModal(largeImageURL);
    }}>
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItem_image} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
