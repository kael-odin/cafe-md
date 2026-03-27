'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface GuideModalProps {
  onClose: () => void;
}

export default function GuideModal({ onClose }: GuideModalProps) {
  const t = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: '✍️',
      title: t('guide.editorTitle'),
      description: t('guide.editorDesc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🧠',
      title: t('guide.mindmapTitle'),
      description: t('guide.mindmapDesc'),
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📄',
      title: t('guide.exportTitle'),
      description: t('guide.exportDesc'),
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: '🔗',
      title: t('guide.shareTitle'),
      description: t('guide.shareDesc'),
      color: 'from-orange-500 to-red-500',
    },
  ];

  const handleNext = () => {
    if (currentStep < features.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('guide.welcome')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t('guide.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${
                  index === currentStep
                    ? 'opacity-100 transform translate-x-0'
                    : 'opacity-30 transform -translate-x-4'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-blue-500 w-6'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              >
                {t('guide.skip')}
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                {currentStep === features.length - 1
                  ? t('guide.start')
                  : t('guide.next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
