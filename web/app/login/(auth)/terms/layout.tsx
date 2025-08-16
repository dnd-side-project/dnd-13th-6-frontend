import DefaultLayout from '@/components/common/DefaultLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  // 예: 조건에 따라 header 숨기기
  const showHeader = true;
  const title = undefined;

  return (
    <DefaultLayout showHeader={showHeader} title={title} backHref="/login">
      {children}
    </DefaultLayout>
  );
}
