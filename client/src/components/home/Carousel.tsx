import * as React from "react";
import { Carousel as CCarousel } from "flowbite-react";

const Carousel = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <CCarousel>
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/22/c1/68/photo4jpg.jpg?w=1200&h=500&s=1"
          alt="..."
        />
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/03/8d/6f/caption.jpg?w=1200&h=500&s=1"
          alt="..."
        />
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/e9/8c/e9/caption.jpg?w=1200&h=500&s=1"
          alt="..."
        />
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c2/80/b6/caption.jpg?w=1200&h=500&s=1"
          alt="..."
        />
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c2/80/b5/caption.jpg?w=1200&h=500&s=1"
          alt="..."
        />
      </CCarousel>
    </div>
  );
};

export default Carousel;
