import React from "react";

interface HotelCard {
  id: string;
  name: string;
  image: string;
}

const POPULAR_HOTELS: HotelCard[] = [
  {
    id: "marriott",
    name: "Marriott Resort",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hyatt",
    name: "Hyatt Regency",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "hilton",
    name: "Hilton Suites",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "sheraton",
    name: "Sheraton Ocean Front",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "radisson",
    name: "Radisson Blu",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "conrad",
    name: "Conrad Luxury",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=600&q=80",
  },
];

const PopularHotels: React.FC = () => {
  return (
    <section className="w-full py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header Accent */}
        <div className="flex items-center justify-center space-x-3 w-full max-w-xs mb-6">
          <div className="h-[1px] bg-[#b58a4b]/60 flex-1" />
          <span className="text-[#b58a4b] tracking-[0.25em] text-xs sm:text-sm font-medium uppercase">
            Popular Hotels
          </span>
          <div className="h-[1px] bg-[#b58a4b]/60 flex-1" />
        </div>

        {/* 6 Hotels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
          {POPULAR_HOTELS.map((hotel) => (
            <div
              key={hotel.id}
              className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-36 sm:h-44"
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                <span className="text-white font-serif font-medium text-xs sm:text-sm tracking-wide">
                  {hotel.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularHotels;
