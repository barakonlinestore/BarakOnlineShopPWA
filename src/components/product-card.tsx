import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  aiHint: string;
};

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <CardHeader className="p-0 relative">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="object-cover w-full h-auto aspect-square"
          data-ai-hint={product.aiHint}
        />
         <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm rounded-full">
            <Heart className="w-5 h-5 text-gray-600" />
            <span className="sr-only">Add to Wishlist</span>
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <CardTitle className="text-lg font-headline tracking-normal">{product.name}</CardTitle>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold">${product.price}</p>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
