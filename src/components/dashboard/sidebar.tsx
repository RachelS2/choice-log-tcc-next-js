// components/dashboard/Sidebar.tsx
import { Button } from "../ui/button";
import AppLogo from "../ui/app-logo";
export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-4">
      <AppLogo />

      <nav className="space-y-2">
        <Button className="text-blue text-[1.2rem] font-medium">
          Home
        </Button>
        <Button className="text-blue text-[1.2rem]">
          Nova Experiência
        </Button>
        <Button className="text-blue text-[1.2rem]">
          Histórico de Consumo
        </Button>
        <Button className="text-blue text-[1.2rem]">
          Relatórios
        </Button>
        <Button className="text-blue text-[1.2rem]">
          Configurações
        </Button>
      </nav>
    </aside>
  );
}