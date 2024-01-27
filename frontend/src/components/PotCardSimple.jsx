import PotCardStyle from "./PotCardSimpleStyle";
import PotProfileImage from "./PotProfileImage";
import UserProfileImage from "./UserProfileImage";

export default function PotSimple({ kidName, kidImgUrl, potName, potImgUrl }) {
  return (
    <PotCardStyle>
      <div className="flex h-full flex-col justify-evenly">
        {/* 화분 사진 */}
        <div className="mx-auto w-full">
          <PotProfileImage imgUrl={potImgUrl} />
        </div>

        {/* 아이 사진 & 화분 이름 */}
        <div className="flex items-center gap-2">
          <div className="basis-1/3 overflow-hidden rounded-full border-2 border-amber-300">
            <UserProfileImage imgUrl={kidImgUrl} />
          </div>
          <div className="basis-3/4">{potName}</div>
        </div>
      </div>
    </PotCardStyle>
  );
}
