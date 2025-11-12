import { Logo1, Logo2, Logo3, Logo4, Logo5, Logo6 } from './Logo';

// Página temporal para previsualizar todos los logos
export default function LogoPreview() {
  const logos = [
    { name: 'Logo 1 - Geométrico Minimalista', Component: Logo1 },
    { name: 'Logo 2 - Estilo Tech/Code', Component: Logo2 },
    { name: 'Logo 3 - Hexágono Moderno', Component: Logo3 },
    { name: 'Logo 4 - Con Degradado', Component: Logo4 },
    { name: 'Logo 5 - Líneas Diagonales', Component: Logo5 },
    { name: 'Logo 6 - Estilo Terminal', Component: Logo6 },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Selecciona tu Logo
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-12">
          Elige el diseño que más te guste. Cada logo se adapta al tema claro/oscuro automáticamente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {logos.map(({ name, Component }, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-6">
                {name}
              </h3>
              
              {/* Preview en fondo claro */}
              <div className="mb-4">
                <p className="text-xs text-neutral-500 mb-2">Fondo claro:</p>
                <div className="flex items-center justify-center p-6 bg-white border border-neutral-200 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                    <Component className="text-white" />
                  </div>
                </div>
              </div>

              {/* Preview en fondo oscuro */}
              <div className="mb-4">
                <p className="text-xs text-neutral-500 mb-2">Fondo oscuro:</p>
                <div className="flex items-center justify-center p-6 bg-neutral-900 border border-neutral-700 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                    <Component className="text-white" />
                  </div>
                </div>
              </div>

              {/* Preview en navbar simulado */}
              <div>
                <p className="text-xs text-neutral-500 mb-2">En navbar:</p>
                <div className="flex items-center gap-3 p-4 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Component className="text-white" />
                  </div>
                  <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                    Daniel Fonov
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Para usar este logo, cambia el número en <code className="font-mono">src/components/Logo.tsx</code> línea 56 a <strong>Logo{index + 1}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-neutral-800 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            📝 Instrucciones
          </h2>
          <ol className="space-y-2 text-neutral-300">
            <li>1. Revisa todos los diseños arriba</li>
            <li>2. Elige tu favorito</li>
            <li>3. Abre <code className="px-2 py-1 bg-neutral-700 rounded font-mono text-sm">src/components/Logo.tsx</code></li>
            <li>4. En la línea 56, cambia <code className="px-2 py-1 bg-neutral-700 rounded font-mono text-sm">Logo3</code> por <code className="px-2 py-1 bg-neutral-700 rounded font-mono text-sm">LogoX</code> (donde X es el número que elegiste)</li>
            <li>5. Guarda y actualiza el navbar</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
