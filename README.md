# Impresion-Arte — Sitio Web

Página web de una sola página (secciones: Inicio, Productos, Galería y Contacto) para el negocio **Impresion-Arte** en Toluca, Estado de México.

## Archivos

| Archivo / Carpeta | Descripción |
|-------------------|-------------|
| `index.html` | Página principal con todas las secciones |
| `css/styles.css` | Estilos (diseño moderno y adaptable a celular) |
| `js/script.js` | Interactividad: menú móvil, galería, formulario, botones |
| `images/` | Imágenes JPG/PNG (`img-01.jpeg` … `img-43.jpeg`) |

## Cómo abrir la página

1. Haz doble clic en `index.html` (se abre en tu navegador).
2. Todo funciona localmente; solo se necesita internet para las fuentes de Google y WhatsApp/Mapas.

## Contacto configurado

- WhatsApp: `565 545 4320` → `https://wa.me/525655454320`
- Correo: `impresuionarte23@gmail.com`
- Dirección: Pradera del Ote. 63, Jardines de la Crespa, C.P. 50016, Estado de México

## Cómo editar

### Cambiar productos
Abre `index.html` y busca la sección `<!-- Productos -->`. Cada producto es un bloque `<article class="card">` con:
- `src` del `img` → imagen (puede ser `images/img-XX.jpeg` o un PNG que agregues).
- `<h3 class="card__title">` → nombre.
- `<p class="card__text">` → descripción.
- `href` del botón Cotizar → url precargada de WhatsApp; edita el texto de `text=...`.

### Cambiar imágenes de la galería
En `index.html`, sección `<!-- Galería -->`: cada `<div class="gallery__item">` usa un `img`. Cambia el `src` o agrega/elimina bloques. Si agregas una imagen nueva a la carpeta `images/`, usa nombres simples sin espacios ni caracteres especiales (p. ej. `foto1.png`).

### Contacto
Los datos de WhatsApp, correo y dirección están en:
- Botones `wa.me/525655454320` (sección Productos, Hero, formulario y botón flotante).
- Texto visible en la sección Contacto y el pie de página.

Para cambiar el número de WhatsApp:
1. Busca `525655454320` (número de México sin el `+52` final, es decir `52` + número).
2. Reemplázalo por `52` + tu nuevo número en todos los lugares (hay varios botones).

### Cambiar colores y estilos
En `css/styles.css`, al inicio hay variables (`:root`) con los colores, bordes y sombras. Cambia valores como `--clr-primary` para ajustar la paleta.

## Notas

- Las imágenes se copiaron desde la carpeta original; el origen no fue modificado.
- Si quieres otra tipografía, edita también el enlace de Google Fonts en `index.html`.