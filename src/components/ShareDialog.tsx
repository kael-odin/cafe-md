'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ShareDialogProps {
  content: string;
  onClose: () => void;
}

export default function ShareDialog({ content, onClose }: ShareDialogProps) {
  const t = useTranslations('share');
  const [expiresIn, setExpiresIn] = useState<'1' | '7' | '30' | 'never'>('7');
  const [isPublic, setIsPublic] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          expiresIn: expiresIn === 'never' ? null : parseInt(expiresIn),
          isPublic,
        }),
      });

      if (!response.ok) throw new Error('Failed to create share');

      const data = await response.json();
      setShareUrl(`${window.location.origin}/s/${data.slug}`);
    } catch (error) {
      console.error('Share error:', error);
      alert(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy error:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {t('title')}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {t('expires')}
            </label>
            <select
              value={expiresIn}
              onChange={(e) => setExpiresIn(e.target.value as any)}
              className="w-full px-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-zinc-100"
            >
              <option value="1">{t('oneDay')}</option>
              <option value="7">{t('sevenDays')}</option>
              <option value="30">{t('thirtyDays')}</option>
              <option value="never">{t('never')}</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={isPublic}
                onChange={() => setIsPublic(true)}
                className="w-4 h-4"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {t('public')}
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={!isPublic}
                onChange={() => setIsPublic(false)}
                className="w-4 h-4"
              />
              <span className="text-sm text-zinc-700 dark:text-zinc-300">
                {t('private')}
              </span>
            </label>
          </div>

          {shareUrl && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded text-sm text-zinc-900 dark:text-zinc-100"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded"
              >
                {copied ? t('copied') : t('copyLink')}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded"
          >
            {t('close')}
          </button>
          <button
            onClick={handleShare}
            disabled={loading}
            className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded"
          >
            {loading ? t('generating') : t('copyLink')}
          </button>
        </div>
      </div>
    </div>
  );
}
