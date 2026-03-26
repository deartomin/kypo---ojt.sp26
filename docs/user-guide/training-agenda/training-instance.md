---
title: Cheating Detection & Training Instance
sidebar_position: 4
---

## Cheating Detection

**Cheating Detection** dùng để phát hiện các hành vi đáng ngờ trong quá trình trainee làm bài. Các phương thức phát hiện này có thể được chạy trên training instance của linear training definition để hỗ trợ instructor kiểm tra kết quả và phân tích dữ liệu.

### 1. Cheating Detection Overview

Trang này hiển thị danh sách các lần chạy cheating detection trên một training instance. Tại đây instructor có thể:

- xem danh sách detection đã chạy
- tạo detection mới
- xem kết quả phát hiện
- export dữ liệu sự kiện
- chạy lại detection
- xóa detection

Bảng tổng quan thường hiển thị:

- thời gian chạy và người thực hiện
- trạng thái detection
- số lượng kết quả phát hiện
- trạng thái của từng phương thức phát hiện
- các thao tác có thể thực hiện

<!-- [Ảnh: Cheating Detection Overview] -->

### 2. Create Cheating Detection

Trang này dùng để tạo một cheating detection mới với các phương thức phát hiện cụ thể. Instructor có thể bật hoặc tắt từng phương thức tùy theo ngữ cảnh bài huấn luyện.

Hệ thống hiện hỗ trợ các phương thức sau:

- **Answer Similarity**: phát hiện nhiều trainee dùng cùng một đáp án
- **Location Similarity**: phát hiện nhiều trainee gửi đáp án từ cùng một domain hoặc vị trí
- **Time Proximity**: phát hiện các lần nộp đáp án gần nhau trong một khoảng thời gian ngắn
- **Minimal Solve Time**: phát hiện trường hợp giải bài nhanh bất thường so với thời gian tối thiểu
- **No Commands**: phát hiện trainee hoàn thành level mà không dùng command, dù level có yêu cầu
- **Forbidden Commands**: phát hiện trainee sử dụng command bị cấm

⚠️ **Lưu ý:**  
Các phương thức này chỉ hỗ trợ phát hiện dấu hiệu đáng ngờ, không khẳng định chắc chắn rằng trainee đã gian lận.

<!-- [Ảnh: Create Cheating Detection] -->

### 3. Detection Events of Cheating Detection

Sau khi detection chạy xong, hệ thống tạo danh sách các **detection events**. Trang này hiển thị thông tin cơ bản của từng sự kiện, ví dụ:

- tên level và id
- số lượng người tham gia sự kiện
- thời điểm phát hiện
- loại sự kiện
- thao tác xem chi tiết

Instructor có thể mở trang chi tiết để xem thêm thông tin của từng event.

<!-- [Ảnh: Detection Events of Cheating Detection] -->

### 4. Detection Event Detail

Trang chi tiết hiển thị thông tin đầy đủ của một detection event và các trainee liên quan. Nội dung chi tiết phụ thuộc vào loại event:

- **Answer Similarity**: hiển thị đáp án và người có thể đã chia sẻ đáp án
- **Location Similarity**: hiển thị domain hoặc địa chỉ triển khai liên quan
- **Time Proximity**: hiển thị khoảng thời gian giữa các lần nộp đáp án
- **Minimal Solve Time**: hiển thị thời gian tối thiểu và thời gian giải thực tế
- **No Commands**: hiển thị event không có command nào được ghi nhận
- **Forbidden Commands**: hiển thị danh sách command bị cấm và dòng thời gian command liên quan

<!-- [Ảnh: Detection Event Detail] -->

---

## Training Instance

**Training Instance** dùng để tạo và quản lý các phiên bản huấn luyện cụ thể. Phần này hỗ trợ cả **linear training instance** và **adaptive training instance**.

### 1. Training Instance Overview

Trang này hiển thị danh sách các training instance mà instructor có quyền truy cập. Dù là linear hay adaptive, instructor đều có thể thực hiện các thao tác cơ bản như:

- **Create**: tạo mới instance
- **Edit**: chỉnh sửa instance
- **Delete**: xóa instance
- **Get Data**: export dữ liệu kết quả
- **Get SSH Configs**: tải cấu hình SSH
- **Training Runs**: xem các lần chạy huấn luyện
- **Display Token**: hiển thị access token
- **Show Progress**: xem tiến độ học
- **Show Results**: xem kết quả sau huấn luyện
- **Show Aggregated Results**: xem kết quả tổng hợp
- **Cheating Detection**: mở trang cheating detection

Bảng tổng quan cũng cho phép mở nhanh trang summary của instance, chi tiết training definition, pool hoặc token truy cập nếu có.

<!-- [Ảnh: Training Instance Overview] -->
<!-- [Ảnh: các action trong Training Instance Overview] -->

### 2. Training Instance Detail

Trang này hiển thị danh sách các training run thuộc về instance. Instructor có thể xem:

- người tham gia
- thời gian bắt đầu và kết thúc
- trạng thái run
- thời lượng
- sandbox id
- trạng thái event logging và command logging

Trong một số trường hợp, instructor cũng có thể xóa training run cùng sandbox tương ứng.

<!-- [Ảnh: Training Instance Detail] -->

### 3. Create/Edit Training Instance

Trang này dùng để tạo mới hoặc chỉnh sửa training instance. Instructor có thể cấu hình các thông tin chính như:

- tiêu đề instance
- thời gian bắt đầu và kết thúc
- access token prefix
- training definition được sử dụng
- bật / tắt stepper bar
- local environment
- backward mode

Sau khi lưu, instructor có thể tiếp tục chỉnh sửa organizers và các thiết lập liên quan.

#### Assign Pool

Nếu **local environment** bị tắt, instructor có thể gán một **pool** cho instance. Pool được dùng để cung cấp sandbox cho người học trong quá trình training run.

#### Assign Sandbox Definition

Nếu **local environment** được bật, instructor có thể gán một **sandbox definition** thay vì pool.

#### Edit Instructors

Instructor có thể thêm các instructor khác để cùng quản lý training instance. Những người này có thể xem tiến độ và kết quả tương tự author.

<!-- [Ảnh: Create/Edit Training Instance] -->
<!-- [Ảnh: Assign Pool / Assign Sandbox Definition / Edit Instructors] -->

### 4. Summary of Training Instance

Trang này cung cấp phần tóm tắt toàn bộ instance, bao gồm:

- thời gian bắt đầu và kết thúc
- access token
- pool đang gán
- training runs đang hoạt động
- các nút mở nhanh tới progress, results, aggregated results và cheating detection

Nếu là **APG training definition**, instructor còn có thể mở rộng từng training run để xem correct answers và variable name theo từng level.

<!-- [Ảnh: Summary of Training Instance] -->

### 5. Progress of Training Instance

Phần này dùng để theo dõi tiến độ của người tham gia theo thời gian. Dữ liệu được hiển thị bằng công cụ trực quan riêng.

<!-- [Ảnh: Progress of Training Instance] -->

### 6. Results of Training Instance

Sau khi training kết thúc, instructor có thể xem kết quả theo từng loại instance:

- **Linear**: hiển thị kết quả tổng quan và kết quả của từng trainee
- **Adaptive**: hiển thị luồng chuyển giữa các task và kết quả của người học

<!-- [Ảnh: Results of Training Instance - Linear / Adaptive] -->
