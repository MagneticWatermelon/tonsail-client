import { Flex } from '@mantine/core';
import RequestInput from '../RequestConfig/RequestInput';
import OptionsDetail from './OptionsDetail';
import OptionsSideBar from './OptionsSideBar';

export default function TestConfig() {
  return (
    <Flex justify="flex-start" direction="row" gap={5}>
      <OptionsSideBar />
      <OptionsDetail />
      <RequestInput />
    </Flex>
  );
}
