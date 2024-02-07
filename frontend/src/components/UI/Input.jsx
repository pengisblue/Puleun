export default function Input({ className, ...props }) {
  return (
    <input
      {...props}
      className={`mt-2 rounded-lg border-gray-100 text-gray-800 shadow-md
      focus:border-amber-100 focus:ring focus:ring-amber-200 focus:ring-opacity-50
        ${className}`}
    />
  );
}
