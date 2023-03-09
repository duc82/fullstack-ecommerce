require("dotenv").config();

const ORIGIN_API =
  process.env.ORIGIN_API || "https://houseware-sern-api.onrender.com";

const products = [
  {
    name: "Nồi chiên không dầu Magic Eco AC-100",
    bonus: "Tặng Bộ thố Hoặc Bộ 6 chén đũa",
    brand: "Magic Eco",
    stock: 50,
    discount: 27,
    price: 2990000,
    model: "AC-100",
    images: [
      `${ORIGIN_API}/images/ac-100-a.webp`,
      `${ORIGIN_API}/images/ac-100-b.webp`,
      `${ORIGIN_API}/images/ac-100.webp`,
    ],
    category: "Nồi chiên không dầu",
    desc: "Magic Eco AC-100: Nồi chiên không khí cho phép bạn thưởng thức đồ chiên không dầu. Bạn yêu thích đồ chiên rán nhưng lại lo lắng cho sức khỏe của mình? Bạn muốn nấu những bữa ăn ngon mà không cần sử dụng dầu hay tạo khói? Sau đó, bạn cần Magic Eco AC-100, nồi chiên không khí sử dụng công nghệ Rapid Air để chiên thực phẩm bằng không khí nóng thay vì dầu. Với Magic Eco AC-100, bạn có thể giảm đến 80% chất béo trong thực phẩm và thưởng thức các món ăn giòn, ngon ngọt mà không cảm thấy ngán. Magic Eco AC-100 có dung tích lớn 4.5 lít, bảng điều khiển màn hình cảm ứng, lòng nồi inox chống dính, nhiều chế độ nấu. Nó cũng có một bộ lọc làm giảm mùi và khói, giúp dễ dàng vệ sinh và bảo trì. Magic Eco AC-100 là sự lựa chọn hoàn hảo cho những ai muốn ăn uống lành mạnh hơn, tiết kiệm thời gian và chi phí nấu nướng. Đặt hàng của bạn ngày hôm nay và khám phá sự kỳ diệu của chiên không khí!",
  },
  {
    name: "Nồi chiên không dầu Magic Eco AC-110",
    brand: "Magic Eco",
    stock: 28,
    discount: 20,
    price: 3990000,
    model: "AC-110",
    images: [
      `${ORIGIN_API}/images/ac-110-2.webp`,
      `${ORIGIN_API}/images/ac-110-1.webp`,
      `${ORIGIN_API}/images/ac-110-3.webp`,
    ],
    category: "Nồi chiên không dầu",
    desc: `Nồi chiên không dầu Magic Eco AC-110 - Chiên nướng an toàn và tiện lợi. 
    Giảm 80% lượng dầu mỡ
    Công nghệ đốt nóng Rapid Air
    8 chức năng nấu tự động
    Xuất xứ Thái Lan
    Dung tích siêu lớn 6,6L
    Màn hình cảm ứng sang trọng và tiện lợi
    Lòng nồi phủ chống dính cao cấp
    Nồi chiên không dầu Magic Eco AC-110 là sản phẩm chiên nướng không cần đến dầu - mỡ rất an toàn cho cơ thể. Thức ăn sẽ được khí nóng luân chuyển xung quanh theo công nghệ đốt nóng chân không Rapid Air giúp thức ăn chín đều và vẫn giữu đúng hương vị vốn có. Bạn có thể chiên nuongs nguyên một con gà hay bất kì thực phẩm nào bạn muốn với dung tích siêu lớn của Nồi chiên không dầu Magic Eco AC-110. Màn hình cảm ứng trên bề mặt nồi tạo nên sự sang trọng và tiện lợi cho người sử dụng. Bạn chỉ cần chọn một trong 8 chức năng nấu tự động và để Nồi chiên không dầu Magic Eco AC-110 lo cho bạn. Ngoài ra, lòng nồi phủ chống dính cao cấp giúp bạn dễ dàng vệ sinh sau sử dụng. Nồi chiên không dầu Magic Eco AC-110 là một lựa chọn không thể thiếu của mỗi gia đình trong cuộc sống bận rộn hiện nay.`,
  },
  {
    name: "Nồi chiên không dầu Magic Korea A-83 Trắng",
    bonus: "Tặng Bộ thố Hoặc Bộ 6 chén đũa",
    brand: "Magic Eco",
    stock: 100,
    discount: 22,
    price: 2790000,
    model: "A-83",
    images: [
      `${ORIGIN_API}/images/a-83t.webp`,
      `${ORIGIN_API}/images/a-83t-c.webp`,
      `${ORIGIN_API}/images/a-83t-a.webp`,
    ],
    category: "Nồi chiên không dầu",
    desc: `Magic A-83: Nồi chiên không khí nấu nhanh hơn và tốt cho sức khỏe hơn bao giờ hết. Nếu muốn thưởng thức đồ chiên rán không dầu mỡ, không khói hay rắc rối, bạn cần đến Magic A-83, nồi chiên không khí sử dụng công nghệ Rapid Air để nấu chín thực phẩm bằng không khí nóng thay vì dầu. Với Magic A-83, bạn có thể giảm tới 90% lượng chất béo trong thực phẩm và nấu nhanh hơn bao giờ hết với nhiệt độ và công suất cao. Magic A-83 có dung tích lớn 6 lít, kiểu dáng đẹp phù hợp với mọi không gian, lòng nồi inox chống dính, nhiều chế độ nấu. Nó cũng có một bộ lọc làm giảm mùi và khói, giúp dễ dàng vệ sinh và bảo trì. Magic A-83 là sự lựa chọn tối ưu cho những ai muốn tiết kiệm thời gian và tiền bạc cho việc nấu nướng đồng thời ăn uống lành mạnh và ngon miệng hơn. Đặt hàng của bạn ngay hôm nay và trải nghiệm sự khác biệt của chiên không khí!`,
  },
  {
    name: "Nồi chiên không dầu Iruka I-67",
    bonus: "Tặng Bộ thố Hoặc Bộ 6 chén đũa",
    brand: "Iruka",
    stock: 25,
    discount: 29,
    price: 2390000,
    model: "I-67",
    images: [
      `${ORIGIN_API}/images/i-67-a.webp`,
      `${ORIGIN_API}/images/i-67-b.webp`,
      `${ORIGIN_API}/images/i-67.webp`,
    ],
    category: "Nồi chiên không dầu",
    desc: `Iruka I-67: Nồi chiên không khí nấu nhanh hơn và tốt cho sức khỏe hơn bao giờ hết. Nếu muốn thưởng thức đồ chiên rán không dầu mỡ, không khói hay rắc rối, bạn cần Iruka I-67, nồi chiên không khí sử dụng công nghệ Rapid Air để nấu chín thực phẩm bằng không khí nóng thay vì dầu. Với Iruka I-67, bạn có thể giảm tới 90% lượng chất béo trong thực phẩm và nấu nhanh hơn bao giờ hết với nhiệt độ và công suất cao. Iruka I-67 có dung tích lớn 6 lít, kiểu dáng đẹp mắt phù hợp với mọi không gian, lòng nồi inox chống dính, nhiều chế độ nấu. Nó cũng có một bộ lọc làm giảm mùi và khói, giúp dễ dàng vệ sinh và bảo trì. Iruka I-67 là sự lựa chọn tối ưu cho những ai muốn tiết kiệm thời gian và tiền bạc cho việc nấu nướng đồng thời ăn uống lành mạnh và ngon miệng hơn. Đặt hàng của bạn ngay hôm nay và trải nghiệm sự khác biệt của chiên không khí!`,
  },
];

module.exports = products;
