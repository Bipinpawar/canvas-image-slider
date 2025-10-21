import React from 'react';
import ImageSlider from './components/ImageSlider';

function App() {
  const images = [
    '/images/img1.png',
    '/images/img2.png',
    '/images/img3.png',
    '/images/img4.png'
  ];

  return (
    <div>
      <ImageSlider images={images} />
    </div>
  );
}

export default App;
