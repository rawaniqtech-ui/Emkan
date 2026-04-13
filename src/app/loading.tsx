export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-surface-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-brand-teal/20 border-t-brand-teal animate-spin" />
        <p className="text-sm text-brand-text-muted">جاري التحميل...</p>
      </div>
    </div>
  );
}
