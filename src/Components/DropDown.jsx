import React, { useState } from "react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

const DropDown = ({ currentFormat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const formats = ["Comic", "Hardcover", "Trade Paperback", "Digital Comic", "Digest", "Any"];

  const handleFormatClick = (format) => {
    currentFormat(format);
    setIsOpen(false);
  };

  return (
    <div className="relative flex justify-center flex-col items-center w-[220px] h-[50px] rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-600 h-[25px] p-4 w-full flex items-center rounded-lg text-white"
      >
        Select a Comic Format 
        {!isOpen ? (
          <AiOutlineCaretDown className="h-8" />
        ) : (
          <AiOutlineCaretUp className="h-8" />
        )}
      </button>
      {isOpen && (
        <div className="absolute bg-gray-600 top-20 flex flex-col items-start rounded-lg p-2 w-full -my-9">
          {formats.map((item, i) => (
            <div
              key={i}
              className="flex w-full justify-between hover:bg-blue-900 cursor-pointer rounded-r-lg border-l-transparent"
            >
              <button className="text-white" onClick={() => handleFormatClick(item)}>{item}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
