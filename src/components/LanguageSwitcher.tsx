'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    const currentPath = pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(zh-CN|en-US)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={locale}
        onChange={(e) => handleChange(e.target.value)}
        className="px-3 py-1.5 text-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="zh-CN">{t('zh-CN')}</option>
        <option value="en-US">{t('en-US')}</option>
      </select>
    </div>
  );
}
