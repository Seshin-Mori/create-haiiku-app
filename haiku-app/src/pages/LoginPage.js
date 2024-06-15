import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../utils/auth";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signIn(username, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-bold mb-4'>ログイン</h2>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <input
          type='text'
          placeholder='ユーザー名'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='w-full mb-4 p-2 border'
        />
        <input
          type='password'
          placeholder='パスワード'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full mb-4 p-2 border'
        />
        <button
          onClick={handleLogin}
          className='w-full bg-blue-500 text-white p-2 rounded'
        >
          ログイン
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
