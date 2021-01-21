import React from 'react';
import PropTypes from 'prop-types';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import style from './products.module.css';

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
    <ButtonToolbar>
      <DropdownButton className={style.dropdown} title="Products" variant="info" as={ButtonGroup} size="sm">
        {[...getProdIds()].sort((a, b) => a - b).map((id) => (
          <Dropdown.Item as="button" key={id} onClick={() => change(id)}>{id}</Dropdown.Item>
        ))}
      </DropdownButton>
    </ButtonToolbar>
  );
};

Products.propTypes = {
  change: PropTypes.func.isRequired,
};

export default Products;
