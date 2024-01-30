import PotCardSimpleStyle from "./PotCardSimpleStyle";
import PotProfileImage from "./PotProfileImage";
import UserProfileImage from "./UserProfileImage";

export default function PotSimple({ userName, userImgUrl, potName, potImgUrl }) {
  return (
    <PotCardSimpleStyle>
      <div className="flex h-full flex-col justify-evenly">
        {/* 화분 사진 */}
        <div className="mx-auto w-full overflow-hidden rounded-lg">
          <PotProfileImage imgUrl={potImgUrl} />
        </div>

        {/* 아이 사진 & 화분 이름 */}
        <div className="flex items-center gap-2">
          <div className="basis-1/3 overflow-hidden rounded-full border border-amber-500">
            <UserProfileImage imgUrl={userImgUrl} />
          </div>
          <div className="basis-3/4 text-">{potName}</div>
        </div>
      </div>
    </PotCardSimpleStyle>
  );
}
