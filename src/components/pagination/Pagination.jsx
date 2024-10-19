import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Pagination.css'; 
import PropTypes from 'prop-types';

const Pagination = ({ previousPage, nextPage }) => {
  return (
    <div className="pagination">
      <button className="pagination__button" onClick={previousPage}>
        <FaArrowLeft className="icon icon-left" /> Previous Page
      </button>
      <button className="pagination__button" onClick={nextPage}>
        Next Page <FaArrowRight className="icon icon-right" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  previousPage: PropTypes.func.isRequired, 
  nextPage: PropTypes.func.isRequired, 
};

export default Pagination;
