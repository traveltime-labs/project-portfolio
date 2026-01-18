// 找不到頁面
export default function NotFound() {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black">
        <h1 className="text-4xl font-bold text-white">404</h1>
        <p className="mt-2 text-gray-500">找不到這個頁面</p>
      </div>
    );
}
