import React, { useState, Fragment, FC } from "react";
import DayPicker from "react-day-picker";
import moment from "moment";
import { Dialog, Transition } from "@headlessui/react";

const birthdayStyle = `
.DayPicker-Day--selected{
  background-color: orange !important;
  color: white;
  border-radius: 0;
  opacity: 0.5;
}
.DayPicker-Day--hover1{
  background-color: black !important;
  color: white;
  border-radius: 0;
  opacity: 0.5;
}
`;

//Localization

const WEEKDAYS_LONG = [
  "Pazar",
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
];

const MONTHS = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const WEEKDAYS_SHORT = ["P", "Pzt", "S", "Ç", "P", "C", "Cmt"];

//Localization ends

interface ISelectDisable {
  selected: boolean | undefined;
  disabled: boolean | undefined;
}
interface IDatePicker {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  lengthOfRent: number;
  dateError: boolean;
}

const DatePicker: FC<IDatePicker> = ({
  date,
  setDate,
  lengthOfRent,
  dateError,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [hover, setHover] = useState<Date[] | undefined>(undefined);
  const handleDayClick = (
    day: Date,
    { selected, disabled }: ISelectDisable
  ) => {
    if (disabled) {
      return;
    }
    //TODO:
    // if (selected) {
    //   setDate(undefined);
    //   return;
    // }
    setDate(day);
    //TODO: mobilde kapanmayan halini yap
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleDayEnter = (z: Date, { selected, disabled }: ISelectDisable) => {
    // console.log(moment(z).toDate());

    if (disabled) {
      setHover(undefined);
      return;
    }

    if (lengthOfRent === 4) {
      setHover([
        moment(z).toDate(),
        moment(z).add(1, "days").toDate(),
        moment(z).add(2, "days").toDate(),
        moment(z).add(3, "days").toDate(),
      ]);
    } else {
      setHover([
        moment(z).toDate(),
        moment(z).add(1, "days").toDate(),
        moment(z).add(2, "days").toDate(),
        moment(z).add(3, "days").toDate(),
        moment(z).add(4, "days").toDate(),
        moment(z).add(5, "days").toDate(),
        moment(z).add(6, "days").toDate(),
        moment(z).add(7, "days").toDate(),
      ]);
    }
  };

  const handleLeave = () => {
    setHover(undefined);
  };
  const selectedDateCalculator = () => {
    const days = [date];

    if (days === undefined) {
      return undefined;
    }

    for (let i = 1; i < lengthOfRent; i += 1) {
      if (date === undefined) {
        return;
      }
      days.push(moment(date).add(i, "days").toDate());
    }

    return days;
  };

  const dataDate = selectedDateCalculator();

  // const modifiersStyles = {
  //   hover1: {
  //     backgroundColor: "#333333",
  //   },
  // };
  // const modifiers = {
  //   thursdays: { daysOfWeek: [4] },
  //   birthday: new Date(2022, 2, 15),
  //   selectedRange: [new Date(2022, 2, 5)],
  // };

  const modifiers = {
    hover1: hover,
  };
  moment.locale("tr");
  moment.updateLocale("tr", {
    months: MONTHS,
    weekdays: WEEKDAYS_LONG,
  });
  //TODO: https://react-day-picker.js.org/examples/elements-navbar custom button

  return (
    <div className="flex flex-col">
      <div className=" inset-0 flex  items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className={`${
            dateError && date === undefined
              ? "border border-red-600 text-red-600"
              : ""
          } px-2 py-2 h-10 w-52 flex justify-between items-center text-sm font-medium border border-gray-700 text-black bg-white   hover:bg-gray-100 `}
        >
          <span>
            {dataDate === undefined
              ? "Tarih seçin"
              : lengthOfRent === 4
              ? ` ${moment(dataDate?.[0]).lang("tr").format("DD MMMM")} -
          ${moment(dataDate?.[0]).add(3, "days").lang("tr").format("LL")}`
              : ` ${moment(dataDate?.[0]).lang("tr").format("DD MMMM")} -
          ${moment(dataDate?.[0]).add(7, "days").lang("tr").format("LL")}`}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 self-center"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
      <div className="w-full"></div>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block   w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-center text-gray-900"
                  >
                    Kiralama İçin tarih seçin
                  </Dialog.Title>
                  <div className="mt-2  w-fit">
                    <div>
                      <style>{birthdayStyle}</style>
                      <DayPicker
                        todayButton="Bugüne geri dön"
                        fromMonth={new Date(moment().format("YYYY,MM"))}
                        toMonth={
                          new Date(moment().add(6, "months").format("YYYY,MM"))
                        }
                        onTodayButtonClick={(day, modifiers) =>
                          console.log(day, modifiers)
                        }
                        disabledDays={[
                          { before: moment().toDate() },
                          { daysOfWeek: [0] },
                        ]}
                        showOutsideDays
                        locale="tr"
                        months={MONTHS}
                        weekdaysLong={WEEKDAYS_LONG}
                        weekdaysShort={WEEKDAYS_SHORT}
                        modifiers={modifiers}
                        onDayMouseLeave={handleLeave}
                        // modifiersStyles={modifiersStyles}

                        onDayClick={(day, { disabled, selected }) =>
                          handleDayClick(day, { disabled, selected })
                        }
                        selectedDays={selectedDateCalculator()}
                        onDayMouseEnter={(z, { disabled, selected }) =>
                          handleDayEnter(z, { disabled, selected })
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      geri dön
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        {/* <div>
          <style>{birthdayStyle}</style>
          <DayPicker
            todayButton="Bugüne geri dön"
            fromMonth={new Date(moment().format("YYYY,MM"))}
            toMonth={new Date(moment().add(6, "months").format("YYYY,MM"))}
            onTodayButtonClick={(day, modifiers) => console.log(day, modifiers)}
            disabledDays={[{ before: moment().toDate() }, { daysOfWeek: [0] }]}
            showOutsideDays
            locale="tr"
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            modifiers={modifiers}
            onDayMouseLeave={handleLeave}
            // modifiersStyles={modifiersStyles}

            onDayClick={(day, { disabled, selected }) =>
              handleDayClick(day, { disabled, selected })
            }
            selectedDays={selectedDateCalculator()}
            onDayMouseEnter={(z, { disabled, selected }) =>
              handleDayEnter(z, { disabled, selected })
            }
          />
        </div> */}
      </div>
    </div>
  );
};

export default DatePicker;
