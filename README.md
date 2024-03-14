# DateRangePicker

DateRangePicker is a simple component to get a range of dates, it return start date and end date.

![Captura de Tela 2024-03-13 às 21 17 08](https://github.com/MaiconLeffa/DateRangePicker/assets/41764184/84db1125-1a85-4c20-b4ef-1df0b93f42a1)

```jsx
import { DateRangePicker } from "maicon-leffa-date-range-picker";

export function Demo() {
  function handleChange(dateRange) {
    console.log(dateRange)
  }

  return (
    <div>
      <DateRangePicker onChange={handleChange} />
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

onChange
{
  startAt: Date Object
  endAt:  Date Object,
  type: "custom"
}
 
