---
title: Giới thiệu hệ thống KYPO
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Giới thiệu hệ thống KYPO

KYPO là một nền tảng cyber range mã nguồn mở do Đại học Masaryk phát triển. Hệ thống cho phép tạo các môi trường mạng ảo hóa chuyên biệt để phục vụ công tác đào tạo và nghiên cứu chuyên sâu về an ninh mạng.

Người học có thể truy cập các máy chủ, dịch vụ và hệ thống được mô phỏng trong môi trường lab. Các môi trường này được cách ly hoàn toàn với hệ thống thật, đảm bảo tính an toàn trong quá trình thực hành.

---

## Mục tiêu

KYPO được xây dựng để hỗ trợ toàn diện cho hoạt động đào tạo và nghiên cứu an toàn thông tin.

Các mục đích chính bao gồm:

- Đào tạo kỹ năng an toàn thông tin thực chiến.
- Thực hành kịch bản tấn công và phòng thủ.
- Mô phỏng các tình huống an ninh mạng phức tạp.
- Thu thập dữ liệu phục vụ các dự án nghiên cứu.

---

## Thành phần hệ thống

Hệ thống KYPO bao gồm các thành phần cốt lõi phối hợp chặt chẽ với nhau:

1. KYPO Cyber Range Platform: Quản lý hạ tầng và điều phối môi trường lab.
2. Training Portal: Giao diện web dành cho người dùng tương tác.
3. Scenario: Các kịch bản và bài tập đào tạo.
4. Hạ tầng ảo hóa: Sử dụng để triển khai các máy ảo và cấu hình mạng.

---

## Kiến trúc tổng thể

KYPO hoạt động theo mô hình phân tầng để tối ưu quản lý:

- Lớp người dùng: Tương tác qua trình duyệt.
- Lớp giao diện web: Cung cấp cổng thông tin đào tạo.
- Lớp dịch vụ (Backend): Xử lý việc tạo máy ảo và quản lý kịch bản.
- Lớp hạ tầng ảo hóa: Thực hiện việc cấu hình mạng và triển khai tài nguyên.

---

## Môi trường lab

KYPO có khả năng tự động khởi tạo môi trường lab từ các scenario đã được định nghĩa sẵn. Một môi trường lab tiêu chuẩn thường bao gồm:

- Máy chủ dịch vụ.
- Máy tấn công (Attacker).
- Máy phòng thủ (Defender).
- Các thiết bị và dịch vụ mạng ảo.

Mỗi người học sẽ được cấp một môi trường riêng biệt để thực hành độc lập.

---

## Scenario

Scenario là kịch bản an ninh mạng mô phỏng các tình huống thực tế dùng trong đào tạo, ví dụ như:

- Tấn công và xâm nhập hệ thống.
- Phát hiện xâm nhập trái phép.
- Quy trình ứng cứu sự cố.

Một scenario bao gồm cấu trúc mạng, danh sách máy ảo và các nhiệm vụ cần thực hiện.

---

## Task và bài tập

Trong mỗi scenario, người học cần hoàn thành các task (nhiệm vụ) nhỏ để tiến bộ:

- Tìm kiếm thông tin trong log hệ thống.
- Xác định nguồn gốc và địa chỉ IP tấn công.
- Phát hiện và phân tích mã độc cơ bản.
- Tìm flag (chuỗi ký tự bí mật) được giấu trong hệ thống.

---

## Quiz và assessment

KYPO hỗ trợ các công cụ đánh giá kiến thức đa dạng:

- Câu hỏi trắc nghiệm khách quan.
- Câu hỏi điền đáp án ngắn.
- Các bài đánh giá tổng kết sau khi hoàn thành lab để đo lường kết quả học tập.

---

## Dữ liệu trong scenario

Hệ thống ghi lại nhiều loại dữ liệu phát sinh trong quá trình thực hành để phục vụ phân tích:

- Log hệ thống và lưu lượng mạng (network traffic).
- Dấu vết tấn công và các hành vi xâm nhập.
- Timeline (dòng thời gian) các sự kiện đã xảy ra.

---

## Ứng dụng

KYPO được ứng dụng rộng rãi trong nhiều lĩnh vực an ninh mạng:

- Đào tạo Pentesting (Kiểm thử xâm nhập).
- Phân tích mã độc (Malware analysis).
- Điều tra số (Digital forensics).
- Ứng cứu sự cố (Incident response).

Hệ thống thường được triển khai tại các trường đại học, trung tâm đào tạo hoặc tổ chức nghiên cứu.

---

## Ưu điểm và hạn chế

Ưu điểm:

- Mã nguồn mở và khả năng tùy chỉnh cao.
- Mô phỏng môi trường mạng thực tế và trực quan.
- Hỗ trợ quy trình đào tạo bài bản và khoa học.

Hạn chế:

- Quy trình cài đặt và triển khai tương đối phức tạp.
- Yêu cầu hạ tầng phần cứng mạnh mẽ.
- Cần đội ngũ kỹ thuật có chuyên môn để quản lý.

---

## Kết luận

KYPO là một nền tảng cyber range mạnh mẽ dành cho đào tạo và nghiên cứu an ninh mạng. Thông qua việc mô phỏng môi trường lab ảo và các kịch bản thực tế, hệ thống giúp người học rèn luyện kỹ năng thực chiến trong một môi trường an toàn và có kiểm soát.
