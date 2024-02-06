
// login 페이지
// 로그인 - 이메일, pw


import { useState } from "react";
import axios from "axios";


export default function Login() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(userEmail);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(useState);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userEmail, userPassword);

    // 로컬스토리지에 key, value 저장
    axios.post("https://i10e101.p.ssafy.io/v1/user-login"
      ,{
          user_email : userEmail,
          user_password : userPassword
      }
      )
      .then(res => {
          console.log(res.data)
          localStorage.clear()
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('token', res.data.token)
          window.location.replace('https://i10e101.p.ssafy.io')
      })
      .catch((err) => {
          console.log(err)
          // setErrorMessage(false)
      })
  }

  return (
    <div>
      <h1 className="mx-2 my-4 text-title">로그인</h1>

      <form onSubmit={handleSubmit}>
        {/* 로그인 */}
        <section>
          {/* 입력폼 */}
          <p><label for="user-email">USER EMAIL</label></p>
          <input 
            type="email" 
            id="user-email"
            placeholder="email@google.com"
            value={userEmail}
            onChange={handleEmail}
          />
        </section>
        <section>
          <p><label for="user-password">PASSWORD</label></p>
          <input 
            type="password" 
            id="user-password"
            value={userPassword}
            onChange={handlePassword}
          />
        </section>
        <section>
          <p><button type="submit">로그인</button></p>
          <p><button>카카오 로그인</button></p>
        </section>
        <section>
          <p><button>비밀번호 찾기</button></p>
          <p><button>회원가입</button></p>
        </section>
      </form>
      
    </div>
  );
}