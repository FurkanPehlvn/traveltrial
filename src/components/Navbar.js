import React, { useState, useEffect } from "react";
import { Range } from "react-range";

const categories = {
  tours: {
    name: "Tours",
    filters: [
      {
        name: "Location",
        type: "search",
        placeholder: "Where you wanna visit? ",
      },
      {
        name: "Theme",
        type: "tags",
        options: [
          { name: "Island Tour", count: 43 },
          { name: "Land Tour", count: 43 },
          { name: "Safari", count: 43 },
        ],
      },
      {
        name: "Activity",
        type: "tags",
        options: [
          { name: "Swimming", count: 43 },
          { name: "Running", count: 43 },
          { name: "Elephant Care", count: 43 },
          { name: "Snorkelling", count: 43 },
        ],
      },
      {
        name: "Price",
        type: "slider",
        min: 0,
        max: 25000,
        step: 100,
      },
      {
        name: "Start time",
        type: "timeSlider",
        min: 0,
        max: 24,
        step: 0.5,
      },
      {
        name: "Group size",
        type: "slider",
        min: 0,
        max: 100,
        step: 1,
      },
      {
        name: "Vehicle",
        type: "tags",
        options: [
          { name: "Yacht", count: 43 },
          { name: "Speedboat", count: 43 },
          { name: "Safari", count: 43 },
          { name: "Catamaran", count: 43 },
          { name: "Speedcatamaran", count: 43 },
        ],
      },
      {
        name: "Features",
        type: "tags",
        options: [
          { name: "Transfer", count: 43 },
          { name: "Halal Food", count: 43 },
          { name: "Vegetarian Food", count: 43 },
        ],
      },
    ],
  },
  tickets: {
    name: "Tickets",
    filters: [
      {
        name: "Location",
        type: "search",
        placeholder: "Where you want to go? (Theme park, Zoo...)",
      },
      {
        name: "Type",
        type: "tags",
        options: [
          { name: "Theme Park", count: 12 },
          { name: "Water Park", count: 8 },
          { name: "Zoo", count: 5 },
        ],
      },
      {
        name: "Price",
        type: "slider",
        min: 0,
        max: 10000,
        step: 100,
      },
    ],
  },
  rent: {
    name: "Rent",
    filters: [
      {
        name: "Location",
        type: "search",
        placeholder: "Where you want to rent? (Patong, Kata...)",
      },
      {
        name: "Vehicle Type",
        type: "tags",
        options: [
          { name: "Car", count: 25 },
          { name: "Motorbike", count: 40 },
          { name: "Bicycle", count: 15 },
        ],
      },
      {
        name: "Price",
        type: "slider",
        min: 0,
        max: 5000,
        step: 50,
      },
    ],
  },
  transfer: {
    name: "Transfer",
    filters: [
      {
        name: "From",
        type: "search",
        placeholder: "Pickup location",
      },
      {
        name: "To",
        type: "search",
        placeholder: "Drop-off location",
      },
      {
        name: "Vehicle Type",
        type: "tags",
        options: [
          { name: "Private Car", count: 30 },
          { name: "Van", count: 20 },
          { name: "Minibus", count: 10 },
        ],
      },
      {
        name: "Price",
        type: "slider",
        min: 0,
        max: 8000,
        step: 100,
      },
    ],
  },
};

function NavBar({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState([10000]);
  const [timeRange, setTimeRange] = useState([17]);
  const [groupSize, setGroupSize] = useState([40]);
  const [selectedTags, setSelectedTags] = useState({});

  const handleTagSelect = (filterName, tagName) => {
    setSelectedTags((prev) => ({
      ...prev,
      [filterName]: prev[filterName]?.includes(tagName)
        ? prev[filterName].filter((tag) => tag !== tagName)
        : [...(prev[filterName] || []), tagName],
    }));
  };

  useEffect(() => {
    onFilterChange({
      category: selectedCategory,
      searchText,
      priceRange,
      timeRange,
      groupSize,
      selectedTags,
    });
  }, [
    selectedCategory,
    searchText,
    priceRange,
    timeRange,
    groupSize,
    selectedTags,
  ]);

  const handleReset = () => {
    setSelectedCategory(null);
    setSearchText("");
    setPriceRange([10000]);
    setTimeRange([17]);
    setGroupSize([40]);
    setSelectedTags({});
    onFilterChange({
      category: null,
      searchText: "",
      priceRange: [10000],
      timeRange: [17],
      groupSize: [40],
      selectedTags: {},
    });
  };

  const handleSearch = () => {
    onFilterChange({
      category: selectedCategory,
      searchText,
      priceRange,
      timeRange,
      groupSize,
    });
    setIsOpen(false);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (categoryKey) => {
    setSelectedCategory(categoryKey);

    setPriceRange([
      categories[categoryKey].filters.find((f) => f.name === "Price")?.max /
        2 || 0,
    ]);
    if (categoryKey === "tours") {
      setTimeRange([17]);

      setGroupSize([40]);
    }
  };

  const renderFilter = (filter) => {
    switch (filter.type) {
      case "search":
        return (
          <div className="mb-4">
            <input
              type="text"
              placeholder={filter.placeholder}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
            />
          </div>
        );
      case "tags":
        return (
          <div className="flex flex-wrap gap-2">
            {filter.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleTagSelect(filter.name, option.name)}
                className={`px-3 py-1 rounded-full transition-colors ${
                  selectedTags[filter.name]?.includes(option.name)
                    ? "bg-orange-500 text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {option.name} ({option.count})
              </button>
            ))}
          </div>
        );
      case "timeSlider":
        return (
          <div className="py-4">
            <Range
              values={timeRange}
              step={filter.step}
              min={filter.min}
              max={filter.max}
              onChange={(values) => setTimeRange(values)}
              renderTrack={({ props, children }) => (
                <div {...props} className="h-2 w-full bg-gray-200 rounded-full">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-orange-500 rounded-full focus:outline-none"
                />
              )}
            />
            <div className="text-right mt-1">
              {`${Math.floor(timeRange[0])}:${timeRange[0] % 1 ? "30" : "00"}`}
            </div>
          </div>
        );
      case "slider":
        return (
          <div className="py-4">
            <Range
              values={filter.name === "Price" ? priceRange : groupSize}
              step={filter.step}
              min={filter.min}
              max={filter.max}
              onChange={(values) => {
                if (filter.name === "Price") {
                  setPriceRange(values);
                } else if (filter.name === "Group size") {
                  setGroupSize(values);
                }
              }}
              renderTrack={({ props, children }) => (
                <div {...props} className="h-2 w-full bg-gray-200 rounded-full">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="h-4 w-4 bg-orange-500 rounded-full focus:outline-none"
                />
              )}
            />
            <div className="text-right mt-1">
              {filter.name === "Price" ? priceRange[0] : groupSize[0]}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="border-gray-200 bg-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          <button
            onClick={handleClick}
            type="button"
            className="collapse-toggle inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <span>Traveller Market</span>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity duration-300`}
          onClick={handleClick}
        >
          <div
            className={`${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } fixed left-0 top-0 z-50 w-96 h-full bg-white shadow-xl transition-transform duration-300 overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <button onClick={handleClick} className="text-gray-500">
                <svg
                  className="w-6 h-6 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col h-[calc(100%-64px)] overflow-y-auto">
              <div className="flex flex-col p-4 space-y-2">
                {Object.keys(categories).map((categoryKey) => (
                  <button
                    key={categoryKey}
                    onClick={() => handleCategorySelect(categoryKey)}
                    className={`p-4 text-left rounded-lg transition-colors ${
                      selectedCategory === categoryKey
                        ? "bg-orange-500 text-white"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {categories[categoryKey].name.toUpperCase()}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <div className="p-4">
                  {categories[selectedCategory].filters.map((filter, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="font-medium mb-2">{filter.name}</h3>
                      {renderFilter(filter)}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 mt-auto border-t">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                  >
                    RESET
                  </button>
                  <button
                    onClick={handleSearch}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    SEARCH
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          Logo
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
