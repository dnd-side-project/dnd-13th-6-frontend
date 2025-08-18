'use client';
import DefaultLayout from '@/components/common/DefaultLayout';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeader = true;
  const backHrefMap: Record<string, string | undefined> = {
    '/login': undefined,
    '/onboarding/terms': '/login',
    '/onboarding/setup-nickname': '/onboarding/terms',
    '/onboarding/select-character': '/onboarding/setup-nickname',
    '/onboarding/setup-target': '/onboarding/select-character'
  };

  const backHref = backHrefMap[pathname];

  return (
    <DefaultLayout
      showHeader={showHeader}
      title={undefined}
      backHref={backHref}
    >
      {children}
    </DefaultLayout>
  );
}
