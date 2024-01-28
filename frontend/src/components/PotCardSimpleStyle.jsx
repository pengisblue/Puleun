export default function PotCardStyle(props) {
  return (
    <div
      className="mx-3 my-4 aspect-[3/4] w-36 rounded-lg bg-emerald-100 px-4 py-2
      ring ring-emerald-300 ring-offset-1 ring-offset-emerald-200 drop-shadow-lg"
    >
      {props.children}
    </div>
  );
}
