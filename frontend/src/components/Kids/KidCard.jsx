import BaseDetailCard from "../UI/BaseDetailCard";
import KidProfileImage from "./KidProfileImage";

export default function KidCard(props) {
  return (
    <BaseDetailCard>
      <div className="flex flex-col gap-1">
        <div className="flex h-full items-center gap-4 font-semibold">
          <div className="basis-2/5 overflow-hidden rounded-xl">
            <KidProfileImage imgUrl={props.profileImgUrl} />
          </div>

          <ul className="text-sm">
            <li>
              <span>{props.nickname}</span>
            </li>
            <li>대화 보기 버튼</li>
          </ul>
        </div>
      </div>
    </BaseDetailCard>
  );
}
