import React from 'react';
import Reviews from './Reviews';
import NewReview from './NewReview';
import Products from './Products';

import '../style.css';

const App = () => {
  const [prodId, setProdId] = React.useState('0');
  const [newReview, addNewReview] = React.useState(false);
  return (
    <>
      <Products change={setProdId} />
      <NewReview change={addNewReview} prodId={prodId} />
      <Reviews new={newReview} key={prodId} prodId={prodId} />
    </>
  );
};

export default App;
