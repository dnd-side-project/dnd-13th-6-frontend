'use client';
import { useRef, useState } from 'react';
import { API_END_POINT, MODULE } from '@/utils/apis/api';
import api from '@/utils/apis/customAxios';
import { postMessageToApp } from '@/utils/apis/postMessageToApp';

function CodePad({
  code,
  setCode
}: {
  code: string[];
  setCode: (code: string[]) => void;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  // 안드로이드/iOS 공통: 입력 필터링 및 자동 포커스 이동 (영문+숫자 허용, 대문자 변환)
  const handleInput = (
    event: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = event.currentTarget;
    const value = target.value;

    // 영문/숫자만 허용하고 대문자로 정규화
    const alphaNumeric = value.replace(/[^0-9a-zA-Z]/g, '');
    const normalized = alphaNumeric.toUpperCase();

    if (value !== normalized) {
      target.value = normalized;
    }
    if (normalized) {
      const newCode = [...code];
      newCode[idx] = normalized.slice(-1);
      setCode(newCode);

      if (idx < 5) {
        inputsRef.current[idx + 1]?.focus();
      }
    }
  };

  // iOS 삭제(backspace) 인식: keydown 대신 beforeinput으로 처리
  const handleBeforeInput = (
    event: React.FormEvent<HTMLInputElement>,
    idx: number
  ) => {
    const nativeEvent = event.nativeEvent as InputEvent;
    if (nativeEvent.inputType === 'deleteContentBackward') {
      const newCode = [...code];
      if (code[idx]) {
        newCode[idx] = '';
        setCode(newCode);
      } else if (idx > 0) {
        newCode[idx - 1] = '';
        setCode(newCode);
        inputsRef.current[idx - 1]?.focus();
      }
    }
  };

  // 붙여넣기(최대 6자, 영문+숫자, 대문자 변환)
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const text = event.clipboardData
      .getData('text')
      .replace(/[^0-9a-zA-Z]/g, '')
      .toUpperCase()
      .slice(0, 6);
    if (!text) return;
    event.preventDefault();
    const arr = Array(6).fill('');
    for (let i = 0; i < text.length; i++) arr[i] = text[i];
    setCode(arr);
    inputsRef.current[Math.min(text.length, 5)]?.focus();
  };

  return (
    <div className="flex justify-evenly gap-2">
      {code.map((char, idx) => (
        <input
          key={idx}
          ref={el => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          inputMode="text"
          pattern="[A-Za-z0-9]*"
          name={`code-${idx}`}
          value={char}
          maxLength={1}
          onInput={e => handleInput(e, idx)}
          onBeforeInput={e => handleBeforeInput(e, idx)}
          onPaste={handlePaste}
          className="block h-16 w-13 flex-1 rounded-xl bg-[#3A3A3C] p-4 text-center text-2xl text-[28px] font-bold text-white [-webkit-appearance:none] focus:ring-2 focus:ring-[#32FF76] focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          placeholder=""
        />
      ))}
    </div>
  );
}

export default function Page() {
  const [code, setCode] = useState(Array(6).fill(''));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.post(API_END_POINT.CREWS.JOIN_CREW(), {
        code: code.join('')
      });
      postMessageToApp(
        MODULE.PUSH,
        JSON.stringify({
          url: `/(tabs)/(group)/running/${code.join('')}`
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-[calc(100vh-60px)] flex-col px-2"
    >
      {/* Content */}
      <div className="mt-8 flex flex-1 flex-col">
        <p className="text-lg font-bold text-white">
          초대 코드를 입력해주세요.
        </p>
        <div className="mt-16 w-full">
          <CodePad code={code} setCode={setCode} />
        </div>
      </div>
      {/* Footer */}
      <button
        type="submit"
        disabled={code.join('').trim().length !== 6}
        className="mt-auto mb-3 w-full self-end rounded-xl bg-[#32FF76] disabled:opacity-20"
      >
        <div className="py-3 text-[18px] font-bold text-black">
          초대 코드 입력하기
        </div>
      </button>
    </form>
  );
}
