export const defaultText = `Aguas
Cigarros
Comidas preparadas
Pollos
Gaseosas
Carnes
Frutas y Verduras
Bebidas sin alcohol
Lacteos
Azucares
Golosinas
Pescados
Chocolates
Comidas listas
Leches`

export const defaultPriorityList = [
  new RegExp('frutas\\s+y\\s+verduras', 'i'),
  new RegExp('carnes|pescados|pollos', 'i'),
  new RegExp('lacteos|leches', 'i'),
  new RegExp('comidas\\s+(preparadas|listas)', 'i'),
]
