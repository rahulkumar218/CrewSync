function Button({ text, type = "button" }) {
  return (
    <button
      type={type}
      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6D5BFF] to-[#4F46E5] text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
    >
      {text}
    </button>
  );
}

export default Button;