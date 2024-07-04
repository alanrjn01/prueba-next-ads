"use client";

import Link from "next/link";

export default function ErrorPage({error}: {error: Error}) {
  return (
    <div>
      Ha ocurrido un error!
      {error.stack}
      <br />
      <Link href="/">¿Desea volver a la página principal?🏠</Link>
    </div>
  );
}
