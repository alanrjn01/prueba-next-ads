interface Restaurant {
  id: string;
  name: string;
  image: string;
  description: string;
  address: string;
  score: number;
  ratings: number;
}

// const restaurants: Restaurant[] = [
//   {
//     id: "1",
//     name: "The Golden Spoon",
//     description:
//       "A fine dining experience with a menu that changes daily based on the freshest ingredients available.",
//     address: "123 Main St. Anytown USA",
//     score: 4.5,
//     ratings: 100,
//     image:
//       "https://media.admagazine.com/photos/651aeed9da5f4d9a3844a94b/4:3/w_2660,h_1995,c_limit/Porten%CC%83o-restaurante-1.jpg",
//   },
//   {
//     id: "2",
//     name: "La Piazza",
//     description: "Authentic Italian cuisine in a cozy atmosphere with outdoor seating available.",
//     address: "456 Oak Ave. Anytown USA",
//     score: 4.2,
//     ratings: 80,
//     image:
//       "https://www.lavanguardia.com/files/og_thumbnail/files/fp/uploads/2021/12/23/61c456cc62a0b.r_d.2520-1680-0.jpeg",
//   },
//   {
//     id: "3",
//     name: "The Sizzling Skillet",
//     description:
//       "A family-friendly restaurant with a wide variety of dishes. including vegetarian and gluten-free options.",
//     address: "789 Elm St. Anytown USA",
//     score: 4.8,
//     ratings: 120,
//     image:
//       "https://blog.winesofargentina.com/wp-content/uploads/2022/11/PORTADA-restos-baires-1024x427.jpg",
//   },
//   {
//     id: "4",
//     name: "The Hungry Bear",
//     description: "A rustic cabin-style restaurant serving hearty portions of comfort food.",
//     address: "101 Forest Rd. Anytown USA",
//     score: 4.0,
//     ratings: 60,
//     image: "https://cdn.forbes.com.mx/2017/09/Restaurantes-mexicanos-P.jpg",
//   },
//   {
//     id: "5",
//     name: "The Spice Route",
//     description: "A fusion restaurant that combines the flavors of India. Thailand. and China.",
//     address: "246 Main St. Anytown USA",
//     score: 4.6,
//     ratings: 90,
//     image:
//       "https://blog.winesofargentina.com/wp-content/uploads/2022/11/PORTADA-restos-baires-1024x427.jpg",
//   },
//   {
//     id: "6",
//     name: "The Catch of the Day",
//     description: "A seafood restaurant with a focus on locally-sourced. sustainable ingredients.",
//     address: "369 Beach Blvd. Anytown USA",
//     score: 4.3,
//     ratings: 70,
//     image:
//       "https://alimentika.cl/wp-content/uploads/2023/09/Consejos-de-administracion-para-restaurantes-pequenos.webp",
//   },
//   {
//     id: "7",
//     name: "The Garden Cafe",
//     description: "A vegetarian restaurant with a beautiful outdoor garden seating area.",
//     address: "753 Maple St. Anytown USA",
//     score: 4.9,
//     ratings: 150,
//     image:
//       "https://hips.hearstapps.com/hmg-prod/images/elle-restaurantes-decoracion-bonita-instagram-raimunda-madrid-1573068471.jpg?crop=0.9333333333333333xw:1xh;center,top&resize=1200:*",
//   },
//   {
//     id: "8",
//     name: "The Burger Joint",
//     description: "A classic American diner with a wide variety of burgers. fries. and milkshakes.",
//     address: "852 Oak Ave. Anytown USA",
//     score: 3.9,
//     ratings: 50,
//     image: "https://cdn.forbes.com.mx/2017/09/Restaurantes-mexicanos-P.jpg",
//   },
//   {
//     id: "9",
//     name: "The Cozy Corner",
//     description:
//       "A small cafe with a warm and inviting atmosphere. serving breakfast and lunch dishes.",
//     address: "963 Main St. Anytown USA",
//     score: 4.7,
//     ratings: 110,
//     image:
//       "https://blog.winesofargentina.com/wp-content/uploads/2022/11/PORTADA-restos-baires-1024x427.jpg",
//   },
//   {
//     id: "10",
//     name: "The Steakhouse",
//     description: "A high-end restaurant specializing in premium cuts of beef and fine wines.",
//     address: "1479 Elm St. Anytown USA",
//     score: 4.1,
//     ratings: 75,
//     image:
//       "https://media.admagazine.com/photos/651aeed9da5f4d9a3844a94b/4:3/w_2660,h_1995,c_limit/Porten%CC%83o-restaurante-1.jpg",
//   },
//   {
//     id: "11",
//     name: "The Taco Truck",
//     description: "A casual Mexican restaurant serving authentic street tacos.",
//     address: "753 Main St. Anytown USA",
//     score: 4.4,
//     ratings: 65,
//     image:
//       "https://hips.hearstapps.com/hmg-prod/images/elle-restaurantes-decoracion-bonita-instagram-raimunda-madrid-1573068471.jpg?crop=0.9333333333333333xw:1xh;center,top&resize=1200:*",
//   },
//   {
//     id: "12",
//     name: "The Ice Cream Parlor",
//     description: "A family-friendly restaurant with a wide variety of ice cream flavors.",
//     address: "852 Oak Ave. Anytown USA",
//     score: 4.9,
//     ratings: 150,
//     image: "https://cdn.forbes.com.mx/2017/09/Restaurantes-mexicanos-P.jpg",
//   },
// ];

//const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  list: async (): Promise<Restaurant[]> => {
    // Obtenemos la información de Google Sheets en formato texto y la dividimos por líneas, nos saltamos la primera línea porque es el encabezado
    const [, ...data] = await fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqM_rtim0lap68swKxGVZCUqCZsHzN0aEwH61XUZKsTclLeLtmYMHuVdPQpYSDyLsuRuxEIFIIKBAX/pub?output=csv",
    )
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    // Convertimos cada línea en un objeto Restaurant, asegúrate de que los campos no posean `,`
    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(",");

      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image,
      };
    });

    // Lo retornamos
    return restaurants;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant> => {
    const [, ...data] = await fetch(`${process.env.NEXT_PUBLIC_API_SHEETS}`)
      .then((res) => res.text())
      .then((text) => text.split("\n"));

    const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(",");

      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image,
      };
    });

    const restaurant = restaurants.find((restaurant) => restaurant.id === id);

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },
  search: async (): Promise<Restaurant[]> => {
    // Obtenemos los restaurantes
    const results = await api.list().then();

    // Los retornamos
    return results;
  },
};

export default api;
