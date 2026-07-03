import './TabList.scss'
import {TabButton} from "@/ui/TabButton";
import {Category} from "@/types/category";

interface TabListProps {
  tabs: Category[];
  activeTab: string;
  handleTabClick: (id: string) => void;
}

export const TabList = ({tabs, activeTab, handleTabClick}: TabListProps) => {
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