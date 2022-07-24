import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import s from './index.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import fetchImages from 'Api';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setShowLoadMore(false);
    setLoading(true);
    const per_page = 12;
    fetchImages(searchValue, page, per_page)
      .then(data => {
        const filterDataHits = data.hits.map(img => {
          return Object.fromEntries(
            Object.entries(img).filter(([key]) =>
              ['id', 'tags', 'largeImageURL', 'webformatURL'].includes(key)
            )
          );
        });

        setImages(images => [...images, ...filterDataHits]);
        setLoading(false);

        if (data.total !== data.hits.length) {
          setShowLoadMore(true);
        }
        if (page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }

        if (data.total <= images.length + per_page) {
          setShowLoadMore(false);
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      })
      .catch(onApiError)
      .finally(() => setLoading(false));
  }, [searchValue, page]);

  const onApiError = () => {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    setShowLoadMore(false);
    setLoading(false);
  };

  const onSubmit = name => {
    if (!name) return;
    setSearchValue(name);
    setPage(1);
    setImages([]);
  };

  const onloadeMore = () => {
    setPage(page => page + 1);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };
  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmit} />
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
      <ImageGallery params={images} toggleModal={toggleModal} />
      {loading && <Loader />}
      {showLoadMore && <Button onloadeMore={onloadeMore} title="Load more" />}
    </div>
  );
}

export default App;
