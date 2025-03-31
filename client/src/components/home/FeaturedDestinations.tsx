import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Đà Nẵng, Việt Nam",
      description: "Thành phố năng động với bãi biển đẹp",
      image: "/123.jpg", // Thêm ảnh vào thư mục public
      properties: 428,
    },
    {
      id: 2,
      name: "Đà Lạt, Việt Nam",
      description: "Thành phố ngàn hoa với khí hậu mát mẻ",
      image: "/321.jpg",
      properties: 325,
    },
    {
      id: 3,
      name: "Hạ Long, Việt Nam",
      description: "Kỳ quan thiên nhiên thế giới",
      image: "/111.jpg",
      properties: 210,
    },
  ];

  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-6">Điểm đến nổi bật</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <motion.div
            key={destination.id}
            whileHover={{ y: -10 }}
            className="relative rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative h-64 w-full">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-20 transition" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <p className="text-sm">{destination.description}</p>
                <p className="mt-1 text-sm">{destination.properties} chỗ ở</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
