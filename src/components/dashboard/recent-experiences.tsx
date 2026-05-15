import RatingStars from "../ui/rating-starts";
import Link from 'next/link'

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
      <h2 className="font-semibold mb-4 text-black">Recent Experiences</h2>

      <div className="space-y-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex justify-between text-gray items-center border-b pb-2"
          >
            <div className="flex flex-row" >
              <p className="flex items-center gap-2 mr-2 font-medium text-blue-600">
                {item.title}
              </p>
              <RatingStars rating={item.rating} />


            </div>
              <p className="text-sm text-gray-500">{item.category}</p>

            <div className="text-sm text-gray-700">
              • {item.date}
            </div>
          </div>
        ))}
      </div>

      <div className="text-right mt-4">
        <Link
          href="/dashboard/products"
          className="inline-flex text-sm items-center rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
          Check Complete History →
        </Link>
      </div>
    </div>
  );
}