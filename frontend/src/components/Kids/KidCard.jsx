import BaseSimpleCard from "../UI/BaseSimpleCard";
import KidProfileImage from "./KidProfileImage";

export default function KidCard(props) {
  return (
    <BaseSimpleCard className={props.className}>
      <div className="flex h-full items-center flex-col gap-5 p-1">
        <div className="overflow-hidden ring-2 ring-green-500/60 w-full rounded-xl">
          <KidProfileImage imgUrl={props.profile_img_url} />
        </div>
        <span className="text-xl font-semibold">{props.nickname}</span>
      </div>
    </BaseSimpleCard>
  );
}
