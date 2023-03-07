import React, { memo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import requiredSearch from "../../utils/requiredSearch";
import { DoubleDown, DoubleUp } from "../../icons/icons";

interface Items {
  checked: boolean;
  name: string;
  value: string;
}

interface CheckboxGroupProps {
  title: string;
  limit: number;
  items: Items[];
}

const CheckboxGroup = (checkbox: CheckboxGroupProps) => {
  const [, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(checkbox.items);
  const [limit, setLimit] = useState(checkbox.limit);

  const handleCheckbox = (title: CheckboxGroupProps["title"], item: Items) => {
    const newValue = [...value];
    const index = newValue.findIndex((v) => v.name === item.name);
    newValue[index].checked = !newValue[index].checked;
    setValue(newValue);

    const list = value.filter((v) => v.checked);
    const newList = list.map((l) => l.value);

    const listValue = newList.join(".");
    if (!listValue) {
      setSearchParams();
    } else {
      setSearchParams({ price: listValue, ...requiredSearch() });
    }
  };

  const handleSetLimit = () => {
    if (limit === 0) {
      setLimit(checkbox.limit);
    } else {
      setLimit(0);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="font-roboto font-medium text-lg">{checkbox.title}</h2>
      <ul className="pt-1">
        {checkbox.items.map((item, i) => (
          <li
            key={i}
            className={`cursor-pointer leading-6 hover:text-red-700 group ${
              limit === 0 ? "block" : i < limit ? "block" : "hidden"
            }`}
          >
            <label
              htmlFor={item.name}
              className="relative block cursor-pointer mb-0.5"
            >
              <input
                type="checkbox"
                className="hidden"
                id={item.name}
                onChange={() => handleCheckbox(checkbox.title, item)}
              />
              <span
                className={`absolute top-1/2 -translate-y-1/2 left-0 w-5 h-5 border border-zinc-200 rounded ${
                  value[i].checked
                    ? "border-red-700 after:absolute after:content-[''] after:top-[calc(50%-1px)] after:-translate-y-1/2 after:left-1/2 after:-translate-x-1/2 after:border-solid after:border-red-700 after:border-r-2  after:border-b-2 after:rotate-45 after:w-1.5 after:h-2.5"
                    : ""
                }`}
              ></span>
              <p className="ml-7 select-none">
                {item.name}
                <span className="ml-1.5 text-[13px] text-zinc-500 group-hover:text-red-700">
                  (48)
                </span>
              </p>
            </label>
          </li>
        ))}
      </ul>
      <div>
        <button
          className="py-2.5 text-center w-full text-red-700 flex items-center justify-center space-x-1 leading-none"
          onClick={handleSetLimit}
        >
          {limit === 0 ? (
            <>
              <p>Thu gọn</p>
              <DoubleUp className="w-2 h-3.5" />
            </>
          ) : (
            <>
              <p>Xem thêm</p>
              <DoubleDown className="w-2 h-3 5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default memo(CheckboxGroup);
