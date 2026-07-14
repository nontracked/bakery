import './TabsSection.scss'
import {TabList} from "@/components/TabList";
import {getTabsCategory} from "@/lib/tabsCategory";

export const TabsSection = async () => {
/*  await new Promise(resolve => setTimeout(resolve, 2000))*/
  const tabs = await getTabsCategory()
  return (
    <TabList tabs={tabs} />
  )
}