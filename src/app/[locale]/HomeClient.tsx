'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import dynamic from 'next/dynamic';

const VditorEditor = dynamic(() => import('@/components/VditorEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-zinc-500">Loading editor...</div>
    </div>
  ),
});

export default function HomeClient() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {t('app.title')}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <VditorEditor />
      </main>
    </div>
  );
}
