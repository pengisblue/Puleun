import Button from "../components/UI/Button";

// import illustration from "../test/illustration.svg";
import log from "../test/sample_log_icon.svg";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-screen bg-green-50">
      <div className="grid min-h-screen w-screen place-content-center bg-amber-200 bg-opacity-25">
        <div className="mb-20 flex items-center gap-16">
          <img src={log} alt="img" className="w-[36rem]" />
          <div className="me-12 mt-10 flex flex-col items-center justify-center gap-4">
            <h1 className="font-katuri text-9xl text-green-950">푸른</h1>
            <p className="mb-32 font-KCCMurukmuruk text-3xl text-green-800 ">
              아이와 함께 성장하는 화분
            </p>
            <div className="flex gap-8">
              <Button className="w-40 bg-green-300 text-xl font-semibold text-slate-50 hover:bg-green-400">
                로그인
              </Button>
              <Button className="w-40 bg-green-300 text-xl font-semibold text-slate-50 hover:bg-green-400">
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
