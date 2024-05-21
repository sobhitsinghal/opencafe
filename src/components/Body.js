import ResCard from "./ResCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { SWIGGY_API } from "../util/constants";
import BodyShimmer from "./BodyShimmerTest";

const Body = () => {
  // State variables
  const [resList, setResList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const req = await fetch(SWIGGY_API);
    const json = await req.json();
    console.log(json);

    const restaurants =
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    setResList(restaurants);
    setFilterList(restaurants);
  };

  // Handle search input change
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = resList.filter((rest) =>
      rest.info.name.toLowerCase().includes(searchValue)
    );

    setFilterList(filtered);
  };

  return (
    <div className="body-container">
      {/* Hero section with search */}
      <div className="w-[79vw] flex flex-col justify-center ml-32">
        <div className="bg-slate-50 flex flex-col items-center justify-center">
          <div className="hero-section relative h-[30rem] flex center items-center w-full">
            <img
              src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
              className="h-full w-full absolute object-cover"
              alt="food background image"
            />
            <div className="absolute z-10 flex justify-center w-full">
              <input
                type="text"
                placeholder="Search for restaurants..."
                value={searchText}
                onChange={handleSearch}
                className="p-2 rounded-md border border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Card section */}
      <div className="card-container flex flex-wrap justify-center bg-gray-100">
        {filterList.length === 0 ? (
          <div className="text-center mt-8">
            <p className="text-xl">No restaurants found</p>
          </div>
        ) : (
          filterList.map((rest) => {
            return <ResCard key={rest.info.id} resdata={rest} />;
          })
        )}
      </div>
    </div>
  );
};

export default Body;
