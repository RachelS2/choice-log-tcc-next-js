
const data = [
  {
    title: "Comprei curso de Marketing",
    category: "Educação",
    rating: 4,
    date: "20/05/2025",
  },
  {
    title: "Assinei plano anual",
    category: "Produtividade",
    rating: 5,
    date: "18/05/2025",
  },
];

export default function RecentExperiences() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-4 text-black">Experiências recentes</h2>

      <div className="space-y-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-gray items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">{item.category}</p>
            </div>

            <div className="text-sm text-gray-500">
              {item.rating}⭐ • {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}