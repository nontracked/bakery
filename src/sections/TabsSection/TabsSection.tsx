import './TabsSection.scss'
import {TabList} from "@/components/TabList";
import {getTabs} from "@/db/queries";
import {TabsError} from "@/components/TabsError";

export const TabsSection = async () => {
  try {
    const tabs = await getTabs()
    const allTabs = [
      {id: 'all', label: 'All'},
      ...tabs,
      {id: 'popular', label: 'Popular'},
    ]
    return <TabList tabs={allTabs} />
  } catch (error) {
    console.error('Filter Loading Error', error)
    return <TabsError />
  }
}