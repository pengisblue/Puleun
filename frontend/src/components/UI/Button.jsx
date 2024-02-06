export default function Button({ className, isDisabled, children }) {
  return (
    <button
      className={`rounded-[0.9rem] px-4 py-2 font-semibold ${className}
       disabled:bg-slate-200 disabled:text-slate-500`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
