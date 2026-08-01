export const formatIngredients = (str: string) => {
  if (!str) return []
  return str
    .replace(/\.$/, '')
    .split(',')
    .map((item) => {
      const afterTrim = item.trim()
      if (!afterTrim) return ''
      return afterTrim[0].toUpperCase() + afterTrim.slice(1)
    }).filter(Boolean)
}