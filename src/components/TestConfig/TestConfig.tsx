import { Flex } from '@mantine/core';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTitleActions } from '../../stores/AppTitleStore';
import ScenariosBar from './ScenariosBar';

export default function TestConfig() {
  const { setTitle } = useTitleActions();
  useEffect(() => {
    setTitle('Test Configuration');
  }, []);
  return (
    <Flex justify="flex-start" direction="row" gap={5}>
      <ScenariosBar />
      <Outlet />
    </Flex>
  );
}
