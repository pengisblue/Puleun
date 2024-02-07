import illustration from "../asset/illustration.svg";
import Button from "../components/UI/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen bg-green-50">
      <div className="grid min-h-screen w-screen place-content-center bg-amber-200 bg-opacity-25">
        <div className="flex gap-12 mb-20">
          <img src={illustration} alt="img" className="w-[36rem]" />
          <div className="flex flex-col items-center justify-center gap-4 me-12">
            <h1 className="font-katuri text-9xl text-green-950">푸른</h1>
            <p className="font-KCCMurukmuruk text-3xl text-green-800 mb-32 ">
              아이와 함께 성장하는 화분
            </p>
            <div className="flex gap-8">
              <Button className="bg-green-300 hover:bg-green-400 text-slate-50 font-semibold text-xl w-40">로그인</Button>
              <Button className="bg-green-300 hover:bg-green-400 text-slate-50 font-semibold text-xl w-40">회원가입</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
