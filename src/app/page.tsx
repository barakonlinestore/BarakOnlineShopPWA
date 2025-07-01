import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const products = [
  {
    id: 1,
    name: "Classic Cotton Tee",
    price: "25.00",
    image: "https://placehold.co/400x400.png",
    aiHint: "cotton shirt"
  },
  {
    id: 2,
    name: "Modern Denim Jeans",
    price: "75.00",
    image: "https://placehold.co/400x400.png",
    aiHint: "blue jeans"
  },
  {
    id: 3,
    name: "Leather Ankle Boots",
    price: "120.00",
    image: "https://placehold.co/400x400.png",
    aiHint: "brown boots"
  },
  {
    id: 4,
    name: "Silk Scarf",
    price: "40.00",
    image: "https://placehold.co/400x400.png",
    aiHint: "patterned scarf"
  },
  {
    id: 5,
    name: "Wool Beanie",
    price: "30.00",
    image: "https://placehold.co/400x400.png",
    aiHint: "winter hat"
  },
  {
    id: 6,
    name: "Stylish Sunglasses",
    price: "90.00",
    image: "https://placehold.co/400x400.png",
    aiHint: "aviator sunglasses"
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-b bg-primary/5">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] font-headline">
                  Discover Your Style at Barak Online Shop
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
                  Explore our curated collection of fashion essentials. Quality apparel at your fingertips.
                </p>
                <div className="space-x-4 mt-6">
                  <Link href="#products">
                    <Button>Explore Products</Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  src="https://placehold.co/600x600.png"
                  alt="Hero"
                  width={600}
                  height={600}
                  className="rounded-xl object-cover"
                  data-ai-hint="fashion model"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="products" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center font-headline mb-10">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
