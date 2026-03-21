"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#0a0e1a] text-white">
        <div className="text-center px-4">
          <div className="text-6xl font-bold text-[#FFD700] mb-4">Oops</div>
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-gray-400 mb-6 max-w-md">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
          <button
            onClick={reset}
            className="rounded-xl bg-[#FFD700] px-6 py-3 text-sm font-bold text-[#00205B] hover:bg-[#FFD700]/90"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
