'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Routes } from '@/utils/constants/routes';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(Routes.ALL_REQUESTS);
  }, []);

  return null;
};

export default Page;
