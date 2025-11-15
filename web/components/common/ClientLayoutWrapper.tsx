'use client';

import { usePathname } from 'next/navigation';
import { routeConfigs } from '@/configs/routeConfig';
import DefaultLayout from '@/components/common/DefaultLayout';
import React, { useEffect } from 'react';
import patchFetch from '@/utils/customFetch';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const config = routeConfigs[pathname];

  useEffect(() => {
    patchFetch();
  }, []);

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