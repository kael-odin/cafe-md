import { Metadata } from 'next';
import SharePageClient from './SharePageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Shared Document - ${slug}`,
    description: 'A shared Markdown document',
  };
}

export default async function SharePage({ params }: PageProps) {
  const { slug } = await params;
  return <SharePageClient slug={slug} />;
}
