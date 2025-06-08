import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Practise    () {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const ref = useRef();

  // Click outside calendar closes it
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date for input display
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  return (
    <div style={{ position: "relative", width: 280 }}>
      {/* Input simulyatsiyasi */}
      <input
        type="text"
        readOnly
        onClick={() => setShowCalendar(!showCalendar)}
        value={`${formatDate(range[0].startDate)} - ${formatDate(range[0].endDate)}`}
        style={{ width: "100%", padding: "8px", cursor: "pointer" }}
      />

      {/* Katta calendar */}
      {showCalendar && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: "40px",
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            editableDateInputs={true}
          />
        </div>
      )}
    </div>
  );
}
