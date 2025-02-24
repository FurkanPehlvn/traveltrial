"use client";

import Card from "@/components/Card";
import NavBar from "@/components/Navbar";
import React, { useState, useEffect } from "react";

const cardData = [
  {
    id: 1,
    image: "tayland-maya-bay-ko-phi-phi-rehberi.jpg",
    discount: "30% OFF",
    tag: "Tour",
    rating: 4.9,
    reviews: 128,
    title: "Discover Nature's Beauty",
    description:
      "Immerse yourself in the tranquil landscapes and breathtaking vistas of the natural world.",
    price: 299,
    oldPrice: 427,
    category: "tours",
    startTime: 9,
    groupSize: 15,
  },
  {
    id: 2,
    image: "tayland-maya-bay-ko-phi-phi-rehberi.jpg",
    discount: "20% OFF",
    tag: "Adventure",
    rating: 4.7,
    reviews: 95,
    title: "Explore the Mountains",
    description:
      "Experience the thrill of mountain adventures and stunning views.",
    price: 399,
    oldPrice: 499,
    category: "tours",
    startTime: 8,
    groupSize: 20,
  },
  {
    id: 3,
    image: "tayland-maya-bay-ko-phi-phi-rehberi.jpg",
    discount: "15% OFF",
    tag: "Relaxation",
    rating: 4.8,
    reviews: 112,
    title: "Relax by the Beach",
    description: "Unwind on pristine beaches with crystal-clear waters.",
    price: 499,
    oldPrice: 587,
  },
];

export default function Home() {
  const [filteredCards, setFilteredCards] = useState(cardData);
  const [filterCriteria, setFilterCriteria] = useState({
    category: null,
    searchText: "",
    priceRange: [10000],
    timeRange: [17],
    groupSize: [40],
    selectedTags: {},
  });

  const applyFilters = (criteria) => {
    let filtered = cardData;

    if (criteria.category) {
      filtered = filtered.filter((card) => card.category === criteria.category);
    }

    if (criteria.searchText) {
      const searchLower = criteria.searchText.toLowerCase();
      filtered = filtered.filter(
        (card) =>
          card.title.toLowerCase().includes(searchLower) ||
          card.description.toLowerCase().includes(searchLower)
      );
    }

    Object.entries(criteria.selectedTags).forEach(
      ([filterName, selectedTags]) => {
        if (selectedTags && selectedTags.length > 0) {
          filtered = filtered.filter((card) => {
            const cardTags = card[filterName.toLowerCase()];
            return selectedTags.some((tag) => cardTags?.includes(tag));
          });
        }
      }
    );

    if (criteria.priceRange) {
      filtered = filtered.filter(
        (card) => card.price <= criteria.priceRange[0]
      );
    }

    if (criteria.category === "tours" && criteria.timeRange) {
      filtered = filtered.filter(
        (card) => card.startTime <= criteria.timeRange[0]
      );
    }

    if (criteria.category === "tours" && criteria.groupSize) {
      filtered = filtered.filter(
        (card) => card.groupSize <= criteria.groupSize[0]
      );
    }

    setFilteredCards(filtered);
  };

  return (
    <>
      <div>
        <NavBar
          onFilterChange={(newCriteria) => {
            setFilterCriteria(newCriteria);
            applyFilters(newCriteria);
          }}
        />
      </div>
      <div className="flex flex-wrap justify-center items-center min-h-screen bg-white p-4">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            discount={card.discount}
            tag={card.tag}
            rating={card.rating}
            reviews={card.reviews}
            title={card.title}
            description={card.description}
            price={card.price}
            oldPrice={card.oldPrice}
          />
        ))}
      </div>
    </>
  );
}
