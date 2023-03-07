import React, { memo } from "react";
import { services } from "../../data/Services";

const Service = () => {
  return (
    <section className="grid gap-2.5 md:gap-x-7 md:gap-y-2.5 lg:gap-x-7 md:grid-cols-2 lg:grid-cols-4">
      {services.map((service, i) => (
        <div
          key={i}
          className="h-20 p-4 md:h-auto md:p-6 flex items-center justify-start space-x-3.5 border border-zinc-300 border-solid bg-transparent hover:bg-red-700 hover:border-red-700 transition-all duration-200 group"
        >
          <div className="h-7 md:h-12 flex items-center">
            <service.Icon className="w-7 h-7 text-red-700 group-hover:text-white transition-all duration-200" />
          </div>
          <div className="font-roboto ">
            <h2 className="uppercase transition-all duration-200 text-black text-sm font-bold mb-1.5 group-hover:text-white">
              {service.title}
            </h2>
            <p className="text-zinc-400 text-xs transition-all duration-200 group-hover:text-white">
              {service.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default memo(Service);
