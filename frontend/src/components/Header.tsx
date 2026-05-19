import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (keyword: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      onSearch(keyword);
    }
  };

  return (
    <header className="w-full px-4 py-4 bg-black sticky top-0 z-50 flex justify-center">
      {/* 💡 Tailwind CDN을 강제로 심어서 엔진이 안 돌아가도 무조건 작동하게 만듭니다 */}
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      
      <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto">
        {/* 🔍 이모지 아이콘으로 교체 (SVG 꼬임 방지) */}
        <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10" style={{ lineHeight: '3rem' }}>
          🔍
        </span>
        
        <input
          type="text"
          placeholder="Search for movies, actors..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-zinc-900 text-black placeholder-zinc-500 rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-700 text-sm"
        />
      </form>
    </header>
  );
}