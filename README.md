# DateRangePicker

DateRangePicker is a simple component to get a range of dates, it return start date and end date.

![Captura de Tela 2024-03-12 às 20 42 24](https://github.com/MaiconLeffa/DateRangePicker/assets/41764184/3c7864ed-bd1d-4a2b-a749-3012e514be37)

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
```

Props
| Props | Default | Description | 
| :---: | :---: |  :---: |
| onChange | - | Event when apply button is pressed |
| disableFuture | false | If true user can not selected dates after today date |
| maxRange | 366 | The amount of days in between two dates that user can select |
| value | null | The current value of the component |
