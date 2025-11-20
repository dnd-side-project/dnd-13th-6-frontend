'use client';

import { usePathname } from 'next/navigation';
import { routeConfigs } from '@/configs/routeConfig';
import DefaultLayout from '@/components/common/DefaultLayout';
import React from 'react';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const config = routeConfigs[pathname];

  return (
    <DefaultLayout
      showHeader={config?.showHeader}
      title={config?.title}
      backHref={config?.backHref}
      showSaveButton={config?.showSaveButton}
    >
      {children}
    </DefaultLayout>
  );
}