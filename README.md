# Server Galery Images

Api para consumo de datos de galery images

# Esta API fue realizada con

* Node.js
* Express
* MySql para DB
* Sequelize, como ORM
* Bcryptjs, para el hasheado de las contraseñas
* Json Web Token para las rutas privadas y publicas

# Rutas publicas a utilizar

* Get a
  /user - para obtener los usuarios con las imagenes asociadas
 
* Get a
  /image - para obtener todas las imagenes con su usuario asociado
  
El resto de las rutas son privadas y requieren logear para su posterior acceso.

# Servidor deployado con Heroku

* https://server-galery.herokuapp.com/
