import axios from 'axios';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent } from 'react';

interface componentProps {
  redirectURL: string;
}

export default function LoginForm({ redirectURL }: componentProps) {
  const router = useRouter();

  function login(event: BaseSyntheticEvent) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    axios
      .post('/api/login', { username, password })
      .then(async () => {
        router.push(redirectURL ?? '/');
      })
      .catch(() => {
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.');
      });
  }

  return (
    <form
      onSubmit={login}
      className="w-full h-[250px] flex flex-col space-y-12"
    >
      <div className="w-full h-[158px] space-y-6">
        <div className="w-full flex flex-col items-start space-y-2">
          <label className="text-sm font-bold">아이디</label>
          <input
            name="username"
            type="text"
            placeholder="아이디를 입력해주세요"
            required
            autoFocus
            className="w-full h-10 px-5 border-[1px] border-[#4B4B4B] rounded text-sm"
          />
        </div>
        <div className="w-full flex flex-col items-start space-y-2">
          <label className="text-sm font-bold">비밀번호</label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
            className="w-full h-10 px-5 border-[1px] border-[#4B4B4B] rounded text-sm"
          />
        </div>
      </div>
      <button className="w-full h-11 rounded bg-[#5700FF] text-white font-bold">
        로그인
      </button>
    </form>
  );
}
