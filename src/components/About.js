import AboutCard from "./AboutCard";
import avtar1 from "../../assets/avtar1.png";
import avtar2 from "../../assets/avtar2.png";
import avtar3 from "../../assets/avtar3.png";
import avtar4 from "../../assets/avtar4.png";
import avtar5 from "../../assets/avtar5.png";

const About = () => {
  const person1 = {
    name: "Safikul Alam",
    avatar: avtar1,
    knows: "HTML || CSS || JavaScript || git",
  };
  const person2 = {
    name: "Md Faiz Ansari",
    avatar: avtar2,
    knows: "HTML || CSS || JavaScript",
  };
  const person3 = {
    name: "Sobhit Singhal",
    avatar: avtar3,
    knows: "HTML || CSS || JavaScript",
  };
  const person4 = {
    name: "Sagar Kumar",
    avatar: avtar4,
    knows: "HTML || CSS || JavaScript",
  };
  const person5 = {
    name: "Aman Anand Tiwari",
    avatar: avtar5,
    knows: "HTML || CSS || JavaScript || React || tailwindcss || git",
  };

  return (
    <div className="flex flex-wrap m-4 justify-center">
      <AboutCard aboutshow={person1} />
      <AboutCard aboutshow={person2} />
      <AboutCard aboutshow={person3} />
      <AboutCard aboutshow={person4} />
      <AboutCard aboutshow={person5} />
    </div>
  );
};

export default About;
