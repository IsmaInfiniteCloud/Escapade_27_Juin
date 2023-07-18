// DatePickerComponent.js

import DatePicker from "react-datepicker";

function DatePickerModal({ datesBloquees }) {
  const highlightWithRanges = datesBloquees ? [
    {
      "react-datepicker__day--highlighted-custom-1": datesBloquees,
    },
  ] : [];

  return (
    <>
      <h3>Disponibilités</h3>
      <DatePicker
        inline
        locale="fr"
        selected={null}
        monthsShown={3}
        highlightDates={highlightWithRanges}
        excludeDates={datesBloquees}
        onChangeRaw={(e) => e.preventDefault()}
      />
    </>
  );
}

export default DatePickerModal;
