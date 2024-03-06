import type { Meta, StoryObj } from "@storybook/react";
import { RangeDatePicker } from ".";

const meta: Meta<typeof RangeDatePicker> = {
  title: "Components/RangeDatePicker",
  component: RangeDatePicker,
  tags: ["autodocs"],
  argTypes: {},
  decorators: []
};

export default meta;
type Story = StoryObj<typeof RangeDatePicker>;

export const Primary: Story = {
  args: {}
};
