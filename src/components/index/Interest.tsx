import heroBanner from "@/assets/home-page/heroBanner.jpeg";

const Interest = () => {
  return (
    <div
      style={{ backgroundImage: `url(${heroBanner})` }}
      className="h-255 bg-cover bg-center flex items-center justify-center"
    ></div>
  );
};

export default Interest;
