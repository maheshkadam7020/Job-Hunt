import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { MapPin, Briefcase, IndianRupee, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const filterData = [
    {
      filterType: "Location",
      icon: <MapPin size={16} />,
      array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
      filterType: "Industry",
      icon: <Briefcase size={16} />,
      array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
    },
    {
      filterType: "Salary (In LPA)",
      icon: <IndianRupee size={16} />,
      array: [300000, 500000, 700000, 900000],
    },
  ];
  const [selectText, setSelectText] = useState("");
 const changeHandle = (value) => {
  setSelected(value);
  setSelectText(value);
};

const handleClear = () => {
  setSelected("");
  setSelectText("");
};
  useEffect(() => {
    dispatch(setSearchQuery(selectText));
  }, [selectText]);
  return (
    <div className="w-full">
      <div className="bg-white border rounded-2xl shadow-md p-4 md:p-5 md:sticky md:top-20 h-fit">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-800">Filter Jobs</h1>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClear}
              className="text-sm text-blue-500 hover:underline"
            >
              Clear
            </button>

            <button onClick={() => setOpen(!open)} className="md:hidden">
              <ChevronDown
                className={`transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        <hr className="my-4" />

        <div
          className={`
            ${open ? "block" : "hidden"}   /* mobile control */
            md:block                      /* always open on md+ */
          `}
        >
          <div className="max-h-[50vh] md:max-h-[70vh] overflow-y-auto pr-2">
            <RadioGroup value={selected} onValueChange={changeHandle}>
              {filterData.map((item) => (
                <div key={item.filterType} className="mb-5">
                  <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
                    {item.icon}
                    <span>{item.filterType}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {item.array.map((value) => (
                      <label
                        key={value}
                        htmlFor={value}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
                          ${
                            selected === value
                              ? "bg-blue-100 border border-blue-400"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        <RadioGroupItem value={value} id={value} />
                        <span className="text-sm text-gray-700">{value}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
