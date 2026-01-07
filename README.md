# Gestión Política - Daniel Rico

Aplicación web progresiva (PWA) diseñada para la gestión ágil de campañas políticas. Permite el registro de votantes, control de metas, visualización de progreso y exportación de reportes.

## Características

- **Registro de Votantes**: Formulario intuitivo para capturar datos esenciales.
- **Gestión de Líderes**: Configuración personalizada con foto y datos del líder político.
- **Control de Metas**: Visualización en tiempo real del progreso hacia la meta de votantes.
- **Reportes**: Exportación de datos a formatos Excel y PDF (con foto del líder).
- **Diseño Premium**: Interfaz moderna con efectos de vidrio (glassmorphism) y animaciones fluidas.
- **Persistencia**: Los datos se guardan localmente en el navegador.

## Tecnologías Utilizadas

- **Frontend**: React + Vite
- **Estilos**: CSS3 Moderno (Variables, Flexbox, Grid, Glassmorphism)
- **Gráficos**: Recharts
- **Exportación**: XLSX (Excel), jsPDF + jspdf-autotable (PDF)
- **Iconos**: Lucide React

## Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd gestion-politica-daniel-rico
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Ejecutar en desarrollo**:
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

4.  **Construir para producción**:
    ```bash
    npm run build
    ```

## Estructura del Proyecto

- `/src/components`: Componentes reutilizables (Formularios, Gráficos, Encabezados).
- `/src/utils`: Utilidades y lógica de exportación.
- `/src/index.css`: Estilos globales y sistema de diseño.
