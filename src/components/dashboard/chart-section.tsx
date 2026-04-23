import { Button } from "../ui/button";

export default function ChartSection() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-4">Evolução da satisfação</h2>

      <div className="h-40 flex items-center justify-center text-gray-400">
        [Gráfico aqui]
      </div>

      <div className="text-right mt-4">
        <Button className="text-blue-600 hover:underline">
          Ver análises completas →
        </Button>
      </div>
    </div>
  );
}