import { Scenario } from '@/features/test';
import { Accordion, AccordionControlProps, Box, NavLink, ScrollArea, Text } from '@mantine/core';
import { IconChartArrows, IconSettings } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import ScenarioDropdownMenu from './ScenarioDropdownMenu';

type ScenarioOptionsProps = {
  scenarios: Scenario[];
};

interface CustomAccordionControlProps extends AccordionControlProps {
  scenario: Scenario;
}

function AccordionControl(props: CustomAccordionControlProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Accordion.Control {...props} />
      <ScenarioDropdownMenu scenario={props.scenario} />
    </Box>
  );
}

export default function ScenarioAccordion({ scenarios }: ScenarioOptionsProps) {
  const [scenario, setScenario] = useState<string | null>(null);
  let matches = useMatch('/tests/:testId/config/scenario/:scenarioId/options');
  const navigate = useNavigate();

  return (
    <ScrollArea.Autosize
      mah="calc(100vh - var(--mantine-header-height, 0px) - 114px)"
      style={{ flexGrow: 1 }}
      scrollbarSize={8}
      scrollHideDelay={100}>
      <Accordion
        chevronPosition="left"
        chevronSize={14}
        mx="auto"
        variant="contained"
        value={scenario}
        styles={{
          content: {
            padding: 0
          }
        }}
        onChange={(value) => {
          if (!value) {
            return;
          }
          setScenario(value);
          navigate(`scenario/${value}`);
        }}>
        {scenarios.map((s) => {
          return (
            <Accordion.Item value={s.id} key={s.id}>
              <AccordionControl style={{ padding: `1rem 0.5rem` }} scenario={s}>
                <Text
                  display="block"
                  style={{ whiteSpace: 'nowrap', width: '100px' }}
                  color="dimmed"
                  lineClamp={1}
                  fz="xs"
                  fw="bold">
                  {s.name}
                </Text>
              </AccordionControl>
              <Accordion.Panel>
                <NavLink
                  styles={(theme) => ({
                    root: {
                      '&:hover': {
                        color: theme.colors.limeZest[6],
                        backgroundColor: '#3897e933'
                      },
                      '&[data-active]': {
                        color: theme.colors.spaceCadet[6],
                        backgroundColor: theme.fn.darken(theme.colors.limeZest[6], 0.2)
                      },
                      '&[data-active]:hover': {
                        color: theme.colors.spaceCadet[6],
                        backgroundColor: theme.fn.darken(theme.colors.limeZest[6], 0.1)
                      }
                    }
                  })}
                  label="Options"
                  icon={<IconSettings size={18} stroke={1.5} />}
                  component={Link}
                  variant="filled"
                  active={matches !== null}
                  to={`scenario/${scenario}/options`}
                />
                <NavLink
                  styles={(theme) => ({
                    root: {
                      '&:hover': {
                        color: theme.colors.limeZest[6],
                        backgroundColor: '#3897e933'
                      },
                      '&[data-active]': {
                        color: theme.colors.spaceCadet[6],
                        backgroundColor: theme.fn.darken(theme.colors.limeZest[6], 0.2)
                      },
                      '&[data-active]:hover': {
                        color: theme.colors.spaceCadet[6],
                        backgroundColor: theme.fn.darken(theme.colors.limeZest[6], 0.1)
                      }
                    }
                  })}
                  label="Requests"
                  icon={<IconChartArrows size={18} stroke={1.5} />}
                  component={Link}
                  active={matches === null}
                  variant="filled"
                  to={`scenario/${scenario}`}
                />
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </ScrollArea.Autosize>
  );
}
