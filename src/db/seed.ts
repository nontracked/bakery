import "dotenv/config";
import {db} from "@/db/index";
import {categories, products} from "@/db/schema";

async function main(){
  try {
    // удаляем старые данные из таблиц
    await db.delete(products);
    await db.delete(categories);

    await db.insert(categories).values([
      {id: 'b&d', label: 'Beignets & Donuts'},
      {id: 'cookies', label: 'Cookies'},
      {id: 'croissants', label: 'Croissants '},
      {id: 'entremets', label: 'Entremets'},
      {id: 'ny-rolls', label: 'New York Rolls'},
      {id: 'tarts', label: 'Tarts'},
    ])

    await db.insert(products).values([
      {
        name: "Blueberry Charlotte",
        desc: "A delicate individual dessert balancing the deep notes of dark chocolate with smooth vanilla and vibrant berry flavors.",
        imgSrc: "/products/4.jpg",
        ingredients: "Vanilla sponge, dark chocolate ganache, vanilla cream, blueberry confit, glazed blueberries.",
        price: 530,
        categoryId: "entremets",
        rating: 4.8,
        weight: 400,
      },
    ])
  } catch (error) {
    console.error(error)
  } finally {
    process.exit(0)
  }
}

main()