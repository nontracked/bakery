import {Products} from "@/sections/Products";
import {fetchFullProductsBySharedItems, getShaderCartById} from "@/db/queries";
import {CartHydrator} from "@/components/CartHydrator";
import {CartItem} from "@/store/useCartStore";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({searchParams}: HomeProps) {
  const params = await searchParams;
  const cartId = params?.cart
  let fullItems: CartItem[] = [];

  if (typeof cartId === 'string') {
    const sharedItems = await getShaderCartById(cartId);

    if (sharedItems && sharedItems.length > 0) {
      fullItems = await fetchFullProductsBySharedItems(sharedItems);
    }
  }
  return (
    <>
      <Products />
      <CartHydrator fullItems={fullItems} />
    </>
  )
}