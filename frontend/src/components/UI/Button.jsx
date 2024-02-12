export default function Button({ className, isDisabled, children, ...props }) {
  return (
    <button
      className={`rounded-[0.9rem] px-4 py-2 font-semibold ${className}
       disabled:bg-slate-200 disabled:text-slate-500
       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300`
      }
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}
