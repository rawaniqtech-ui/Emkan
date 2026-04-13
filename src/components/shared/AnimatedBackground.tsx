'use client';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blob 1 — large teal top-left */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.15] dark:opacity-[0.08] blur-[120px] animate-blob-1"
        style={{ background: '#87C6C7', top: '-10%', left: '-5%' }}
      />

      {/* Blob 2 — purple top-right */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.1] dark:opacity-[0.12] blur-[100px] animate-blob-2"
        style={{ background: '#3B2C59', top: '5%', right: '-10%' }}
      />

      {/* Blob 3 — teal center */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.08] dark:opacity-[0.15] blur-[150px] animate-blob-3"
        style={{ background: '#87C6C7', top: '40%', left: '30%' }}
      />

      {/* Blob 4 — purple bottom-left */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.12] dark:opacity-[0.1] blur-[100px] animate-blob-4"
        style={{ background: '#3B2C59', bottom: '10%', left: '-5%' }}
      />

      {/* Blob 5 — teal bottom-right */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full opacity-[0.1] dark:opacity-[0.18] blur-[130px] animate-blob-5"
        style={{ background: '#87C6C7', bottom: '-5%', right: '5%' }}
      />
    </div>
  );
}
