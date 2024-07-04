import api from "@/api";
import Link from "next/link";

let restaurant = null

export async function generateMetadata({ params: { restaurante } }: { params: { restaurante: string } }) {
  restaurant = await api.fetch(restaurante);

  return {
    title: `${restaurant.name} - Restaurancy`,
    description: restaurant.description,
  };
}

export default async function RestaurantPage({ params: { restaurante } }: { params: { restaurante: string } }) {
  restaurant = await api.fetch(restaurante);

  return (
    <article key={restaurant.id}>
      <img
        alt={restaurant.name}
        className="mb-3 h-[300px] w-full object-cover"
        src={restaurant.image}
      />
      <h2 className="inline-flex gap-2 text-lg font-bold">
        <span>{restaurant.name}</span>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
      <br />
      <Link href={"/"}>Volver a la página de inicio 🔙</Link>
    </article>
  );
}