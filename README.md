# CRUD
Configuración del Proyecto

## Este proyecto utiliza Node.js, Express y MongoDB como base de datos. Para configurar el proyecto, sigue los siguientes pasos:
Prerrequisitos

Tener instalado Node.js y npm en tu computadora.
Tener acceso a una base de datos de MongoDB (ya sea local o remota).

## Instalación

Clona el repositorio o descarga el código fuente.
Abre una terminal y navega hasta el directorio del proyecto (Esto debe hacerse  tanto en la carpeta Backend como Frontend).
Ejecuta el siguiente comando para instalar todas las dependencias del proyecto:

    npm install

## Configuración de la base de datos

Crea una base de datos de MongoDB en tu servidor local o remoto.
Crea un archivo .env en la raíz del proyecto con la siguiente estructura:


    MONGODB_URI=<URI de conexión a la base de datos de MongoDB>
    JWT_SECRET=<secreto para generar los tokens JWT>
    
Reemplaza <URI de conexión a la base de datos de MongoDB> con la URI de conexión a la base de datos de MongoDB. Reemplaza <secreto para generar los tokens JWT> con una cadena secreta que se utilizará para generar los tokens JWT.
    
## Ejecución

Ejecuta el siguiente comando para iniciar el servidor:
    npm start
    
Este comando iniciará el servidor y estará disponible en el puerto 3000 por defecto. Si deseas cambiar el puerto, define la variable de entorno PORT en tu archivo .env.

Para iniciar el servidor con nodemon en modo de desarrollo, ejecuta el siguiente comando ## (Para que funciones el programa deben estar corriendo ambos servidores, tanto el back como el frontend):

    npm run dev

Esto iniciará el servidor y estará disponible en el puerto 3000 por defecto. Si deseas cambiar el puerto, define la variable de entorno PORT en tu archivo .env. El servidor se reiniciará automáticamente cuando se detecten cambios en el código fuente.

