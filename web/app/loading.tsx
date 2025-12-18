export default function Loading() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* 로딩 스피너 */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}
