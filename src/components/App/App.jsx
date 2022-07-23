import React, { Component } from 'react';
import Notiflix from 'notiflix';
import s from './index.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import fetchImages from 'Api';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

class App extends Component {
  state = {
    searchValue: ' ',
    page: 1,
    images: [],
    showModal: false,
    largeImageURL: null,
    showLoadMore: false,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchValue, page, images } = this.state;
    const per_page = 12;
    if (prevState.page !== page || prevState.searchValue !== searchValue) {
      this.setState({ showLoadMore: false, loading: true });
      fetchImages(searchValue, page, per_page)
        .then(data => {
          const filterDataHits = data.hits.map(img => {
            return Object.fromEntries(
              Object.entries(img).filter(([key]) =>
                ['id', 'tags', 'largeImageURL', 'webformatURL'].includes(key)
              )
            );
          });
          this.setState(prev => ({
            images: [...prev.images, ...filterDataHits],
            totalHits: data.totalHits,
            loading: false,
          }));
          if (data.total !== data.hits.length) {
            this.setState({ showLoadMore: true });
          }
          if (page === 1) {
            Notiflix.Notify.success(
              `Hooray! We found ${data.totalHits} images.`
            );
          }
          if (data.total <= images.length + per_page) {
            this.setState({ showLoadMore: false });
            Notiflix.Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
          }
        })
        .catch(this.onApiError)
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  onApiError = () => {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    this.setState({ showLoadMore: false, loading: false });
  };

  onSubmit = name => {
    if (name === this.state.name) return;
    this.setState({
      searchValue: name,
      page: 1,
      images: [],
    });
  };

  onloadeMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const { images, showModal, showLoadMore, loading } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={this.state.largeImageURL}
            tags={this.state.tags}
          />
        )}
        <ImageGallery params={images} toggleModal={this.toggleModal} />
        {loading && <Loader />}
        {showLoadMore && (
          <Button onloadeMore={this.onloadeMore} title="Load more" />
        )}
      </div>
    );
  }
}

export default App;
