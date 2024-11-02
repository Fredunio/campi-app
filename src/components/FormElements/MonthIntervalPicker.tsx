// import MonthPickerButton from "../Buttons/MonthPickerButton/MonthPickerButton";

import MonthPickerButton from "../Buttons/MonthPickerButton/MonthPickerButton";

export default function MonthIntervalPicker({
  idFrom,
  idTo,
}: {
  idFrom: string;
  idTo: string;
}) {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <div className="flex items-center w-full gap-1">
        <span>From</span>
        <MonthPickerButton idName={idFrom} />
      </div>
      <div className="flex items-center gap-1">
        <span>To</span>
        <MonthPickerButton idName={idTo} />
      </div>
      {/* <div className="w-2 h-[3px] rounded-[1px] bg-[var(--ion-text-color-step-100)]" /> */}
    </div>
  );
}
