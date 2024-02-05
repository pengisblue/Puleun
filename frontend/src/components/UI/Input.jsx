export default function Input({
  type,
  value,
  id,
  onChange,
  extraClasses,
  isRequired,
  min,
  max,
}) {
  return (
    <input
      type={type}
      value={value}
      id={id}
      onChange={onChange}
      className={`mt-2 w-full rounded-lg border-gray-100 text-gray-800 shadow-md
      focus:border-amber-100 focus:ring focus:ring-amber-200 focus:ring-opacity-50
        ${extraClasses}`}
      required={isRequired}
      {...(type === "number" && { min, max })}
    />
  );
}
