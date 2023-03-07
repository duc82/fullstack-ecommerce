import React, { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { bannerVariants } from "../../data/variants";

interface Datas {
  href: string;
  img: {
    src: string;
    alt: string;
  };
}

interface BannerProps {
  datas: Datas[];
}

interface GridColumn {
  [key: string]: string;
}

const gridColumVariants: GridColumn = {};

for (let i = 1; i <= 12; i++) {
  gridColumVariants[i] = `grid-cols-${i}`;
}

const Banner = ({ datas }: BannerProps) => {
  return (
    <section
      className={`mb-7 grid gap-x-8 gap-y-4 ${
        gridColumVariants[datas.length > 12 ? 12 : datas.length]
      } grid-cols`}
    >
      {datas.map((data, i) => (
        <Link key={i} to={data.href} className="relative block">
          <motion.div
            initial="closed"
            whileHover="open"
            className="w-full h-full absolute z-10"
          >
            <motion.div
              variants={bannerVariants}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full w-full absolute inset-0 bg-black/50 bg-rhombus bg-no-repeat bg-scroll bg-center z-10"
            ></motion.div>
          </motion.div>
          <img src={data.img.src} alt={data.img.alt} />
        </Link>
      ))}
    </section>
  );
};

export default memo(Banner);
