export default function PotCardDetailStyle(props) {
  return (
    <div
      className="bg-amber-100 m-4 rounded-xl border border-black w-5/6 h-60"
    >
      {props.children}
    </div>
  )
}