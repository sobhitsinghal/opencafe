import { useRouteError } from "react-router-dom";
import { ERROR_IMAGE } from "../util/constants";
import error from "../../assets/error.png";

const Error = () => {
  const err = useRouteError();
  console.log(err);
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-[#272622] overflow-y-hidden">
      <img className="w-72 h-72" src={error} alt="error image" />
      <span className="text-lg font-fira-code  font-bold">{err.status}</span>
      <span className="mt-2 text-lg font-medium font-fira-code">
        {err.statusText}
      </span>
      <p className="mt-2 text-lg font-medium font-fira-code">{err.data}</p>
    </div>
  );
};

export default Error;
