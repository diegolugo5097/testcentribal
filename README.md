# Primeros pasos con la aplicación Create React

Este proyecto se inició con [Crear aplicación React] (https://github.com/facebook/create-react-app).
El proyecto cuanta con una Arquitectura Hexagonal bajo el lenguaje de typescript.

## Scripts disponibles

En el directorio del proyecto, puedes ejecutar

Es recomendando empezar por el arranque de nuestro servidor.
### `npm run server` Json Server

El proyecto cuenta con el paquete JsonServer, que nos permite tener una emulación de un servidor backend donde nos permitira realizar peticiónes.

### `npm start`

Ejecuta la aplicación en modo desarrollo.
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.

La página se recargará cuando realices cambios.
También puedes ver cualquier error de lint en la consola.

### `docker-compose up`
Esto levantara nuestro proyecto desde una imagen docker configurada en el docker-compose.yml

### `npm test` Jest test

Lanza el ejecutor de pruebas en el modo de vigilancia interactiva.\_## `npm test`.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.
Agrupa correctamente React en modo de producción y optimiza la compilación para obtener el mejor rendimiento.

La compilación está minificada y los nombres de archivo incluyen los hashes.\
Tu aplicación está lista para ser desplegada.
