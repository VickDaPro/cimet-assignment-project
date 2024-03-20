"use client";

import ProductList from "@/app/_components/ProductList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <ProductList />
    </main>
  );
}
