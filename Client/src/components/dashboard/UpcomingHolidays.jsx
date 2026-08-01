function UpcomingHolidays() {
  const holidays = [
    { date: "15 Aug", name: "Independence Day" },
    { date: "27 Aug", name: "Janmashtami" },
    { date: "02 Oct", name: "Gandhi Jayanti" },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-5">
        Upcoming Holidays
      </h2>

      {holidays.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-3 border-b last:border-none"
        >
          <p className="font-medium">{item.name}</p>
          <span className="text-violet-600 font-semibold">
            {item.date}
          </span>
        </div>
      ))}
    </div>
  );
}

export default UpcomingHolidays;