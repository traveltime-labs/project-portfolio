"use client";

import {useLogin} from "@/hooks/auth/login";

// 後台登入頁面內容
const Content = () => {
    const { account, setAccount, password, setPassword, error, setError, onSubmit } = useLogin();
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[320px] space-y-4 border p-6 rounded-lg">
          <h1 className="text-xl font-bold">backend</h1>
  
          <input
            className="w-full border p-2 rounded"
            placeholder="帳號"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
  
          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
  
          <button
            onClick={onSubmit}
            className="w-full bg-black text-white p-2 rounded"
          >
            登入
          </button>
        </div>
      </div>
    );
};

export default Content;
