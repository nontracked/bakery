import {pgTable, uuid, text, integer, real, boolean, timestamp, jsonb} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";

export const categories = pgTable('categories', {
  id: text("id").primaryKey(),
  label: text("label").notNull()
})

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  desc: text("desc").notNull(),
  price: integer("price").notNull(),
  ingredients: text("ingredients").notNull(),
  weight: integer("weight").notNull(),
  categoryId: text("category_id").references(() => categories.id).notNull(),
  imgSrc: text("img_src").notNull(),
  rating: real("rating").notNull(),
  outOfStock: boolean("out_of_stock").default(false)
})

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: text("status").default("NEW").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const ordersItems = pgTable("orders_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  orderId: uuid("order_id").references(() => orders.id).notNull(),
  productId: uuid("product_id").references(() => products.id).notNull()
})

export const sharedCarts = pgTable('shared_carts', {
  id: uuid('id').defaultRandom().primaryKey(),
  items: jsonb('items').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const categoriesRelations = relations(categories, ({many}) => ({
  products: many(products)
}))

export const productsRelations = relations(products, ({one}) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id]
  })
}))

export type Product = typeof products.$inferSelect
export type Category = typeof categories.$inferInsert
