# Prueba Técnica Node.js – Market API

## Requisitos del entorno
- Node.js 18 o superior
- MySQL 8 o superior

## Instalación
Clonar el repositorio e instalar dependencias:

npm install

## Configuración del entorno
Crear el archivo `.env` a partir del archivo de ejemplo:

Windows:
copy .env.example .env

Linux / macOS:
cp .env.example .env

Editar el archivo `.env` y configurar las credenciales de MySQL:

- DB_USER
- DB_PASSWORD

## Base de datos
El esquema de la base de datos y los datos de prueba se encuentran en:

sql/market.sql

El script puede ejecutarse directamente en MySQL:

1. Conectarse a MySQL:
   mysql -u root -p

2. Ejecutar el script (ruta absoluta):
   SOURCE C:/ruta/al/proyecto/sql/market.sql;

La base de datos utilizada se llama `market`.

## Ejecución de la API
Modo desarrollo:

npm run dev

La API quedará disponible en:
http://localhost:3000

## Endpoints disponibles
- GET /api/productos  
- GET /api/ventas/productos-mas-vendidos  
- GET /api/categorias  
- GET /api/promociones/dia/:dia
