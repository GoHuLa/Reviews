import React from 'react';
import PropTypes from 'prop-types';

const Controller = require('../../controllers');

const Products = ({ change }) => {
  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const res = await Controller.getAll();
      setProducts(res);
    })();
  }, []);

  const getProdIds = () => (
    products.reduce((m, i) => {
      m.add(i.prodId);
      return m;
    }, new Set())
  );

  return (
    <>
      {[...getProdIds()].map((id) => (
        <button type="button" onClick={() => change(id)}>{id}</button>
      ))}
    </>
  );
};

Products.propTypes = {
  change: PropTypes.func.isRequired,
};

export default Products;
