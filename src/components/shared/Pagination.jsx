import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, maxPage, limitInPage, children }) => (
    
);

Pagination.propTypes = {
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
  limitInPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentPage: 0,
  maxPage: 0,
  limitInPage: 0,
};

export default Pagination;
