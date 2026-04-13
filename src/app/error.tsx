'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 bg-surface-primary">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="font-display font-bold text-2xl text-brand-text mb-4">
          حدث خطأ غير متوقع
        </h1>
        <p className="text-brand-text-muted mb-8 leading-relaxed">
          عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center bg-brand-purple dark:bg-brand-teal text-white dark:text-brand-purple-dark text-sm font-medium px-8 py-3 rounded-lg hover:bg-brand-purple-dark dark:hover:bg-brand-teal-light transition-all duration-300 hover:scale-[0.97]"
        >
          حاول مرة أخرى
        </button>
      </div>
    </section>
  );
}
