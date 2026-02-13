import React from "react";

export default function Header() {
  return (
    <section className="w-full p-4 md:p-3 bg-background/75 backdrop-blur-3xl text-black sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/">
          <img
            src="/logo-alt.png"
            className="h-8"
            alt="La Capilla del Café Logo"
          />
        </a>
        <nav className="flex gap-3 lg:gap-4 items-center">
          <a href="/#nosotros" className="max-md:hidden hover:underline underline-offset-4">Nosotros</a>
          <a href="/#especialidades" className="max-md:hidden hover:underline underline-offset-4">Especialidades</a>
          <a href="/#sedes" className="max-md:hidden hover:underline underline-offset-4">Sedes</a>
          <a href="/#experiencias" className="max-md:hidden hover:underline underline-offset-4">Experiencias</a>
          {/* <a href="/#delivery" className="max-md:hidden hover:underline underline-offset-4">Delivery</a> */}
          <a
            href="/carta"
            className="bg-primary text-white rounded-xl px-4 py-1.5 font-medium max-sm:hidden"
          >
            Carta
          </a>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-7 md:hidden" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
        </nav>
      </div>
    </section>
  );
}
