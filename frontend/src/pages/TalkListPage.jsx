import cog from "../asset/cog-8-tooth.svg";

export default function TalkListPage() {
  return (
    <div className="m-2 flex items-center justify-between">
      <h1>우리 대화</h1>
      <img src={cog} alt="cog" className="w-7 cursor-pointer" />
    </div>
  )
}