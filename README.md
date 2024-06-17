# Front React + TypeScript + Vite | Back Laravel | Base de datos Postgres

URL Produccion : https://dollar-prueba-tecnica.netlify.app/

# FRONT

- Se realizo un diseño basico donde se le dio mas prioridad a las funcionalidades y a la accesibilidad y SEO
  - se realizo el diseño responsive para versiones moviles
  - se realizo 

# NOTA: Se agrego valdiacion de datos y posibles errores comunes para la usabilidad

- Se adjunta imagen

  # Movil

  # Escritorio

- ![Desing](image.png)

# BACK
se realizo el comando On-Demand local
 command --> php artisan fetch:dollar-value 

tambien se coloco un funcion --> schedule --> que ejecuta cada hora el comando  php artisan fetch:dollar-value
Testeado con el servidor de produccion de railway (cron Job)

Se realizan los siguientes endpoints :
version de produccion:
METHOD: GET
URL_ENDPOINT: https://dollar-prueba-tecnica-production.up.railway.app/api/dollar-values
descripcion: Trae todos los datos que se realizan en el fetch del comando tamibne opcional puede venir por params start_date y end_date para traer los datos con las fechas solicitadas

         METHOD: POST
        URL_ENDPOINT: https://dollar-prueba-tecnica-production.up.railway.app/api/dollar-values
        descripcion: se realiza la insercion en la base de datos el fetch del comando creado para obtener la fluctuacion del dolar

         METHOD: PATCH
        URL_ENDPOINT: https://dollar-prueba-tecnica-production.up.railway.app/api/dollar-values
        descripcion: se realiza para hacer un cambio solo al valor del dolar de la base de datos

        METHOD: POST --> se pudo realizar dentro del PATCH del Update mas adelante lo optimizare
        URL_ENDPOINT: https://dollar-prueba-tecnica-production.up.railway.app/api/dollar-values
        descripcion: se realiza para hacer eliminar multiple registro y aprovechar el Body
