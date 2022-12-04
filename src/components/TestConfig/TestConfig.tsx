import { Flex } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import ScenariosBar from './ScenariosBar';

export default function TestConfig() {
  return (
    <Flex justify="flex-start" direction="row" gap={5}>
      <ScenariosBar />
      <Outlet />
    </Flex>
  );
}
