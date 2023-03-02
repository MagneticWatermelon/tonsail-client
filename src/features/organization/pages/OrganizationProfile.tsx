import { useTitleActions } from '@/stores/AppTitleStore';
import { Center, Tabs } from '@mantine/core';
import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { GeneralSettings } from '../components/GeneralSettings';
import { Organization } from '../types';

export function OrganizationProfile() {
  const org = useLoaderData() as Organization;
  const { setTitle } = useTitleActions();

  useEffect(() => {
    setTitle('Organization Settings');
  }, []);

  return (
    <Tabs defaultValue="general" orientation="horizontal">
      <Tabs.List grow>
        <Tabs.Tab value="general">General</Tabs.Tab>
        <Tabs.Tab value="users">Users</Tabs.Tab>
        <Tabs.Tab value="teams">Teams</Tabs.Tab>
        <Tabs.Tab value="usage">Usage</Tabs.Tab>
        <Tabs.Tab value="billing">Invoices</Tabs.Tab>
      </Tabs.List>

      <Center pt="lg">
        <Tabs.Panel
          style={{
            maxWidth: '100%',
            width: 'clamp(30%, 600px, 100%)'
          }}
          value="general">
          <GeneralSettings org={org} />
        </Tabs.Panel>
        <Tabs.Panel value="users">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="teams">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="usage">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="billing">Settings tab content</Tabs.Panel>
      </Center>
    </Tabs>
  );
}
