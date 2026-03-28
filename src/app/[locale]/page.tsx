import { Suspense } from 'react';
import HomeClient from './HomeClient';

export function generateStaticParams() {
  return [
    { locale: 'zh-CN' },
    { locale: 'en-US' },
  ];
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-zinc-500">Loading...</div>
      </div>
    }>
      <HomeClient />
    </Suspense>
  );
}
