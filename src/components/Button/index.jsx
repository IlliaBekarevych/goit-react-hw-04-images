import s from './index.module.css';
import PropTypes from 'prop-types';
export default function Button({ onloadeMore, title }) {
  return (
    <button type="button" onClick={onloadeMore} className={s.Button}>
      {title}
    </button>
  );
}

Button.propTypes = {
  onloadeMore: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
