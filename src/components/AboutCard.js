import { SiGithub, SiTwitter, SiGoogle } from "react-icons/si";

const AboutCard = (props) => {
  const { name, avatar, knows } = props.aboutshow;
  return (
    <div className="min-w-[50%] flex flex-row justify-center border">
      <div className="flex justify-center items-center font-poppins bg-slate-50 m-4 hover:shadow-2xl rounded-lg flex-grow">
        <div className="flex flex-col justify-center items-center mt-4 gap-5 shadow-lg w-fit max-w-xs flex-auto">
          <h1 className="font-medium text-xl w-full text-center py-2 text-red-600 italic">
            {name}
          </h1>
          <img
            className="rounded-full w-[150px] h-[150px] border-none align-middle"
            src={avatar}
            alt="user photo"
          />
          <div className="bg-blue-500-500 flex flex-grow text-red p-4 rounded-sm">
            <p className="pb-4 text-lg font-normal text-red-400-300 text-center">
              {knows}
            </p>
            {/* <div className=" text-[2em] text-center w-full flex items-center justify-center mt-2">
              <a
                href={gitlink}
                className="mb-2 pr-4 hover:scale-105"
                target="_blank"
              >
                <i className="bg-[#333] icon--i">
                  <SiGithub className="m-auto" />
                </i>
              </a>
              <a href={gitlink} className="mb-2 hover:scale-105">
                <i className="bg-[#ea4335] icon--i">
                  <SiTwitter className="m-auto" />
                </i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
