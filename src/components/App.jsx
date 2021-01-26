import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Reviews from './Reviews';
import NewReview from './NewReview';
import Controller from '../../controllers';

import '../style.css';

const App = () => {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    (async () => {
      const prods = await Controller.getAll();
      setProducts(prods);
    })();
  }, []);

  const [newReview, addNewReview] = React.useState(false);
  return (
    <HashRouter>
      <Switch>
        {products.map((prod) => (
          <Route path={`/${prod.prodId}`}>
            <NewReview change={addNewReview} prodId={prod.prodId} />
            <Reviews new={newReview} key={prod.prodId} prodId={prod.prodId} />
          </Route>
        ))}
      </Switch>
    </HashRouter>
  );
};

export default App;
