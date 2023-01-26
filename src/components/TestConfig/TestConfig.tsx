import { Button, Flex } from '@mantine/core';
import { useDocumentTitle } from '@mantine/hooks';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTitleActions } from '../../stores/AppTitleStore';
import { Test, useTest, useTestActions } from '../../stores/TestsStore';
import ScenariosBar from './ScenariosBar';

export default function TestConfig() {
  const { setTitle } = useTitleActions();
  const tests = useTest();
  const { addTest, getTest } = useTestActions();
  return (
    <Flex justify="flex-start" direction="row" gap={5}>
      <ScenariosBar />
      <Outlet />
    </Flex>
  );
}
