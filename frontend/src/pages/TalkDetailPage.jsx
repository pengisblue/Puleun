import { useParams } from "react-router-dom";

export default function TalkDetailPage() {
  const params = useParams()

  return (
    <div>
      <h1>대화 상세</h1>
      {params.talkId}
    </div>
  );
}
