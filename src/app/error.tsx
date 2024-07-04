'use client'

import Link from "next/link";

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);

  return (
    <div>
      Ha ocurrido un error!
      <br />
      <Link href={"/"}>
        ¿Desea volver a la página principal?🏠
      </Link>
    </div>
  );
}