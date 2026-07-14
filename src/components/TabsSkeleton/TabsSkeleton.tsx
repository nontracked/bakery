'use client'

import '@/components/CatalogClient/CatalogClient.scss'
import './TabsSkeleton.scss'
import {TabsLoader} from "@/components/TabsLoader";

export const TabsSkeleton = () => {
  return (
    <ul className="catalog-client__tabs-list catalog-client__tabs-list--loaders" aria-hidden="true">
      {[...Array(8)].map((_, index) => (
        <li className="catalog-client__tabs-item" key={index}>
          <TabsLoader className="tabs-loader" uniqueKey={`tabs-loader-${index}`} key={index}/>
        </li>
      ))}
    </ul>
  )
}