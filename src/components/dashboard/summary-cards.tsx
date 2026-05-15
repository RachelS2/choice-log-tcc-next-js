// components/dashboard/SummaryCards.tsx

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        { title: "Experiences", value: "12" },
        { title: "Top Category", value: "Education" },
        { title: "Satisfaction", value: "4.2 / 5" },
        { title: "Positive Decisions", value: "75%" },
      ].map((card, i) => (
        <div key={i} className="bg-white p-4 flex flex-col items-center rounded-2xl shadow">
          <p className="text-black font-semibold">{card.title}</p>
          <h3 className="text-xl text-blue-500 font-semibold">{card.value}</h3>
        </div>
      ))}
    </div>
  );
}