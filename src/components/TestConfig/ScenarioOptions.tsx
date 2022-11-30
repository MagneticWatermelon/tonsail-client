import { Flex, ScrollArea, Stack, Tabs, Text } from '@mantine/core';
import { useState } from 'react';
import { Scenario } from '../../stores/ScenariosStore';
import OptionsMenu from './OptionsMenu';

type ScenarioOptionsProps = {
  scenarios: Scenario[];
};

export default function ScenarioOptions({ scenarios }: ScenarioOptionsProps) {
  const [activeTab, setActiveTab] = useState<string | null>('0');

  return (
    <ScrollArea.Autosize
      maxHeight="calc(100vh - var(--mantine-header-height, 0px) - 114px)"
      style={{ flexGrow: 1 }}
      scrollbarSize={8}
      scrollHideDelay={100}
    >
      <Flex
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }}
      >
        <Tabs
          value={activeTab}
          onTabChange={setActiveTab}
          orientation="vertical"
          color="indigo.8"
          placement="right"
          styles={{ tabsList: { flexGrow: 1 } }}
        >
          <Tabs.List>
            {scenarios.map((scenario) => {
              return (
                <Tabs.Tab key={scenario.id} my={5} value={scenario.id}>
                  <Text>{scenario.name}</Text>
                </Tabs.Tab>
              );
            })}
          </Tabs.List>
        </Tabs>
        <Stack spacing={0} ml="auto">
          {scenarios.map((s, i) => {
            return <OptionsMenu scenario={s} key={i} />;
          })}
        </Stack>
      </Flex>
    </ScrollArea.Autosize>
  );
}
