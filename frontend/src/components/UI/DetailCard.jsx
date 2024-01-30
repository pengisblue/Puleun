export default function PotCardDetailStyle(props) {
  return (
    <div
      className="m-4 aspect-[16/9] w-80  rounded-xl bg-amber-50 py-3 px-4
      ring-2 ring-amber-200 ring-offset-1 ring-offset-amber-100 drop-shadow-lg"
    >
      {props.children}
    </div>
  );
}
