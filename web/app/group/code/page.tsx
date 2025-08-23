"use client";
import { ReactEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
function CodePad({ code, setCode }: { code: string[]; setCode: (code: string[]) => void }) {


  const handleChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.key;
    const index = code.findIndex((char) => char === "");
     const newCode = [...code];
    if(event.key === 'Backspace' && (index > 0 || index === -1)) {
      newCode[index === -1 ? 5 : index -1] = "";
      setCode(newCode);
      return;
    }
    if(index === -1) return; // 모든 칸이 채워져 있으면 무시

    newCode[index] = value.at(-1) || ""; // 마지막 문자만 사용
    setCode(newCode);
  };


  return (
    <div className="flex gap-2 justify-evenly">
      {code.map((char, idx) => (
        <input
          key={idx}
          type="number"
          inputMode="numeric"
          name={`code-${idx}`}
          value={char}
          onChange={() => {}}
          onKeyUp={(e) => handleChange(e)}
          className="text-center w-13 h-16 flex-1 block text-2xl font-bold rounded-xl p-4 bg-[#3A3A3C] text-white text-[28px]"
        />
      ))}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
    const [code, setCode] = useState(Array(6).fill(""));
  return (
    <div className="max-w-screen min-h-screen bg-black flex flex-col px-2">
      {/* Header */}
      <header className="flex items-center p-4">
        <button className="text-white text-2xl">&lt;</button>
        <h1 className="flex-1 text-center text-white font-semibold text-lg">
          초대 코드 입력
        </h1>
      </header>

      {/* Content */}
      <div className="flex flex-col flex-1 mt-8">
        <p className="text-white text-lg font-bold">초대 코드를 입력해주세요.</p>
        <div className="mt-16 w-full">
          <CodePad
            code={code}
            setCode={setCode}
          />
        </div>
      </div>
      {/* Footer */}
     <button className="w-full bg-[#32FF76] rounded-xl mt-auto" onClick={() => router.push(`/group/code/${code.join('')}`)}>
          <div className="text-[18px] py-3 text-black font-bold">초대 코드 입력하기</div>
        </button>
    </div>
  );
}
