function BirthdayCard() {
  const birthdays = [
    {
      name: "Priya Sharma",
      role: "HR Executive",
    },
    {
      name: "Rahul Verma",
      role: "UI Designer",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-5">
        Today's Birthdays 🎂
      </h2>

      {birthdays.map((person, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 border-b last:border-none"
        >
          <div>
            <p className="font-semibold">
              {person.name}
            </p>

            <p className="text-sm text-gray-500">
              {person.role}
            </p>
          </div>

          <button className="bg-violet-100 text-violet-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-violet-200">
            Wish
          </button>
        </div>
      ))}
    </div>
  );
}

export default BirthdayCard;