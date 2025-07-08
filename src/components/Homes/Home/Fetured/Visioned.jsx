import React from "react";

const Visioned = () => {
  const features = [
    {
      title: "Digital Library",
      description:
        "GSTU delivers distinctive education by supporting all faculty using educational technology in online. We have an e-library containing thousands of necessary books.",
      image: "https://img.icons8.com/color/96/000000/books.png",
    },
    {
      title: "Our Mission",
      description:
        "To establish a digital university in Bangladesh that will produce high quality graduates to propel our country towards a digitally enriched nation in the world.",
      image: "https://img.icons8.com/color/96/000000/goal.png",
    },
    {
      title: "Cultural Clubs",
      description:
        'GSTU has lots of active cultural clubs full of fun, excitement and learning. It has "সাদাকালো" the Music Club, GSTU Photographic Society and more.',
      image: "https://img.icons8.com/color/96/000000/theatre-mask.png",
    },
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
        >
          <figure className="p-6">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-20 h-20"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-xl font-bold">{feature.title}</h2>
            <p className="text-sm">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Visioned;
