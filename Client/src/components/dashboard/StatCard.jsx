function StatCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            {subtitle}
          </p>
        </div>

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>

      </div>

    </div>
  );
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

  {stats.map((item, index) => (
    <StatCard
      key={index}
      title={item.title}
      value={item.value}
      subtitle={item.subtitle}
      color={item.color}
      icon={item.icon}
    />
  ))}

</div>
}

export default StatCard;