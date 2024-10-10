# Parcial_2-Desarrollo-Web-UdeA-

Segundo parcial de desarrollo web
(js y API)

Elaborado por: Santiago Giraldo Tabares
Documento: impar

El proyecto realizado consta de una aplicación web que permite consultar un listado de alimentos
mediante una API. El endpoint en cuestión lleva a un objeto JSON aleatorio (cada que se accede a
este endpoint, se genera una lista de alimentos aleatorios distinta). La aplicación permite:

1. consultar una lista con los alimentos (muestra nombre, categoria, descripción, imagen e ingredientes)
2. agregar nuevo alimento (El usuario debe agregar manualmente cada uno de los elementos y este se enviará a la API)
3. Modificar alimentos (El usuario introducirá el nombre de un alimento de la lista, y cambiará los demás campos)

Notas:

1. El sistema es Case Sensitive, así que cuidado al introducir los nombres de los alimentos!
2. El sistema tiene mensajes de feedback para saber si la operacion fue o no exitosa en cada caso
3. Se agregaron console.logs para verificar el codigo de status y las respuestas correspondientes a cada peticion
4. el CSS es básico, sin embargo es entendible, no es el propósito de este proyecto.
5. Al inicial la aplicacion, lo primero que debe hacer consultar el listado. luego de esto se le permitirá agregar o modificar en el listado consultado.
6. Para las URL de las imagenes de los productos a introducir, puede optar por URL de intenet y no necesariamente rutas locales.

