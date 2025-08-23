'use client';
import React from 'react';
import Link from 'next/link';
import { CaretLeft } from '@phosphor-icons/react';
import { useAtom } from 'jotai';
import { headerSaveActionAtom } from '@/store/header';

interface HeaderProps {
  title?: string;
  backHref?: string;
}

function Header({ title, backHref }: HeaderProps) {
  const [saveAction] = useAtom(headerSaveActionAtom);

  return (
    <header className="fixed top-0 z-10 flex h-14 w-full max-w-md items-center justify-between bg-gray-800 px-4">
      <div>
        {backHref && (
          <Link href={backHref}>
            <CaretLeft size={24} />
          </Link>
        )}
      </div>
      <h1 className="font-pretendard text-lg font-semibold">{title}</h1>
      <div>
        {saveAction ? (
          <button
            onClick={saveAction}
            className="font-pretendard text-lg font-semibold"
          >
            저장
          </button>
        ) : (
          <div className="w-6" /> // 공간 확보용
        )}
      </div>
    </header>
  );
}

export default Header;
