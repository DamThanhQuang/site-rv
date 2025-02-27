"use client";

import * as React from "react";
import { CiStar } from "react-icons/ci";
import { GoHeart } from "react-icons/go";
import Carousel from "./Carousel";
import Link from "next/link";

const ListProduct = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cards = [
    {
      id: 1,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 1",
      description: "Info which directs to the other page.",
      price: 29.99,
    },
    {
      id: 2,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 2",
      description: "Info which directs to the other page.",
      price: 39.99,
    },
    {
      id: 3,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 3",
      description: "Info which directs to the other page.",
      price: 49.99,
    },
    {
      id: 4,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 4",
      description: "Info which directs to the other page.",
      price: 59.99,
    },
    {
      id: 5,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 5",
      description: "Info which directs to the other page.",
      price: 69.99,
    },
    {
      id: 6,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 6",
      description: "Info which directs to the other page.",
      price: 69.99,
    },
    {
      id: 7,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 7",
      description: "Info which directs to the other page.",
      price: 69.99,
    },
    {
      id: 8,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c9/6c/08/caption.jpg?w=400&h=-1&s=1",
      title: "Card 8",
      description: "Info which directs to the other page.",
      price: 69.99,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };
  if (currentIndex > cards.length - 4) {
    console.log(currentIndex);
    setCurrentIndex(0);
    console.log("hi");
  }
  return (
    <div className="ml-10 mt-10 flex justify-center">
      <div className="w-8/12 ">
        <Carousel />
        <div className="relative mt-10">
          <div className="flex items-center justify-center space-x-4 transition-transform duration-300">
            {cards.slice(currentIndex, currentIndex + 4).map((card, index) => (
              <Link
                href={`/products/${card.id}`}
                key={card.id}
                className="w-full"
              >
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 hover:scale-105">
                  <img
                    className="p-4 rounded-t-lg"
                    src={card.image}
                    alt="product image"
                  />
                  <div className="px-3 pb-3">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                      {card.title}
                    </h5>
                    <div className="flex items-center mt-2 mb-4">
                      <button className="flex items-center space-x-1 rtl:space-x-reverse">
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                        <CiStar />
                      </button>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                        5.0
                      </span>
                      <button>
                        <GoHeart />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${card.price}
                      </span>
                      <a
                        href="#"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 relative  bottom-44 ">
            <button
              className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 transition duration-200"
              onClick={handlePrev}
            >
              &lt;
            </button>
            <button
              className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 transition duration-200"
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
