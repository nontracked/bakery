import {ProductPage} from "@/components/ProductPage";
import {getProductById} from "@/db/queries";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {db} from "@/db";
import {products} from "@/db/schema";
import {eq} from "drizzle-orm";

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
  const {id} = await params
  const [product] = await db.select().from(products).where(eq(products.id, id))
  if (!product) {
    return {
      title: 'Product not found'
    }
  }
  const {name, imgSrc} = product
  return {
    title: name,
    description: `Order fresh ${name} for just $ ${(product.price / 100).toFixed(2)}.`,
    openGraph: {
      title: name,
      images: [
        {
          url: imgSrc,
        }
      ]
    }
  }
}

export default async function ProductPageServer({params}: ProductPageProps) {
  const {id} = await params
  const product = await getProductById(id)
  if (!product) {
    return notFound()
  }
  return (
    <ProductPage product={product}/>
  )
}