// Database for Tu Tuong Ho Chi Minh Quiz App (Chapter 5: Dai doan ket toan dan toc)
// Extracted from 20_cau_trac_nghiem_dai_doan_ket_toan_dan_toc.pdf

const fullQuestionsList = [
  {
    id: 1,
    question: "Theo tư tưởng Hồ Chí Minh, đại đoàn kết toàn dân tộc được xem là gì?",
    options: [
      { key: "A", text: "Một biện pháp vận động quần chúng chủ yếu trong từng thời điểm." },
      { key: "B", text: "Một vấn đề có ý nghĩa chiến lược, lâu dài và quyết định thành công của cách mạng." },
      { key: "C", text: "Một nhiệm vụ chủ yếu trong thời kỳ đấu tranh giành độc lập." },
      { key: "D", text: "Một phương thức tổ chức xã hội nhằm giảm khác biệt giữa các tầng lớp." }
    ],
    correct: "B",
    explanation: "Giáo trình xác định đại đoàn kết toàn dân tộc là vấn đề có ý nghĩa chiến lược, lâu dài, quyết định sự thành bại của cách mạng."
  },
  {
    id: 2,
    question: "Đại đoàn kết toàn dân tộc vừa là gì?",
    options: [
      { key: "A", text: "Mục tiêu chính trị và giải pháp kinh tế." },
      { key: "B", text: "Nền tảng xã hội và phương thức quản lý." },
      { key: "C", text: "Phương pháp vận động và hình thức tổ chức." },
      { key: "D", text: "Mục tiêu đồng thời là nhiệm vụ hàng đầu của cách mạng." }
    ],
    correct: "D",
    explanation: "Đại đoàn kết vừa là mục tiêu lâu dài, vừa là nhiệm vụ hàng đầu cần được quán triệt trong thực tiễn."
  },
  {
    id: 3,
    question: "Chủ thể của khối đại đoàn kết toàn dân tộc theo tư tưởng Hồ Chí Minh là:",
    options: [
      { key: "A", text: "Toàn thể nhân dân Việt Nam, không phân biệt giai cấp, tầng lớp, dân tộc, tôn giáo hay nơi sinh sống." },
      { key: "B", text: "Chủ yếu công nhân, nông dân và trí thức vì đây là lực lượng nền tảng." },
      { key: "C", text: "Các tổ chức chính trị - xã hội có khả năng vận động quần chúng." },
      { key: "D", text: "Những lực lượng có cùng quan điểm và lợi ích trực tiếp với nhau." }
    ],
    correct: "A",
    explanation: "Chủ thể là toàn thể nhân dân; công nhân - nông dân - trí thức là nền tảng, không phải toàn bộ chủ thể."
  },
  {
    id: 4,
    question: "Nền tảng của khối đại đoàn kết toàn dân tộc được giáo trình xác định là:",
    options: [
      { key: "A", text: "Liên minh công nhân - trí thức - doanh nhân." },
      { key: "B", text: "Liên minh nông dân - trí thức - thanh niên." },
      { key: "C", text: "Liên minh công nhân - nông dân - trí thức." },
      { key: "D", text: "Liên minh các tổ chức chính trị - xã hội và quần chúng." }
    ],
    correct: "C",
    explanation: "Giáo trình nêu lực lượng nền tảng của khối đại đoàn kết là công nhân, nông dân và trí thức."
  },
  {
    id: 5,
    question: "Trong khối đại đoàn kết toàn dân tộc, yếu tố được nhấn mạnh như một 'hạt nhân' quan trọng là:",
    options: [
      { key: "A", text: "Sự thống nhất giữa các tổ chức xã hội nghề nghiệp." },
      { key: "B", text: "Sự đoàn kết và thống nhất trong Đảng." },
      { key: "C", text: "Sự đồng thuận giữa các tầng lớp trung lưu." },
      { key: "D", text: "Sự phối hợp giữa các tổ chức quần chúng ở cơ sở." }
    ],
    correct: "B",
    explanation: "Giáo trình nhấn mạnh sự đoàn kết, thống nhất trong Đảng là hạt nhân quan trọng để củng cố đoàn kết ngoài xã hội."
  },
  {
    id: 6,
    question: "Điều kiện nào phù hợp nhất với tư tưởng Hồ Chí Minh khi xây dựng khối đại đoàn kết?",
    options: [
      { key: "A", text: "Ưu tiên lợi ích của lực lượng đông đảo nhất để tạo sự thống nhất." },
      { key: "B", text: "Hạn chế những lợi ích riêng để tránh phát sinh khác biệt." },
      { key: "C", text: "Tập trung vào lợi ích của các lực lượng giữ vai trò nền tảng." },
      { key: "D", text: "Lấy lợi ích chung làm điểm quy tụ, đồng thời tôn trọng lợi ích khác biệt chính đáng." }
    ],
    correct: "D",
    explanation: "Đây là một điều kiện cốt lõi: tìm mẫu số chung nhưng không phủ nhận những lợi ích khác biệt chính đáng."
  },
  {
    id: 7,
    question: "Tinh thần khoan dung, độ lượng trong xây dựng đại đoàn kết được hiểu phù hợp nhất là:",
    options: [
      { key: "A", text: "Không phê bình những hạn chế để giữ hòa khí." },
      { key: "B", text: "Chấp nhận mọi khác biệt mà không cần nguyên tắc chung." },
      { key: "C", text: "Trân trọng mặt tích cực ở mỗi người, vượt qua khác biệt để cùng hướng tới lợi ích chung." },
      { key: "D", text: "Chỉ tập hợp những người không có mâu thuẫn lợi ích với nhau." }
    ],
    correct: "C",
    explanation: "Khoan dung không phải bỏ qua nguyên tắc, mà là biết trân trọng phần tích cực và mở rộng khả năng đoàn kết."
  },
  {
    id: 8,
    question: "Niềm tin vào nhân dân trong tư tưởng Hồ Chí Minh thể hiện rõ nhất ở quan điểm:",
    options: [
      { key: "A", text: "Yêu dân, tin dân, dựa vào dân và phấn đấu vì hạnh phúc của nhân dân." },
      { key: "B", text: "Tuyên truyền cho dân hiểu để thực hiện đúng chủ trương chung." },
      { key: "C", text: "Phát huy vai trò của các tổ chức đại diện thay cho sự tham gia trực tiếp của dân." },
      { key: "D", text: "Tập trung nâng cao đời sống vật chất để củng cố niềm tin xã hội." }
    ],
    correct: "A",
    explanation: "Giáo trình nhấn mạnh yêu dân, tin dân, dựa vào dân và phấn đấu vì hạnh phúc của nhân dân."
  },
  {
    id: 9,
    question: "Hình thức tổ chức cơ bản của khối đại đoàn kết toàn dân tộc là:",
    options: [
      { key: "A", text: "Các đoàn thể quần chúng hoạt động độc lập theo từng nhóm xã hội." },
      { key: "B", text: "Mặt trận dân tộc thống nhất." },
      { key: "C", text: "Liên minh công - nông - trí thức." },
      { key: "D", text: "Hệ thống các tổ chức xã hội nghề nghiệp." }
    ],
    correct: "B",
    explanation: "Khối đại đoàn kết chỉ trở thành lực lượng có tổ chức khi được tập hợp trong Mặt trận dân tộc thống nhất."
  },
  {
    id: 10,
    question: "Nguyên tắc 'hiệp thương dân chủ' trong hoạt động của Mặt trận được hiểu là:",
    options: [
      { key: "A", text: "Mỗi tổ chức giữ nguyên quan điểm riêng nhưng tuân theo quyết định cuối cùng của số đông." },
      { key: "B", text: "Những vấn đề quan trọng được giao cho lực lượng đại diện quyết định để bảo đảm thống nhất." },
      { key: "C", text: "Ưu tiên thống nhất nhanh, sau đó điều chỉnh các khác biệt trong quá trình thực hiện." },
      { key: "D", text: "Các thành viên cùng bàn bạc công khai, tôn trọng lợi ích chính đáng và đi tới nhất trí, tránh áp đặt." }
    ],
    correct: "D",
    explanation: "Hiệp thương dân chủ nhấn mạnh bàn bạc công khai, tôn trọng khác biệt chính đáng và hướng tới nhất trí."
  },
  {
    id: 11,
    question: "Nội dung nào phản ánh đúng nguyên tắc đoàn kết lâu dài trong Mặt trận?",
    options: [
      { key: "A", text: "Giữ sự thống nhất bằng cách hạn chế tranh luận giữa các thành viên." },
      { key: "B", text: "Đặt lợi ích của lực lượng nền tảng cao hơn lợi ích của các lực lượng khác." },
      { key: "C", text: "Đoàn kết chân thành, thân ái, vừa hợp tác vừa góp ý để cùng tiến bộ." },
      { key: "D", text: "Tạm gác mọi khác biệt cho đến khi hoàn thành mục tiêu chung." }
    ],
    correct: "C",
    explanation: "Giáo trình nhấn mạnh đoàn kết lâu dài, chân thành, thân ái, giúp đỡ nhau cùng tiến bộ."
  },
  {
    id: 12,
    question: "Phương thức xây dựng khối đại đoàn kết toàn dân tộc bao gồm:",
    options: [
      { key: "A", text: "Làm tốt công tác vận động quần chúng; xây dựng tổ chức phù hợp với từng đối tượng; tập hợp các tổ chức trong Mặt trận." },
      { key: "B", text: "Tăng cường tuyên truyền; thống nhất lợi ích; mở rộng quan hệ quốc tế." },
      { key: "C", text: "Củng cố liên minh công - nông; phát triển trí thức; nâng cao dân trí." },
      { key: "D", text: "Xây dựng tổ chức quần chúng; phân công trách nhiệm; tăng cường kiểm tra." }
    ],
    correct: "A",
    explanation: "Ba phương thức nổi bật trong giáo trình là dân vận, tổ chức quần chúng phù hợp và tập hợp các tổ chức trong Mặt trận."
  },
  {
    id: 13,
    question: "Sức mạnh đại đoàn kết trong giai đoạn hiện nay cần được phát huy chủ yếu để:",
    options: [
      { key: "A", text: "Tập trung mở rộng quan hệ đối ngoại và hội nhập." },
      { key: "B", text: "Khắc phục nghèo nàn, lạc hậu và xây dựng, phát triển đất nước." },
      { key: "C", text: "Củng cố vai trò của các tổ chức xã hội trong quản lý cộng đồng." },
      { key: "D", text: "Giảm khác biệt lợi ích giữa các giai cấp, tầng lớp." }
    ],
    correct: "B",
    explanation: "Giáo trình đối chiếu: trước đây đoàn kết để thắng ngoại xâm; hiện nay cần phát huy sức mạnh ấy để khắc phục nghèo nàn, lạc hậu và phát triển đất nước."
  },
  {
    id: 14,
    question: "Khi vận dụng tư tưởng đại đoàn kết hiện nay, cách xử lý quan hệ lợi ích phù hợp nhất là:",
    options: [
      { key: "A", text: "Ưu tiên lợi ích tập thể vì đây là cơ sở để bảo đảm lợi ích cá nhân." },
      { key: "B", text: "Bảo đảm lợi ích cá nhân trước, sau đó mới điều chỉnh theo lợi ích chung." },
      { key: "C", text: "Giảm tối đa những lợi ích khác biệt để tránh mâu thuẫn xã hội." },
      { key: "D", text: "Kết hợp hài hòa lợi ích cá nhân, lợi ích tập thể và lợi ích toàn xã hội." }
    ],
    correct: "D",
    explanation: "Giáo trình nhấn mạnh giải quyết tốt quan hệ lợi ích và kết hợp hài hòa ba cấp độ lợi ích."
  },
  {
    id: 15,
    question: "Theo nội dung vận dụng đã xây dựng, đoàn kết người Việt Nam trong và ngoài nước nên được hiểu là:",
    options: [
      { key: "A", text: "Gắn kết cộng đồng người Việt ở mọi nơi và phát huy đóng góp về tri thức, kinh tế, văn hóa, kết nối." },
      { key: "B", text: "Tập trung chủ yếu vào việc giữ gìn bản sắc văn hóa Việt Nam ở nước ngoài." },
      { key: "C", text: "Khuyến khích người Việt ở nước ngoài đóng góp chủ yếu thông qua đầu tư kinh tế." },
      { key: "D", text: "Tạo điều kiện để cộng đồng ở nước ngoài tham gia trực tiếp vào các hoạt động trong nước." }
    ],
    correct: "A",
    explanation: "Nội dung vận dụng mở rộng nhấn mạnh cộng đồng người Việt ở nước ngoài là một bộ phận của cộng đồng dân tộc và có thể đóng góp trên nhiều phương diện."
  },
  {
    id: 16,
    question: "Vận dụng mở rộng về đoàn kết giữa các thế hệ, cách kết hợp phù hợp nhất là:",
    options: [
      { key: "A", text: "Thế hệ trẻ tiếp thu kinh nghiệm của người đi trước và hạn chế thay đổi những phương thức đã ổn định." },
      { key: "B", text: "Thế hệ đi trước định hướng, thế hệ trẻ chủ yếu thực hiện bằng công nghệ mới." },
      { key: "C", text: "Kết hợp kinh nghiệm của thế hệ đi trước với tri thức, công nghệ và sức sáng tạo của thế hệ trẻ." },
      { key: "D", text: "Phân chia vai trò theo thế mạnh từng thế hệ để hạn chế mâu thuẫn trong hợp tác." }
    ],
    correct: "C",
    explanation: "Đây là phần vận dụng mở rộng: kế thừa kinh nghiệm đồng thời phát huy đổi mới, công nghệ và sức sáng tạo của thế hệ trẻ."
  },
  {
    id: 17,
    question: "Một nhóm sinh viên có thành viên mạnh ở nghiên cứu, thiết kế và thuyết trình. Cách làm nào phù hợp nhất với tinh thần đại đoàn kết?",
    options: [
      { key: "A", text: "Giao phần quan trọng nhất cho người có kết quả học tập cao nhất." },
      { key: "B", text: "Phân công theo thế mạnh, lắng nghe ý kiến khác nhau và cùng chịu trách nhiệm về kết quả chung." },
      { key: "C", text: "Chia đều mọi công việc để bảo đảm các thành viên có trách nhiệm như nhau." },
      { key: "D", text: "Để mỗi người tự làm phần mình, hạn chế can thiệp để tránh phát sinh mâu thuẫn." }
    ],
    correct: "B",
    explanation: "Tinh thần đoàn kết trong nhóm là phát huy sự khác biệt về năng lực trên cơ sở mục tiêu và trách nhiệm chung."
  },
  {
    id: 18,
    question: "Một sinh viên nhận được bài đăng gây tranh cãi về một nhóm xã hội nhưng chưa rõ nguồn. Cách xử lý phù hợp nhất với tinh thần đại đoàn kết là:",
    options: [
      { key: "A", text: "Chia sẻ kèm cảnh báo để mọi người tự đánh giá mức độ chính xác." },
      { key: "B", text: "Không bình luận nhưng vẫn lưu lại để theo dõi phản ứng của cộng đồng." },
      { key: "C", text: "Tranh luận mạnh để ngăn người khác tin vào nội dung đó." },
      { key: "D", text: "Kiểm chứng thông tin trước khi chia sẻ và trao đổi với thái độ tôn trọng, tránh kích động chia rẽ." }
    ],
    correct: "D",
    explanation: "Vận dụng trong môi trường số đòi hỏi trách nhiệm với thông tin và văn hóa tranh luận."
  },
  {
    id: 19,
    question: "Khi một cộng đồng có khác biệt về dân tộc, tôn giáo và phong tục, cách tiếp cận phù hợp nhất với tư tưởng đại đoàn kết là:",
    options: [
      { key: "A", text: "Tôn trọng bản sắc riêng, tăng hiểu biết lẫn nhau và cùng tìm những lợi ích chung để hợp tác." },
      { key: "B", text: "Hạn chế nhấn mạnh bản sắc riêng để tạo sự đồng nhất trong cộng đồng." },
      { key: "C", text: "Ưu tiên những giá trị phổ biến nhất để tạo nền tảng chung cho mọi nhóm." },
      { key: "D", text: "Giữ riêng các khác biệt văn hóa và chỉ hợp tác trong những vấn đề kinh tế - xã hội." }
    ],
    correct: "A",
    explanation: "Đại đoàn kết không đồng nghĩa với đồng nhất; điều quan trọng là tôn trọng cái riêng và cùng hướng tới cái chung."
  },
  {
    id: 20,
    question: "Chuỗi nào dưới đây thể hiện đúng nhất tinh thần vận dụng đại đoàn kết mà bài thuyết trình đã khái quát?",
    options: [
      { key: "A", text: "Khác biệt ➔ điều chỉnh lợi ích ➔ thống nhất ➔ tổ chức ➔ phát triển." },
      { key: "B", text: "Khác biệt ➔ thuyết phục ➔ đồng thuận ➔ phân công ➔ trách nhiệm." },
      { key: "C", text: "Khác biệt ➔ tôn trọng ➔ tìm điểm chung ➔ đồng thuận ➔ hợp tác ➔ sức mạnh." },
      { key: "D", text: "Khác biệt ➔ đối thoại ➔ nhượng bộ ➔ thống nhất ➔ hành động chung." }
    ],
    correct: "C",
    explanation: "Chuỗi này thể hiện đúng logic của phần vận dụng: tôn trọng khác biệt, tìm mẫu số chung, tạo đồng thuận và chuyển thành hợp tác."
  }
];

// Grouping into practice modules (Single comprehensive module with 20 questions)
const chaptersData = [
  {
    id: 1,
    title: "20 câu hỏi trắc nghiệm",
    subtitle: "Thử thách trọn vẹn 20 câu hỏi trắc nghiệm Chương 5 có giải thích chi tiết và chấm điểm xếp hạng.",
    iconType: "exam",
    questions: fullQuestionsList
  }
];
