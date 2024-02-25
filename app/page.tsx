"use client";

import { useEffect, useState } from "react";

import InputField from "./components/InputField";
import PrintFinalValues from "./components/PrintFinalValues";

export default function Home() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [dayErr, setDayErr] = useState("");
  const [monthErr, setMonthErr] = useState("");
  const [yearErr, setYearErr] = useState("");
  const [err, setErr] = useState(false);

  const initialState = {
    dayVal: "--",
    monthVal: "--",
    yearVal: "--",
  };

  const [finalDateValues, setFinalDateValues] = useState(initialState);

  const submitDate = () => {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();

    if (
      !day ||
      +day < 1 ||
      +day > 31 ||
      !month ||
      +month < 1 ||
      +month > 12 ||
      !year ||
      +year > currentYear
    ) {
      if (!day) {
        setDayErr("Day is required");
      } else if (+day < 1 || +day > 31) {
        setDayErr("Not valid day");
      }

      if (!month) {
        setMonthErr("Month is required");
      } else if (+month < 1 || +month > 12) {
        setMonthErr("Not valid month");
      }

      if (!year) {
        setYearErr("Year is required");
      } else if (+year < 1 || +year > currentYear) {
        setYearErr("Not valid year");
      }

      setFinalDateValues(initialState);
      setErr(true);
    } else {
      let birthYear = parseInt(year, 10);
      let birthMonth = parseInt(month, 10);
      let birthDay = parseInt(day, 10);

      let diffYears = currentYear - birthYear;
      let diffMonths = currentMonth - birthMonth;
      let diffDays = currentDay - birthDay;

      if (diffMonths < 0 || (diffMonths === 0 && diffDays < 0)) {
        diffYears--;
        diffMonths = diffMonths + 12;
        if (diffDays < 0) {
          diffMonths--;
          diffDays =
            diffDays + new Date(currentYear, currentMonth - 1, 0).getDate();
        }
      }

      setFinalDateValues({
        dayVal: String(diffDays),
        monthVal: String(diffMonths),
        yearVal: String(diffYears),
      });
    }
  };

  const setFormValues = (e: any) => {
    if (e && e.target) {
      if (e.target.name === "day") {
        setErr(false);
        setDayErr("");
        setDay(e.target.value);
      }
      if (e.target.name === "month") {
        setErr(false);
        setMonthErr("");
        setMonth(e.target.value);
      }
      if (e.target.name === "year") {
        setErr(false);
        setYearErr("");
        setYear(e.target.value);
      }
    }
  };

  const handleSubmitOnEnter = (event: any) => {
    if (event.key === "Enter") {
      submitDate();
    }
  };

  return (
    <div className="bg-gray-400 h-screen flex justify-center items-center">
      {/* sm:h-4/5 bg-blue-500 md:bg-red-500 lg:bg-green-500 */}
      <div className="main-box bg-white w-9/12 md:w-6/12 p-6 md:p-10">
        <div className="md:flex md:gap-2">
          <div className="flex gap-4">
            <InputField
              name="day"
              placeholder="DD"
              title={"Day"}
              value={day}
              error={dayErr}
              onChangeFn={setFormValues}
              onHandleSubmit={handleSubmitOnEnter}
            />
            <InputField
              name="month"
              placeholder="MM"
              title={"Month"}
              value={month}
              error={monthErr}
              onChangeFn={setFormValues}
              onHandleSubmit={handleSubmitOnEnter}
            />
            <InputField
              name="year"
              placeholder="YYYY"
              title={"Year"}
              value={year}
              error={yearErr}
              onChangeFn={setFormValues}
              onHandleSubmit={handleSubmitOnEnter}
            />
          </div>

          <div className="flex items-end mt-4 justify-center md:mt-0">
            <button
              className="text-white bg-[#864cff] px-5 py-2 rounded-3xl"
              onClick={submitDate}
            >
              SUBMIT
            </button>
          </div>
        </div>

        <div className="pt-2">
          <PrintFinalValues
            finalValue={
              finalDateValues.yearVal ? finalDateValues.yearVal : "--"
            }
            subText="years"
          />
          <PrintFinalValues
            finalValue={
              finalDateValues.monthVal ? finalDateValues.monthVal : "--"
            }
            subText="months"
          />
          <PrintFinalValues
            finalValue={finalDateValues.dayVal ? finalDateValues.dayVal : "--"}
            subText="days"
          />
        </div>
      </div>
    </div>
  );
}
