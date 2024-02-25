import React from "react";

const PrintFinalValues: React.FC<{ finalValue: string; subText: string }> = ({
  finalValue,
  subText,
}) => {
  return (
    <p className="text-[#864cff] italic font-bold text-5xl md:text-6xl pb-3">
      {finalValue}
      <span className="text-black italic font-medium ml-2">{subText}</span>
    </p>
  );
};

export default PrintFinalValues;
