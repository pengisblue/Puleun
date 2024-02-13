import { useState } from "react";

export default function MessageCreatePage() {
  const [content, setContent] = useState(null);
  const handleContent = (event) => {
    setContent(event.target.value);
    console.log(content);
  };

    return (
        <h1>ss</h1>
    );
}