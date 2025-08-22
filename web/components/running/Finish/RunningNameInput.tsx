'use client';
import React, { useEffect, useState } from 'react';
import { PencilLine } from 'lucide-react';

function RunningNameInput() {
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setName(
      new Date().toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }) + ' 러닝'
    );
  }, []);

  const handleSave = () => {
    setEditing(false);
    if (!name.trim()) {
      setName('이름 없음');
    }
  };

  return (
    <div className="flex mb-3 items-center">
      {editing ? (
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onBlur={handleSave}
          onKeyDown={e => {
            if (e.key === 'Enter') handleSave();
          }}
          autoFocus
          className="bg-transparent border-b border-gray-40 text-lg text-white outline-none max-w-[200px]"
        />
      ) : (
        <>
          <div className="max-w-[200px]">
            <p className="text-lg text-gray-40 truncate">{name}</p>
          </div>
          <PencilLine
            className="w-5 h-5 ml-2 text-gray-40 cursor-pointer"
            onClick={() => setEditing(true)}
          />
        </>
      )}
    </div>
  );
}

export default RunningNameInput;
