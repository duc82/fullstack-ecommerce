import React, { memo } from "react";
import { StarFull, User, Warning } from "../../icons/icons";

const ReviewItem = () => {
  return (
    <li className="border-t border-t-zinc-300 p-4">
      <div className="w-full flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="border rounded-full border-black p-1.5">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="block">Duy</span>
            <div className="flex items-end space-x-4">
              <div className="inline-flex items-center space-x-1">
                <StarFull className="w-4 h-5 text-yellow-500" />
                <StarFull className="w-4 h-5 text-yellow-500" />
                <StarFull className="w-4 h-5 text-yellow-500" />
                <StarFull className="w-4 h-5 text-yellow-500" />
                <StarFull className="w-4 h-5 text-yellow-500" />
              </div>
              <span>19/07/2021</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            const isReportedComment: boolean = confirm(
              "Bạn có chắc chắn muốn báo cáo đánh giá này là một sai phạm?"
            );
            if (isReportedComment) {
              console.log({ userId: "user1", productId: "product1" });
            }
          }}
          className="mt-1"
        >
          <Warning className="h-4 w-4 text-zinc-600 hover:text-red-700 transition-all duration-150 ease-in-out" />
        </button>
      </div>
      <div className="pl-4 pt-1.5">
        <span className="text-zinc-500 font-bold mb-2.5 block">
          Magic ac 110
        </span>
        <p>
          Cho hỏi: khi đang sử dụng chiên có thể bấm dừng đột ngột để kiểm tra
          đồ có bị cháy ko, xong rồi như thế nào nữa vậy shop? Nhờ hướng dẫn.
        </p>
      </div>
    </li>
  );
};

export default memo(ReviewItem);
