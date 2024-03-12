import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from ".";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  argTypes: {},
  decorators: []
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Primary: Story = {
  args: {}
};
