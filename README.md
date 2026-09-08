# Pokédex App - Consulta de API y CRUD en React

## 🎯 Objetivo del Proyecto
Esta aplicación web desarrollada en React permite explorar información sobre Pokémon consumiendo una API externa, además de aplicar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una base de datos local simulada.

---

## 🛠️ Tecnologías Utilizadas
* **React** (a través de Vite)
* **JavaScript** (ES6+)
* **HTML5 / CSS3**
* **PokéAPI** (API externa)
* **JSON Server** (API REST local)

---

## 🌐 Consumo de APIs

### PokéAPI
Funciona como la **API externa de consulta**. Permite obtener datos oficiales en tiempo real sobre los Pokémon, como sus estadísticas, tipos, habilidades e imágenes.

### JSON Server
Actúa como la **API local de práctica**. Permite simular un backend completo con una base de datos en un archivo JSON (`db.json`) para realizar pruebas de manipulación de datos sin afectar a un servidor real.

---

## 🔄 Explicación de Métodos HTTP

* **GET**: Recupera información del servidor o API externa. *(Ejemplo: Obtener la lista general o el detalle de un Pokémon)*.
* **POST**: Envía nuevos datos al servidor para crear un recurso. *(Ejemplo: Registrar un nuevo Pokémon en la base de datos local)*.
* **PATCH**: Actualiza parcialmente un recurso existente sin sobrescribirlo por completo. *(Ejemplo: Modificar el nombre o nivel de un Pokémon guardado)*.
* **DELETE**: Elimina un recurso específico del servidor. *(Ejemplo: Borrar un Pokémon de la base de datos local)*.

---

## 🚀 Instrucciones de Instalación y Ejecución

1. **Instalar dependencias del proyecto:**
   ```bash
   npm install