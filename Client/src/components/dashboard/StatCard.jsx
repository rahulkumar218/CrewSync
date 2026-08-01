function StatCard({ data }) {
  return (
  <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div className="flex justify-between items-start">

      <div>

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: data.bg }}
        >
          <div style={{ color: data.color }}>
            {data.icon}
          </div>
        </div>

        <h4 className="text-gray-500 mt-5 text-sm">
          {data.title}
        </h4>

        <h2 className="text-4xl font-bold mt-2">
          {data.value}
        </h2>

        <p
          className="text-sm mt-3 font-semibold"
          style={{ color: data.color }}
        >
          {data.change}
        </p>

      </div>

      <svg
        width="90"
        height="45"
        viewBox="0 0 90 45"
      >
        <path
          d="M5 30 C20 10,35 38,50 20 S75 12,85 25"
          fill="none"
          stroke={data.color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

    </div>

  </div>
);
}

export default StatCard;