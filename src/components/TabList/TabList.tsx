'use client'
import './TabList.scss'
import {TabButton} from "@/ui/TabButton";
import {Category} from "@/types/category";
import {useCatalogURL} from "@/hooks/useCatalogUrl";

interface TabListProps {
  tabs: Category[];
}

export const TabList = ({tabs}: TabListProps) => {
  const {activeTab, handleTabClick} = useCatalogURL()
  return (
    <ul className="catalog-client__tabs-list">
      {tabs.map(({id, label}) => (
        <li className="catalog-client__tabs-item" key={id}>
          <TabButton label={label} activeTab={activeTab} id={id} onClick={() => handleTabClick(id)} />
        </li>
      ))}
    </ul>
  )
}