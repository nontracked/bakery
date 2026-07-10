import {Category} from "@/types/category";

export const tabsCategory: Category[] = [
  {id: 'all', label: 'All',},
  {id: 'b&d', label: 'Beignets & Donuts'},
  {id: 'cookies', label: 'Cookies'},
  {id: 'croissants', label: 'Croissants '},
  {id: 'entremets', label: 'Entremets'},
  {id: 'ny-rolls', label: 'New York Rolls'},
  {id: 'tarts', label: 'Tarts'},
  {id: 'popular', label: 'Popular'},
  {id: 'new', label: 'New'},
]

export const getTabsCategory = async (): Promise<Category[]> => {
  return tabsCategory
}