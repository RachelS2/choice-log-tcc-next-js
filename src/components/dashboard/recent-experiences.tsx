import RatingStars from "../ui/rating-starts";
import Link from 'next/link'

const data = [
  {
    title: "Marketing Course",
    category: "Education",
    rating: 4,
    date: "20/04/2026",
  },
  {
    title: "Netflix Annual Subscription",
    category: "Leisure",
    rating: 5,
    date: "18/05/2026",
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
            className="grid grid-cols-[1fr_1fr_auto] items-center justify-center gap-4 border-b pb-2"          >
            {/* coluna 1 */}
            <div className="flex items-center gap-2">
              <p className="font-medium text-blue-600">
                {item.title}
              </p>
              <RatingStars rating={item.rating} />
            </div>

            {/* coluna 2 */}
            <p className="text-sm text-center text-gray-500 whitespace-nowrap">
              {item.category}
            </p>

            {/* coluna 3 */}
            <p className="text-sm text-gray-500">
              • {item.date}
            </p>
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