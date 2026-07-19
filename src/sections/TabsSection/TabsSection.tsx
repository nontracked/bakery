import './TabsSection.scss'
import {TabList} from "@/components/TabList";
import {getTabs} from "@/db/queries";

export const TabsSection = async () => {
  const tabs = await getTabs()
  const allTabs = [
    {id:'all',label:'All'},
    ...tabs,
    {id:'popular',label:'Popular'},
  ]
  return (
    <TabList tabs={allTabs} />
  )
}