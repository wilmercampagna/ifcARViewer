# ifcAR Viewer

ifcAR Viewer es una aplicación web que permite cargar archivos IFC y visualizarlos en 3D y en realidad aumentada. Esta visualización puede ser realizada desde un navegador en dispositivos móviles como celulares o tablets.

## Funcionalidades

- Carga de archivos IFC desde el dispositivo
- Visualización 3D con controles de cámara orbital
- Sesiones de Realidad Aumentada (WebXR)
- Transformaciones: escala, desplazamiento y rotación de modelos
- Gestión de categorías IFC (visibilidad y transparencia)
- Plano de corte interactivo
- Modo oscuro
- PWA instalable con soporte offline

## Tecnologías

- **Vue 3** (Composition API)
- **Three.js** + **web-ifc-three** para renderizado 3D e IFC
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **Pinia** para manejo de estado
- **WebXR** para Realidad Aumentada

## Requisitos previos

- [Node.js](https://nodejs.org/) (v16 o superior)
- npm (incluido con Node.js)

## Instalación

```bash
git clone https://github.com/wilmercampagna/ifcARViewer.git
cd ifcARViewer
npm install
```

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/ifcARViewer/`

## Build de producción

```bash
npm run build
npm run preview
```

## Compatibilidad AR

### Android
Requiere un dispositivo compatible con [Google AR Services](https://developers.google.com/ar/devices?hl=es-419) y navegador Chrome.

### iOS
Requiere la aplicación [WebXR Viewer](https://apps.apple.com/us/app/webxr-viewer/id1295998056).

## Despliegue

La aplicación se despliega automáticamente en GitHub Pages mediante GitHub Actions al hacer push a la rama `main`.

## Créditos

- [@wilmercampagna](https://github.com/wilmercampagna)
- Grupo de investigación GRUA
- Universidad del Valle
