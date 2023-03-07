import React, { memo } from "react";

interface AddressShowroom {
  address: string;
  detailedAddress: string;
}

interface ShowroomProps {
  titleShowroom: string;
  addressShowroom: AddressShowroom[];
}

const Showroom = ({ titleShowroom, addressShowroom }: ShowroomProps) => {
  return (
    <div className="mb-7">
      <h2 className="bg-amber-500 text-white pl-5 uppercase relative py-3 text-xl">
        {titleShowroom}
      </h2>
      <ul className="h-60 px-5 font-timesNewRoman text-base overflow-y-auto bg-white">
        {addressShowroom.map((value, i) => {
          return (
            <li key={i} className="mb-4 text-base">
              <strong>
                {i + 1}. {value.address}:
              </strong>{" "}
              <a
                className="hover:underline hover:text-red-700 font-medium transition-all ease-in-out duration-150 focus:text-blue-900 focus:underline"
                href="https://www.google.com/maps/"
                target={"_blank"}
                rel="noreferrer"
              >
                {value.detailedAddress}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(Showroom);
