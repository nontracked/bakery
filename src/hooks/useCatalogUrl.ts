import {useSearchParams} from "next/navigation";

export const useCatalogURL = () => {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('category') || 'all'
  const handleTabClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', id)
    window.history.replaceState(null, '', `?${params.toString()}`)
  }
  return {activeTab, handleTabClick}
}