# FocusFlow

Aplicación de productividad personal y académica para web, Android e iOS.
Su objetivo es ofrecer, en etapas posteriores, organización y herramientas de estudio.
Esta etapa solo prepara el entorno, la estructura y una pantalla de bienvenida:
no implementa dashboard, calendario, tareas, Pomodoro, hábitos ni IA.

## Tecnologías y requisitos

- Node.js 24 LTS y npm 11. `.nvmrc` indica la versión mayor de Node; no instala Node automáticamente.
- Git para control de versiones. El repositorio original se conserva sin commits automáticos.
- Expo SDK 58, React 19.3, React Native 0.88 y Expo Router 58.
- TypeScript 6 en modo estricto y ESLint con la configuración de Expo.
- Windows y PowerShell, conexión a internet y un navegador para web.
- Android físico: Expo Go compatible con el SDK del proyecto y acceso al equipo por red local.
- Emulador Android: Android Studio, Android SDK, Java compatible y un dispositivo virtual iniciado;
  configurar `ANDROID_HOME` y el PATH de `platform-tools` según Android Studio.
- iPhone físico: Expo Go compatible, misma red y escaneo del QR con la cámara.
- El simulador y la compilación local de iOS requieren macOS y Xcode; no se ejecutan en Windows.
- Si Expo Go no admite el SDK instalado, será necesario un development build compatible;
  esa configuración queda fuera de esta etapa.

Las versiones exactas instaladas se registran en `package-lock.json`. No actualizar React Native
por separado: Expo mantiene una matriz de versiones compatibles.

## Instalación en Windows / PowerShell

Abrir PowerShell en la carpeta del proyecto:

```powershell
Set-Location 'C:\Users\rocer\OneDrive\Escritorio\desk-board'
node --version
npm --version
git --version
npm ci
```

`Set-Location` cambia de carpeta; los tres comandos de versión solo consultan el entorno.
`npm ci` instala exactamente el lockfile y reemplaza `node_modules`; usar `npm install`
cuando se cambian dependencias de forma intencional para actualizar el lockfile.
Si PowerShell bloquea `npm.ps1`, usar `npm.cmd` y `npx.cmd` en lugar de cambiar la política global.
No se necesita instalar el antiguo `expo-cli` global ni tener una cuenta Expo para iniciar web.

## Iniciar y probar

```powershell
npm start
```

Inicia Metro, que transforma TypeScript/JavaScript y sirve la aplicación. El terminal muestra
el QR y los atajos: `w` abre web y `a` intenta abrir Android. `Ctrl+C` detiene el servidor.

```powershell
npm run web
npm run android
```

Ejecutar uno según la plataforma deseada. `web` abre el navegador; `android` requiere un
emulador o dispositivo Android conectado y configurado. Para un teléfono con Expo Go,
usar `npm start` y escanear el QR. En iPhone también se usa el QR desde Windows.
`npm run ios` abre el simulador solamente en un Mac con Xcode.
Si el firewall impide la conexión del teléfono, revisar el permiso de red privada de Node
sin desactivar el firewall. La ejecución web por sí sola no valida las plataformas móviles.

## Estructura

```text
focusflow/                    # carpeta local actual: desk-board
├── .vscode/                  # preferencias y extensión sugerida del editor
├── assets/
│   ├── expo.icon/            # icono iOS de la plantilla
│   └── images/               # iconos, favicon y splash provisionales
├── src/app/
│   ├── _layout.tsx           # navegador raíz y barra de estado
│   └── index.tsx             # bienvenida, ruta /
├── .gitignore
├── .nvmrc
├── AGENTS.md
├── LICENSE
├── README.md
├── app.json
├── eslint.config.js
├── package.json
├── package-lock.json
└── tsconfig.json
```

`node_modules/`, `.expo/`, `expo-env.d.ts` y `dist/` son archivos o carpetas generados e ignorados
por Git. Las carpetas `android/` e `ios/` se generan cuando son necesarias; no se crean a mano.
No se incluyen carpetas vacías para funcionalidades futuras. Cuando haga falta código compartido,
irá fuera de `src/app/`, por ejemplo en `src/components/` o `src/hooks/`.

## Cómo se conectan los archivos

1. `npm start` ejecuta el script de `package.json`, que llama a Expo CLI local.
2. Expo lee `app.json`: nombre visible, identificador slug, esquema de enlaces `focusflow`,
   iconos, splash y plugin `expo-router`. La salida web es estática, sin servidor de aplicación.
3. `main: expo-router/entry` en `package.json` inicia Router; no hace falta un `App.tsx`.
4. Router encuentra `src/app/_layout.tsx`, cuyo `Stack` contiene las pantallas.
5. `src/app/index.tsx` define `/`; `Text`, `View` y `StyleSheet` funcionan en móvil y web.
   `SafeAreaView` evita que el contenido invada las zonas reservadas del dispositivo.
6. `tsconfig.json` extiende los valores de Expo y activa `strict`. El alias `@/*` apunta a `src/*`.
   TypeScript comprueba tipos; Metro transforma el código para ejecutarlo.

`package.json` declara scripts y rangos de dependencias; el lockfile registra las resoluciones exactas.
`eslint.config.js` detecta problemas de código con las reglas de Expo. `.gitignore` evita subir
cachés, dependencias, compilaciones, claves y archivos de entorno. No reemplaza una revisión de secretos.
`AGENTS.md` contiene instrucciones técnicas para agentes; `LICENSE` es la licencia incluida en
la plantilla, no una decisión de publicación o licencia comercial del producto.
Los recursos visuales y preferencias `.vscode` proceden de la plantilla oficial y son provisionales.

## Verificaciones

```powershell
npm run typecheck
npm run lint
npx expo install --check
npx expo-doctor
npx expo config --type public
npx expo export --platform web
```

- `typecheck`: analiza tipos sin generar JavaScript.
- `lint`: analiza errores y convenciones del código.
- `install --check`: compara dependencias con las recomendadas por el SDK sin corregirlas.
- `expo-doctor`: revisa configuración, dependencias y metadatos de compatibilidad.
- `config --type public`: resuelve y muestra la configuración pública; no incluir secretos allí.
- `export --platform web`: compila las rutas y genera la salida en `dist/`; no publica nada.

Para agregar una dependencia necesaria en otra etapa, preferir `npx expo install nombre`:
selecciona una versión compatible. No usar `--force` ni `--legacy-peer-deps` para ocultar conflictos.

## Fuentes oficiales

- https://docs.expo.dev/get-started/create-a-project/
- https://docs.expo.dev/versions/v58.0.0/
- https://docs.expo.dev/versions/v58.0.0/sdk/router/

Los resultados reales de esta auditoría se documentan en `AUDITORIA.md`.
