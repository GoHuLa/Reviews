import React from 'react';
import Reviews from './Reviews';
import NewReview from './NewReview';
import Products from './Products';

import '../style.css';

const App = () => {
  const [prodId, setProdId] = React.useState('0');
  return (
    <>
      <Products change={setProdId} />
      <NewReview />
      <Reviews key={prodId} prodId={prodId} />
    </>
  );
};

export default App;
