export const formatIngredients = (str: string) => {
  if (!str) return []
  return str
    .replace(/\.$/, '') // убираю точку в самом конце строки (если она там случайно есть)
    .split(',')
    .map((item) => {
      const afterTrim = item.trim() // удаляю пробелы
      if (!afterTrim) return '' // если после обрезки ничего не осталось возврат пустой строки
      return afterTrim[0].toUpperCase() + afterTrim.slice(1)
    }).filter(Boolean) // удаляем весь мусор
}