export interface Car {
  id: number;
  name: string;
  year: string;
  rating: number;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export const cars: Car[] = [
  {
    id: 1,
    name: "Toyota Corolla",
    year: "2013",
    rating: 4.9,
    description:
      "Luxury sedan with premium features and excellent fuel economy. Perfect for city commuting and long trips.",
    price: "¢299/day",
    image: "/image/corolla2013.png",
    features: [
      "Premium Sound",
      "Heated Seats",
      "Panoramic Roof",
      "Navigation",
      "Bluetooth",
    ],
  },
  {
    id: 2,
    name: "Honda Civic",
    year: "2017",
    rating: 4.8,
    description:
      "Sporty SUV with excellent handling and advanced safety features. Great for families.",
    price: "¢249/day",
    image: "/image/hondacivic.png",
    features: [
      "Sport Mode",
      "Premium Interior",
      "Advanced Safety",
      "LED Lights",
      "Parking Sensors",
    ],
  },
  {
    id: 3,
    name: "Honda CRV",
    year: "2015",
    rating: 4.7,
    description:
      "Premium SUV for any terrain with spacious interior and luxury amenities.",
    price: "¢349/day",
    image: "/image/hondacrv.png",
    features: [
      "All-Terrain",
      "Luxury Package",
      "Climate Control",
      "Sunroof",
      "Third Row Seats",
    ],
  },
  {
    id: 4,
    name: "Toyota RAV4",
    year: "2017",
    rating: 4.6,
    description:
      "Reliable and fuel-efficient SUV perfect for adventure trips and daily commuting.",
    price: "¢289/day",
    image: "/image/rav4.png",
    features: [
      "Fuel Efficient",
      "Spacious",
      "Safety Plus",
      "Apple CarPlay",
      "Backup Camera",
    ],
  },
  {
    id: 5,
    name: "Mercedes S-Class",
    year: "2022",
    rating: 4.9,
    description:
      "Ultimate luxury sedan with cutting-edge technology and premium comfort.",
    price: "¢599/day",
    image: "/image/mercedes.jpg",
    features: [
      "Massage Seats",
      "Burmester Audio",
      "Night Vision",
      "Air Suspension",
      "Panoramic Roof",
    ],
  },
  {
    id: 6,
    name: "BMW X5",
    year: "2021",
    rating: 4.8,
    description:
      "Sporty luxury SUV with powerful performance and premium features.",
    price: "¢499/day",
    image: "/image/bmw.jpg",
    features: [
      "M Sport Package",
      "Heads-up Display",
      "Harmon Kardon",
      "xDrive",
      "Sport Seats",
    ],
  },
];
