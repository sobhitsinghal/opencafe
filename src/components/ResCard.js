import { IMG_CDN_URL } from "../util/constants";
import { Link } from "react-router-dom";

const ResCard = (props) => {
  // console.log(prop);
  const { resdata } = props;
  // console.log(resdata);

  const {
    cuisines,
    name,
    costForTwo,
    cloudinaryImageId,
    avgRating,
    avgRatingString,
    sla,
  } = resdata?.info;

  return (
    <div className="flex flex-col overflow-hidden m-3 p-3 w-60  rounded-lg hover:shadow-xl duration-300 font-poppins bg-white shadow-sm">
      <Link to={"/rest/" + resdata.info.id}>
        <div className="card-actual">
          <img
            loading="lazy"
            className="w-full h-52 border rounded-sm"
            src={IMG_CDN_URL + cloudinaryImageId}
            alt="image of a dish from the restaurant"
          ></img>
          <span className="block font-bold text-md mt-3 ">
            {name?.length > 20 ? name.slice(0, 20) + "..." : name}
          </span>
          <span className="mt-3 text-gray-600 text-xs">
            {cuisines?.join(", ")}
          </span>
          <h3>{costForTwo}</h3>
          <div className="mt-3 mb-3 flex items-center justify-between">
            <span
              className="w-12 text-center border rounded-md text-white text-xs mr-2"
              style={
                avgRating >= 4
                  ? { backgroundColor: "#1db458" }
                  : avgRating >= 3
                  ? { backgroundColor: "#DB7C38" }
                  : avgRating === "--"
                  ? { backgroundColor: "#1db458" }
                  : { backgroundColor: "#E31837" }
              }
            >
              {avgRating} &#9733;
            </span>
            <span className="text-xs">{costForTwo}</span>
            {/* <span className="text-xs ">{deliveryTime} MINS</span> */}
          </div>
        </div>
      </Link>
    </div>
  );

  // return (
  //   <div className="flex flex-col overflow-hidden m-3 p-3 w-60  rounded-sm hover:shadow-xl duration-300 font-poppins bg-white shadow-sm ">
  //     {console.log(name, cuisines, cloudinaryImageId, costForTwo, avgRating)}
  //     <img
  //       loading="lazy"
  //       className="w-full border rounded-sm"
  //       src={IMG_CDN_URL + cloudinaryImageId}
  //       alt="image of a dish from the restaurant"
  //     ></img>
  //     <span className="block font-bold text-md mt-3 ">
  //       {name?.length > 20 ? name.slice(0, 20) + "..." : name}
  //     </span>
  //   </div>
  // );
};

export default ResCard;
