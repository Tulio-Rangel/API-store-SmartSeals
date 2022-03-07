# API Smart Seals

Esta es la API de Smart Seals para manejar los pedidos, productos, usuarios, marcas. Esta es una aplicación persistente desarrollada en NodeJs y MongoDB

## Recursos Utilizados

- Node.js
- NestJS
- MongoDB
- JWT
- Swagger
- Bcrypt
- Joi
- Dotenv

## Información Antes de empezar si se quiere ejecutar en local

#### Se debe tener instalado en el computador lo siguiente:

- MongoDB
- Node.js

#### Atención

Se debe crear un archivo **.env** en la raiz del proyecto que contenga las siguentes variables:

- API_KEY
- DATA_BASE_NAME
- DATA_BASE_PORT
- PORT
- USERMONGO
- PASSWORDMONGO
- JWT_SECRET

## Istalación

#### 1. Clonar el proyecto
```
git clone https://github.com/Tulio-Rangel/API-store-SmartSeals.git
```
#### 2. Instalar las dependencias
```
npm install
```
#### 3. Correr el servidor
```
npm run start
```
o
```
npm run start:dev
```
## Documentación

La documentación puede ser accedida desde: [Documentación](http://localhost:3000/docs)

## Acceder a la API desplegada

Para tener acceso a la API desplegada puede acceder sin necesidad de instalar nada a: [API-desplegada](https://young-caverns-67333.herokuapp.com/docs/)
