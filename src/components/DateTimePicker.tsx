import { HOLYDAYS_API_URL } from "@/utils/const";
import { icons } from "@/utils/icons";
import { parseLocalDate } from "@/utils/utils";
import { enGB } from "date-fns/locale";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  labelDate?: string;
  labelTime?: string;
  dateValue: Date | null;
  onChangeDate: (date: Date | null) => void;
  timeValue: string | null;
  onChangeTime: (time: string | null) => void;
}

type Holiday = {
  date: string;
  name: string;
  type: string;
};

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  labelTime,
  labelDate,
  dateValue,
  onChangeDate,
  timeValue,
  onChangeTime,
}) => {
  const [observanceInfo, setObservanceInfo] = useState<string | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const availableTimeSlots: string[] = [
    "12:00",
    "14:00",
    "16:30",
    "18:30",
    "20:00",
  ];

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const resp = await fetch(HOLYDAYS_API_URL, {
          headers: {
            "X-Api-Key": process.env.NEXT_PUBLIC_API_NINJAS_KEY || "",
          },
        });
        const data = await resp.json();
        setHolidays(data);
      } catch (err) {
        console.error("Failed to fetch holidays:", err);
      }
    };
    fetchHolidays();
  }, []);

  const handleChange = (date: Date | null) => {
    onChangeDate(date);
    if (date) {
      const holiday = holidays.find(
        (h) =>
          h.type === "OBSERVANCE" && isSameDay(date, parseLocalDate(h.date))
      );
      setObservanceInfo(holiday ? `It is ${holiday.name} Day` : null);
    } else {
      setObservanceInfo(null);
    }
  };

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isBlocked = (date: Date) => {
    const isSunday = date.getDay() === 0;
    const holiday = holidays.find((h) =>
      isSameDay(date, parseLocalDate(h.date))
    );
    return isSunday || holiday?.type === "NATIONAL_HOLIDAY";
  };

  return (
    <div className={`flex gap-6 flex-col md:flex-row`}>
      <div className="w-full md:w-auto">
        {labelDate && <label className={`block text-base`}>{labelDate}</label>}
        <div className="tw-datepicker w-full">
          <div className="w-full">
            <DatePicker
              selected={dateValue}
              onChange={handleChange}
              locale={enGB}
              inline
              filterDate={(date) => !isBlocked(date)}
              dayClassName={(date) => {
                const holiday = holidays.find((h) =>
                  isSameDay(date, parseLocalDate(h.date))
                );
                const isSunday = date.getDay() === 0;
                const isSelected = dateValue && isSameDay(date, dateValue);

                if (isSunday || holiday?.type === "NATIONAL_HOLIDAY") {
                  return "cursor-not-allowed";
                }
                if (isSelected) {
                  return `!bg-purple!text-white !rounded-full`;
                }
                return `rounded-full`;
              }}
              // Dodaj custom wrapperClassName, aby wymusić szerokość na mobile
              calendarClassName="!w-full"
            />
          </div>
        </div>

        {observanceInfo && (
          <div className={`pt-2 text-sm flex`}>
            {icons.info}
            <span className={`pl-1 pt-1`}>{observanceInfo}</span>
          </div>
        )}
      </div>

      {dateValue !== null && observanceInfo === null && (
        <div
          className={`flex flex-row flex-wrap gap-2 w-full md:flex-col md:w-auto`}
        >
          {labelTime && (
            <label className={`block text-base w-full md:w-auto`}>
              {labelTime}
            </label>
          )}
          {availableTimeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChangeTime(t)}
              className={`px-3 py-1 rounded-md bg-white border ${
                timeValue === t ? `border-2 border-purple` : `border-secondary`
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
