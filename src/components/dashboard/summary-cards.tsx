// components/dashboard/SummaryCards.tsx

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { title: "Experiências", value: "12" },
        { title: "Categoria top", value: "Educação" },
        { title: "Satisfação média", value: "4.2/5" },
        { title: "Decisões positivas", value: "75%" },
      ].map((card, i) => (
        <div key={i} className="bg-white p-4 rounded-2xl shadow">
          <p className="text-gray-500">{card.title}</p>
          <h3 className="text-xl font-semibold">{card.value}</h3>
        </div>
      ))}
    </div>
  );
}