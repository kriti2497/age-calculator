import React from "react";

const InputField: React.FC<{
  name: string;
  placeholder: string;
  title: string;
  error: string;
  value: string;
  onChangeFn: any;
  onHandleSubmit: any;
}> = ({
  name,
  placeholder,
  title,
  error,
  value,
  onChangeFn,
  onHandleSubmit,
}) => {
  return (
    <div className="w-4/12">
      <label
        className={`${error ? "text-red-600 text-sm" : "text-black text-sm"}`}
      >
        {title}
      </label>
      <input
        name={name}
        maxLength={name === "year" ? 4 : 2}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeFn}
        onKeyDown={onHandleSubmit}
        className="border-2 w-full h-5 px-4 py-5 font-bold text-black"
      />
      {error && (
        <p className="text-red-600 text-[0.6rem] md:text-xs">{error}</p>
      )}
    </div>
  );
};

export default InputField;
