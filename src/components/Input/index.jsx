const Input = ({ label, name, error, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-bold text-gray-500 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        name={name}
        id={name}
        className={`p-3 border border-gray-700 rounded-xl focus:outline 
                    focus:outline-1 focus:border-red-500 ${
                      error ? 'border-red-600' : ''
                    }`}
      />
      <span className="px-2 text-red-600 font-bold">{error}</span>
    </div>
  );
};

export default Input;
