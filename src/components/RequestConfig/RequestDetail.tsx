import { Tabs } from '@mantine/core';

export default function RequestDetails() {
  return (
    <Tabs style={{ flexGrow: '1', padding: "12px" }} color="blue" defaultValue="headers">
      <Tabs.List>
        <Tabs.Tab value="headers">Headers</Tabs.Tab>
        <Tabs.Tab value="params">Query Params</Tabs.Tab>
        <Tabs.Tab value="checks">Checks</Tabs.Tab>
        <Tabs.Tab value="variables">Variables</Tabs.Tab>
        <Tabs.Tab value="body">Body</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="headers" pt="xs">
        Headers
      </Tabs.Panel>
      <Tabs.Panel value="params" pt="xs">
        Params
      </Tabs.Panel>
      <Tabs.Panel value="checks" pt="xs">
        Checks
      </Tabs.Panel>
      <Tabs.Panel value="variables" pt="xs">
        Variables
      </Tabs.Panel>
      <Tabs.Panel value="body" pt="xs">
        Body
      </Tabs.Panel>
    </Tabs>
  );
}
