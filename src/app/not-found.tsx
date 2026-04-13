import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 bg-surface-primary">
      <div className="text-center max-w-md">
        <div className="font-display font-bold text-8xl md:text-9xl text-brand-teal/20 mb-4">
          ٤٠٤
        </div>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-brand-text mb-4">
          الصفحة غير موجودة
        </h1>
        <p className="text-brand-text-muted mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-brand-purple dark:bg-brand-teal text-white dark:text-brand-purple-dark text-sm font-medium px-8 py-3 rounded-lg hover:bg-brand-purple-dark dark:hover:bg-brand-teal-light transition-all duration-300 hover:scale-[0.97]"
        >
          العودة للرئيسية
        </Link>
      </div>
    </section>
  );
}
