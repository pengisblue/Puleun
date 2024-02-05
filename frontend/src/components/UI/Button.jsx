export default function Button(props) {
  return (
    <button
      className="rounded-2xl bg-amber-300 px-6 py-3 font-semibold text-slate-800 hover:bg-amber-400
       disabled:bg-slate-200 disabled:text-slate-500"
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
}
