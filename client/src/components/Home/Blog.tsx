import React, { memo } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, CaretRight, Comments, Tags } from "../../icons/icons";
import { Blogs } from "./BlogLists";

const Blog = (blog: Blogs) => {
  return (
    <div>
      <div>
        <Link to={blog.href} className="block">
          <img src={blog.img.src} alt={blog.img.alt} loading="lazy" />
        </Link>
      </div>
      <div className="mt-2.5">
        <p className="text-zinc-400 text-xs flex items-center mb-2">
          <CalendarCheck className="w-4 h-4 mr-1 inline-block" />
          {blog.date}
        </p>
        <h3 className="mb-2.5 text-base font-roboto font-medium uppercase hover:text-red-700 line-clamp-1">
          <Link to={blog.href}>{blog.title}</Link>
        </h3>
        <p className="text-zinc-400 text-sx flex items-center mb-2.5">
          <Comments className="w-3.5 h-3.5 mr-1" />
          {blog.comment} bình luận
          <Link to="/tin-tuc" className="ml-3.5 flex items-center">
            <Tags className="w-3.5 h-3.5 mr-1" />
            {blog.tag}
          </Link>
        </p>
        <Link
          to={blog.href}
          title="Đọc tiếp"
          className="border-t border-t-zinc-200 text-red-700 flex items-center pt-1 hover:underline"
        >
          <CaretRight className="w-3 h-3 mr-1.5" />
          Đọc tiếp
        </Link>
      </div>
    </div>
  );
};

export default memo(Blog);
