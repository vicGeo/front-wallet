![Image text](https://i.ibb.co/djNqdsP/title-bigbuy.png)

#### Instalación

```sh
npm i
```
Levantar el proyecto React + Vite:
```sh
npm run dev
```

```sh
http://localhost:5173/
```

Se ha utilizado principalmente la librería de **primereact React UI** para los componentes como la tabla, los modales que se abren para retirar/ingresar fondos, los inputs y para tener un control de la validación **react-hook-form**.

Me hubiese gustado que los datos persistieran (usando localStorage o una fakeAPI). O tener endpoints para poder hacer un POST al hacer ingresos/retiradas y traerme esos datos actualizados con un GET.
Aunque al haber metido los datos en un context me ha facilitado la tarea de ir actualizándolos en local.

La mayor dificultad que he encontrado y dónde he perdido más tiempo ha sido con el componente InputNumber de primereact junto con rhForm. Por alguna razón que aún desconozco no me hacía bien el submit poniendo un botón en el modal (no llegaba el value), ahora bien si le damos con la tecla enter sí que funciona (lo he dejado así porque estaba perdiendo mucho tiempo).


Me ha faltado por hacer la feature de añadir el filtro por concepto y rango de fecha 🥲


## Features

- Sort por fecha y por defecto la más actual
- Búsqueda por importe
- Sort por concepto e importe
- Se agregan a los datos las columnas de número de pedido, saldo anterior y saldo posterior (inicialmente estarán vacías hasta que no ingresemos/retiremos fondos)
- Se pueden retirar fondos sin importes negativos y sin superar el saldo actual
- Se pueden ingresar fondos sin importes negativos ni de 0€.
- Paginación

![Image text](https://i.ibb.co/zrygfH4/modal1.png)
![Image text](https://i.ibb.co/d5SB6PB/modal-control-ingresos-importes-negativos.png)
![Image text](https://i.ibb.co/CJ4DJ4r/modal-control-retirada-importes-negativos.png)
![Image text](https://i.ibb.co/th3CmST/busqueda-por-importe.png)
![Image text](https://i.ibb.co/FBByXts/modal-control-retirada.png)
