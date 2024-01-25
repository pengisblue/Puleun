export default function PotSimple({
  kidName, kidImgUrl, potName, potImgUrl
}) {
  return (
    <div>
      <img src={potImgUrl} alt="plantImg" />
      <img src={kidImgUrl} alt="KidImg" />
    </div>
  )
}