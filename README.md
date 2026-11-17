# Dr. Oscar Cruz R. — Sonrisas Latinas
### Sitio Web Oficial de Producción &middot; Bucaramanga, Colombia

Sitio web corporativo y de conversión de alta gama para la práctica de odontología estética y rehabilitación oral del **Dr. Oscar Cruz R.** en Bucaramanga, Santander, Colombia.

Diseñado con un enfoque de **quiet luxury** (estética sobria en negro con acentos dorados champaña), tipografía editorial y máxima optimización para dispositivos móviles y altas velocidades de carga.

---

## Características Principales

- **Diseño Quiet Luxury & Mobile-First:** Paleta en negros profundos (`#000000`, `#050505`) y dorados champaña metálicos (`#C6A55C`, `#E3CC94`).
- **Bilingüe Instantáneo (ES / EN):** Selector de idioma en tiempo real sin recarga de página, con persistencia en `localStorage`.
- **Galería de Casos Clínicos Interactiva:** Comparador interactivo de Antes y Después con control táctil para móviles y ratón.
- **Historias y Testimonios en Video (Reels):** Integración de material audiovisual de pacientes y figuras públicas (incluyendo la modelo Natalia Heaven y el cantante vallenato Keyner Morales).
- **Google Maps Interactivo:** Ubicación estratégica en Bucaramanga con filtro dark mode adaptado al diseño de la página.
- **Canal de Concierge WhatsApp:** Botón flotante pulsante en gradiente dorado y formulario estructurado con selección de tratamiento.
- **Cumplimiento Legal y Deontológico:** Páginas legales neutras y obligatorias bajo la legislación colombiana:
  - `terminos-y-condiciones.html`: Obligación de medios, ausencia de promesas de resultado (Ley 23 de 1981, Dec. 780 de 2016).
  - `politica-de-privacidad.html`: Tratamiento y custodia de datos personales (Habeas Data Ley 1581 de 2012).

---

## Estructura del Proyecto

```
DR_OSCAR CRUZ/
├── assets/
│   ├── img/                    # Logotipos oficiales, retratos clínicos y casos de antes/después
│   └── video/                  # Reels optimizados de pacientes y testimonios
├── css/
│   └── styles.css              # Hoja de estilos de producción y responsive design
├── js/
│   └── main.js                 # Controladores interactivos y diccionario bilingüe
├── index.html                  # Página principal
├── terminos-y-condiciones.html   # Términos, condiciones y descargo clínico
├── politica-de-privacidad.html   # Política de privacidad y Habeas Data
├── vercel.json                 # Configuración de URLs limpias y caché CDN para Vercel
├── .gitignore
└── README.md
```

---

## Despliegue en Vercel

1. **Subir a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: Dr. Oscar Cruz official website production release"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. **En Vercel (vercel.com):**
   - Inicia sesión y haz clic en **Add New...** &rarr; **Project**.
   - Importa el repositorio de GitHub recién creado.
   - En *Framework Preset*, selecciona **Other** (o detección automática de HTML estático).
   - Haz clic en **Deploy**.
   - En segundos obtendrás el enlace público seguro HTTPS listo para compartir con el cliente.

---

&copy; 2026 Dr. Oscar Cruz R. &bull; Bucaramanga, Santander, Colombia.
