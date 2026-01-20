# Tests Unitarios - Guitar Chord Trainer

## Descripción

Se han creado tests unitarios para verificar la funcionalidad de filtrado de acordes en la aplicación.

## Tests Incluidos

### 1. `chordData.test.ts`
Tests para las funciones principales de filtrado:

- **getChordsByConfig()**
  - ✅ Filtra acordes por escala (Mayor/Menor)
  - ✅ Filtra acordes por opción de cejilla (Con/Sin/Ambos)
  - ✅ Filtra acordes por selección personalizada
  - ✅ Combina múltiples filtros correctamente
  - ✅ Retorna los 12 acordes de Mayor cuando no hay filtro de selectedChords

- **applySuperficialFilters()**
  - ✅ Excluye acordes con cejilla
  - ✅ Muestra solo acordes con cejilla
  - ✅ Excluye acordes con semitonos (#)
  - ✅ Muestra solo acordes con semitonos (#)
  - ✅ Combina filtros de cejilla y semitonos
  - ✅ No filtra cuando no hay filtros aplicados

- **Integration Tests**
  - ✅ Pipeline completo: escala + cejilla + semitonos
  - ✅ Mayor sin cejilla y sin semitonos = 7 acordes (C, D, E, F, G, A, B)
  - ✅ Menor con filtros aplicados correctamente

### 2. `Training.test.tsx`
Tests para el componente Training:

- ✅ Renderiza correctamente con Mayor scale
- ✅ Respeta barreFilter: 'exclude-barre'
- ✅ Respeta sharpsFilter: 'exclude-sharps'
- ✅ Aplica ambos filtros simultáneamente
- ✅ Funciona con acordes personalizados y filtros
- ✅ Maneja escala Menor con filtros

### 3. `AdvancedConfiguration.test.tsx`
Tests para el componente AdvancedConfiguration:

- ✅ Renderiza cuando isOpen es true
- ✅ No renderiza cuando isOpen es false
- ✅ Pre-marca acordes de Mayor al abrir
- ✅ Muestra opciones de filtros
- ✅ Ejecuta callbacks de cierre
- ✅ Tiene botón de testear
- ✅ Tiene opción de guardar configuración
- ✅ Maneja configuraciones con selectedChords
- ✅ Maneja configuraciones con filtros pre-establecidos

## Instalación de Dependencias

Para ejecutar estos tests, necesitas instalar las dependencias de testing:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

O con yarn:

```bash
yarn add -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

## Configuración de Vitest

Agrega a `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig as defineVitestConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
  },
})
```

## Ejecución de Tests

Agrega a `package.json` en scripts:

```json
"test": "vitest",
"test:ui": "vitest --ui",
"test:coverage": "vitest --coverage"
```

Luego ejecuta:

```bash
npm run test
```

## Casos de Prueba Críticos

### Caso 1: Mayor sin semitonos
```javascript
const baseChords = getChordsByConfig('Mayor', 'Ambos');
const filtered = applySuperficialFilters(baseChords, 'none', 'exclude-sharps');
// Resultado esperado: 7 acordes (Do, Re, Mi, Fa, Sol, La, Si)
// Sin: Do♯, Re♯, Fa♯, Sol♯, La♯
```

### Caso 2: Mayor sin cejilla
```javascript
const baseChords = getChordsByConfig('Mayor', 'Sin cejilla');
// Retorna solo acordes sin cejilla
```

### Caso 3: Acordes seleccionados + filtros
```javascript
const selectedNames = ['C', 'C#', 'D', 'D#', 'E'];
const baseChords = getChordsByConfig('Mayor', 'Ambos', selectedNames);
const filtered = applySuperficialFilters(baseChords, 'none', 'exclude-sharps');
// Resultado: ['C', 'D', 'E'] (sin C♯ y D♯)
```

## Problemas Reportados / Corregidos

### ✅ Problema: Filtros no se aplicaban durante el test
- **Causa**: La función `handleTestConfig` no aplicaba los filtros superficiales
- **Solución**: Se creó `applySuperficialFilters()` y se usa tanto en test como en Training

### ✅ Problema: Filtros no se aplicaban durante la práctica
- **Causa**: Training.tsx solo llamaba `getChordsByConfig` sin los filtros
- **Solución**: Se agregó `applySuperficialFilters()` en el useMemo de Training

### ✅ Problema: Pre-marcado de acordes no se guardaba
- **Causa**: El estado `hasChanges` no se marcaba correctamente
- **Solución**: Se usa `hasChanges` para rastrear cambios reales vs visuales

## Ejecución de Pruebas

Para verificar que todo funciona:

```bash
# Ejecutar todos los tests
npm run test

# Ver interfaz gráfica
npm run test:ui

# Ver cobertura
npm run test:coverage
```

Todos los tests deberían pasar ✅
