# DateRangePicker

DateRangePicker is a simple component to get a range of dates, it return start date and end date.

```jsx
import { RangeDatePicker } from "maicon-leffa-date-range-picker";

export function Demo() {
  function handleChange(dateRange) {
    console.log(dateRange)
  }

  return (
    <div>
      <RangeDatePicker onChange={handleChange} />
    </div>
  );
};

