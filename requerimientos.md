# Taller de Programacion 2 
### Examen Final llamado Julio(16 de Julio, 2025)

Desarrollar una **API RESTful** en **Node.js con Express** para gestionar el stock de productos, cumpliendo con las especificaciones técnicas detalladas.  

### **Requisitos Clave:**  
1. **Endpoints:**  
   - Crear, listar y obtener productos (sin autenticación).  
   - Incrementar stock (requiere autenticación con `API Key` vía header `x-api-key`).  

2. **Validaciones:**  
   - Campos obligatorios (`producto`, `stockAmount ≥ 0`).  
   - Formato de fecha ISO 8601 y reglas de negocio (ej.: incremento mínimo de stock = 1).  

3. **Estructura:**  
   - Proyecto organizado en capas (rutas, controladores, modelos, repositorio).  
   - Persistencia en memoria o archivo `JSON`.  

4. **Autenticación:**  
   - Middleware para proteger `/updateStock` (excepto alumnos con parcial regular).  

5. **Pruebas:**  
   - Incluir archivo `test.endpoints.http` con solicitudes de ejemplo.  

# Detalles Tecnicos
## Modelo del Dominio

| Campo          | Tipo                 | Obligatorio | Descripción                                                                |
| -------------- | -------------------- | ----------- | -------------------------------------------------------------------------- |
| `id`           | UUID \| INT          | Sí          | Identificador único generado por el sistema (UUID o autoincremental).      |
| `producto`     | string               | Sí          | Nombre descriptivo del producto.                                           |
| `stockAmount`  | integer (≥ 0)        | Sí          | Cantidad disponible en inventario.                                         |
| `fechaIngreso` | date (default = hoy) | No          | Fecha de ingreso. Si no se especifica, el servidor asigna la fecha actual. |

## Endpoints REST

| Operación               | Método | Ruta                                | Descripción                                        | Auth | Código de Éxito             |
| ----------------------- | ------ | ----------------------------------- | -------------------------------------------------- | ---- | --------------------------- |
| Crear producto          | POST   | `/api/v1/productos`                 | Registra un nuevo producto con su stock inicial.   | No   | `201 Created`               |
| Listar productos        | GET    | `/api/v1/productos`                 | Devuelve todos los productos con stock disponible. | No   | `200 OK`                    |
| Obtener producto por ID | GET    | `/api/v1/productos/:id`             | Devuelve el producto correspondiente al ID.        | No   | `200 OK` \| `404 Not Found` |
| Aumentar stock          | PUT    | `/api/v1/productos/:id/updateStock` | Incrementa el `stockAmount` del producto indicado. | Sí   | `200 OK`                    |

## Autenticación

### Requisitos

El endpoint de incremento de stock requiere autenticación mediante `API Key`, tal como se explicó en la clase `07_clase`.

* Se utiliza **Basic Authentication**.
* La `apiKey` debe enviarse en el header `x-api-key`.

### Codigo de errores en la falta de la apiKey

| Código | Descripción                        |
| ------ | ---------------------------------- |
| 401    | Unauthorized (sin credenciales)    |
| 403    | Forbidden (credenciales inválidas) |

> Los estudiantes con **parcial regular** están exentos de este requerimiento durante la evaluación.

### Ejemplo de autenticación

```http
GET http://HOST:PORT/<endpoint>
x-api-key: soy-una-api-key
```

## Reglas de Validación

1. `producto` no debe estar vacío.
2. `stockAmount` inicial debe ser un entero mayor o igual a 0.
3. En `/api/v1/productos/:id/updateStock`, el valor debe ser un entero mayor o igual a 1.
4. Las fechas deben utilizar el formato ISO 8601 (`YYYY-MM-DD`).
5. Las respuestas de error deben seguir la siguiente estructura:

```json
{
  "statusCode": STATUSCODE,
  "error": "<Mensaje descriptivo>"
}
```

## Organización Sugerida del Proyecto

```bash
proyecto-stock-api/
├── app.js                          # Punto de entrada. Configura servidor, rutas y middlewares.
├── controllers/
│   └── productoController.js       # Lógica de negocio para manejo de productos.
├── middlewares/
│   └── basicAuth.js                # Middleware de autenticación básica.
├── models/
│   └── producto.js                 # Modelo del producto (estructura y validaciones).
├── repository/
│   └── productoRepository.js       # Módulo de persistencia (en memoria o archivo JSON).
├── routes/
│   └── productoRoutes.js           # Definición de rutas y vinculación con controladores.
└── tests/
    └── test.endpoints.http         # Pruebas de endpoints (formato compatible con REST Client en VS Code).
```

---

## Aclaraciones sobre el desarrollo esperado

### 1. Alcance

* El proyecto debe incluir únicamente el **backend**.
* Debe implementarse en **Node.js** con el framework **Express**.
* La API debe cumplir con los principios de diseño **REST/RESTful**, cuidando especialmente:

  * Nombres adecuados para las rutas (sustantivos, no verbos).
  * Uso correcto de métodos HTTP (`GET`, `POST`, `PUT`, etc.).
  * Transmisión apropiada de datos (body, path params, query).

### 2. Separación de Capas

El proyecto debe estar estructurado en capas bien diferenciadas. Se espera la existencia de:

* `routes/` → Rutas y configuración de endpoints.
* `controllers/` → Coordinación de las peticiones entrantes.
* `use-cases/` → Casos de uso con la lógica de negocio.
* `models/` → Entidades del dominio.
* `repository/` → Persistencia de datos (en memoria o simulada).
* `services/` → Servicios externos, si corresponde.

### 3. Validación de Datos

* La validación debe implementarse **en la capa de casos de uso** antes de acceder a la persistencia.
* No debe realizarse en las rutas ni en los controladores.
* Se deben generar pruebas automatizadas o semiautomatizadas en archivos `.http`.

### 4. Persistencia

* **No se requiere una base de datos real**.
* Se permite el uso de persistencia **en memoria o mediante archivo `database.json`**.

### 5. Reutilización de Código

* Puede reutilizarse código de proyectos anteriores siempre que:

  * Esté bien integrado y cumpla una función útil.
  * No incluya archivos innecesarios o sin relación con el sistema.

---

## Formato de Entrega

Debe entregarse un archivo `.txt` con el siguiente contenido:

```text
### Entrega Final Taller de Programación
* nombre_alumno: <NOMBRE_APELLIDO>
* link: Repositorio en <GitHub | GitLab | BitBucket>
```
