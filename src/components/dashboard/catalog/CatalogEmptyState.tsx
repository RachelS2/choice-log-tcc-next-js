import { Package, Plus } from 'lucide-react';

export default function CatalogEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 mb-5">
        <Package className="h-8 w-8  text-blue-600" />
      </div>
      <h3 className="tracking-tight text-lg font-bold text-blue-600">
        Nenhum item registrado ainda.
      </h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-500 leading-relaxed">
        Comece a construir seu catálogo pessoal registrando seu primeiro produto ou serviço.
      </p>

    </div>
  );
}