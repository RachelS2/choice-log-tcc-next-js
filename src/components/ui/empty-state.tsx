import { cn } from "@/lib/utils";
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  mainTitle?: string;
  description?: string;
  className?: string;
}

export default function EmptyDataState({
  mainTitle = "Ainda não há itens cadastrados.",
  description = "Comece a construir seu catálogo pessoal registrando seu primeiro produto ou serviço.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl text-center ",
        className
      )}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-900 ">
        <PackageOpen className="h-8 w-8 text-white" />
      </div>

      <h3 className="text-xl font-bold tracking-tight text-blue-900">
        {mainTitle}
      </h3>

      <p className="mt-2 max-w-sm text-lg leading-relaxed text-neutral-500">
        {description}
      </p>
    </div>
  );
}

