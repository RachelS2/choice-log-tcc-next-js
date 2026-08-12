import { LoaderCircle } from "lucide-react";

export default function CatalogLoadingState() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-100 opacity-40" />

        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
          <LoaderCircle className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-neutral-800">
        Loading your items
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-500">
        We are preparing your catalog. This should only take a few
        moments.
      </p>

      <div className="mt-6 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600" />
      </div>
    </div>
  );
}