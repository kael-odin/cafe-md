import HomeClient from './HomeClient';

export function generateStaticParams() {
  return [
    { locale: 'zh-CN' },
    { locale: 'en-US' },
  ];
}

export default function Home() {
  return <HomeClient />;
}
