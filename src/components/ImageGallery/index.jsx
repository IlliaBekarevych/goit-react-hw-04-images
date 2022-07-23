import ImageGalleryItem from './ImageGalleryItem';
import s from './index.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ params, toggleModal }) {
  return (
    <ul className={s.ImageGallery}>
      {params.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          toggleModal={toggleModal}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  params: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ),
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGallery;
