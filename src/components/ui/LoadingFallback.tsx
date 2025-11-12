/**
 * Componente de loading minimalista y optimizado
 */
export default function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
      </div>
    </div>
  );
}
