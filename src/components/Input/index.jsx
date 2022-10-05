const Input = ({ label, name, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-bold text-gray-500 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        name={name}
        id={name}
        className="p-3 border border-gray-700 rounded-xl focus:outline focus:outline-1 focus:border-red-500"
      />
    </div>
  );
};

export default Input