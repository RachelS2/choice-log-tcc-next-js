import Link from 'next/link'

export default function ChartSection() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-black mb-4">Satisfaction Evolution</h2>

      <div className="h-40 flex items-center justify-center text-gray-400">
        [Gráfico aqui]
      </div>

      <div className="text-right mt-4">
          <Link
            href="/dashboard/analytics"
            className="inline-flex text-sm items-center rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            Check Complete Analyses →
          </Link>
      </div>
    </div>
  );
}