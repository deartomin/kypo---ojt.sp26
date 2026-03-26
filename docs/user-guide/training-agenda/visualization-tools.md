---
title: Visualization Tools
sidebar_position: 6
---

# Visualization Tools

## I. Tổng quan

### 1. Khái niệm

**Visualization Tools** dùng để trực quan hóa dữ liệu thu thập được trong quá trình huấn luyện. Công cụ này giúp instructor và trainee theo dõi tiến độ, phân tích hành vi và đánh giá kết quả dễ dàng hơn.

### 2. Phân loại

Visualization Tools được chia thành hai nhóm chính:

1. **Visualizations for Adaptive Training**
2. **Visualizations for Linear Training**

### 3. Theo vai trò sử dụng

Đối với **linear training**, phần trực quan hóa còn được chia theo vai trò người dùng:

- **For Instructors**: dùng để theo dõi training instance đang diễn ra hoặc xem kết quả tổng hợp
- **For Trainees**: dùng để xem kết quả và hành vi sau khi hoàn thành training run

⚠️ **Lưu ý:**  
Xem thêm trang **Roles** để hiểu rõ hơn về quyền của từng vai trò.

---

## II. Visualizations for Adaptive Training

### 1. Khái niệm

Phần này cung cấp các trực quan hóa dành cho **adaptive training**. Tùy theo vai trò, người dùng sẽ thấy các dạng biểu đồ và màn hình phân tích khác nhau.

### 2. For Instructors

#### Sankey Diagram

Biểu đồ Sankey thể hiện luồng di chuyển của người tham gia giữa các task trong từng phase huấn luyện. Mỗi nhánh biểu diễn một hướng chuyển tiếp và kèm theo số lượng người đi qua nhánh đó.

Công cụ này giúp instructor:

- xem cách người học di chuyển qua các phase
- nhận biết nhánh nào được đi qua nhiều nhất
- đánh giá hiệu quả của decision matrix
- phát hiện phase hoặc task gây tắc nghẽn

<!-- [Ảnh: Sankey Diagram] -->

### 3. For Trainees

#### Adaptive transition visualization

Sau khi trainee hoàn thành training run, hệ thống hiển thị trực quan hóa lộ trình mà người đó đã đi qua.

Màn hình này giúp trainee:

- xem lại đường đi của mình qua các phase
- so sánh task đã làm với các task có thể đã được gán
- hiểu rõ hơn cách adaptive training điều hướng quá trình học

Mỗi node trong sơ đồ đại diện cho một task. Khi bấm vào từng node, nội dung chi tiết của task sẽ hiển thị bên dưới để tiện đối chiếu.

<!-- [Ảnh: Adaptive transition visualization] -->

---

## III. Visualizations for Linear Training

### 1. Khái niệm

Phần này cung cấp các công cụ trực quan hóa dành cho **linear training**. Các công cụ được chia thành hai nhóm: dành cho **instructors** và dành cho **trainees**.

---

### 2. For Instructors

## Progress of Training Instance

Phần này cho phép instructor theo dõi tiến trình của training instance đang diễn ra. Dữ liệu được hiển thị trong hai tab chính:

- **Progress**
- **Command Timeline**

### a. Progress

Tab **Progress** hiển thị toàn cảnh tiến độ của trainee trong suốt buổi huấn luyện.

#### Thành phần chính

- **Settings**: giới hạn hoặc lọc vùng thời gian hiển thị
- **Timeline Allocation**: hiển thị thời gian dự kiến và thời gian thực tế của phiên huấn luyện
- **Trainee Selection**: chọn hoặc bỏ chọn trainee cần theo dõi
- **Level Selection**: xem thông tin theo từng level
- **Progress Visualization**: hiển thị tiến độ của từng trainee theo thời gian
- **Individual Trainee Detail**: xem chi tiết tiến trình của một trainee cụ thể

Instructor có thể dùng phần này để:

- theo dõi trainee nào đang ở level nào
- phát hiện người học bị kẹt ở level nào
- so sánh tiến độ giữa các trainee
- kiểm tra số lần dùng hint hoặc gửi đáp án sai

<!-- [Ảnh: Progress of Training Instance] -->
<!-- [Ảnh: Individual Trainee Detail] -->

### b. Command Timeline

Tab **Command Timeline** hiển thị các command trainee đã thực hiện theo trục thời gian.

Mỗi command có thể kèm theo:

- loại command
- tùy chọn sử dụng
- địa chỉ IP nơi command được chạy
- thời điểm thực thi

Phần này phù hợp để instructor xem lại quá trình thao tác của trainee, nhất là trong các bài thực hành cần dùng command line.

⚠️ **Lưu ý:**  
Thời gian hiển thị ở đây là timestamp trong training, không phải thời gian thực ngoài đời.

<!-- [Ảnh: Command Timeline] -->

---

## Results of Training Instance

Trang này tổng hợp toàn bộ dữ liệu sau khi training kết thúc. Dữ liệu được tổ chức theo nhiều tab để instructor phân tích từ nhiều góc độ.

### a. Dashboard

Tab **Dashboard** là nơi tổng hợp nhiều loại trực quan hóa trong cùng một màn hình. Instructor có thể lọc trainee, quan sát tiến độ, điểm số, thời gian và nhiều tín hiệu hành vi khác.

Các thành phần nổi bật gồm:

- **Score Development**
- **Score Scatter Plot**
- **Final Training Runs View**

<!-- [Ảnh: Dashboard] -->

#### Score Development

Hiển thị sự thay đổi điểm số của trainee theo thời gian. Biểu đồ này cũng có thể đánh dấu các sự kiện quan trọng trong quá trình huấn luyện.

#### Score Scatter Plot

Giúp so sánh tương quan giữa **điểm số** và **thời gian hoàn thành** của các trainee, từ đó dễ phát hiện outlier hoặc nhóm người học có hành vi tương tự.

#### Final Training Runs View

Hiển thị bản tóm tắt toàn bộ walkthrough của trainee sau khi lọc và sắp xếp. Phần này hữu ích để so sánh mức độ hoàn thành, số lần dùng hint hoặc số lần nộp đáp án sai.

<!-- [Ảnh: Score Development] -->
<!-- [Ảnh: Score Scatter Plot] -->
<!-- [Ảnh: Final Training Runs View] -->

### b. Assessment

Tab **Assessment** hiển thị thống kê kết quả trả lời của từng câu hỏi đánh giá.

Instructor có thể xem:

- số lượng lựa chọn cho từng đáp án
- tỉ lệ phần trăm
- phân bố câu trả lời giữa các trainee

<!-- [Ảnh: Assessment] -->

### c. Aggregated Dashboard

Tab **Aggregated Dashboard** tổng hợp dữ liệu từ nhiều training instance có cùng **Training Definition**.

Phần này phù hợp để:

- so sánh kết quả giữa nhiều đợt training
- đánh giá mức độ khó của bài học
- phân tích hành vi lặp lại qua nhiều instance

Các trực quan hóa chính gồm:

#### Training Instance Result visualization

So sánh điểm đạt được giữa nhiều training instance, đồng thời hiển thị số người tham gia, điểm trung bình và điểm trung vị.

#### Time-score-hints Relationship

Phân tích mối quan hệ giữa thời gian làm bài, điểm số và số hint đã dùng. Từ đó hỗ trợ đánh giá độ khó của training.

#### Wrong Answers Overview

Cho biết tỉ lệ đáp án đúng / sai ở từng level. Công cụ này giúp instructor nhận ra level nào đang gây khó khăn cho nhiều trainee.

#### Wrong Answers Details

Phóng to một level cụ thể để xem chi tiết các đáp án đã được submit. Bubble càng lớn thì đáp án đó càng được submit nhiều lần.

#### Time and Score Aggregations

Tổng hợp thời gian và điểm theo từng level hoặc toàn bộ training. Phần này không hiển thị từng trainee riêng lẻ mà tập trung vào các giá trị cực đại và trung bình.

#### Two Clusterable Features Comparison

So sánh hai đặc trưng hành vi trong cùng một biểu đồ phân tán, ví dụ:

- số lần submit sai
- thời gian sau khi dùng hint

#### Behavior Correlation Chart

Hiển thị mối tương quan giữa nhiều nhóm thuộc tính hành vi như:

- tổng điểm
- thời gian chơi
- số hint đã dùng
- số lần submit sai
- thời gian tối đa sau khi dùng hint

#### Walkthrough

Biểu diễn walkthrough của từng trainee qua các level để quan sát xu hướng thành công hoặc thất bại. Phần này giúp phát hiện level gây nghẽn hoặc hành vi bất thường.

#### Command Analysis

Phân tích các command mà trainee đã thực hiện. Command có thể được chia theo:

- **correct commands**
- **wrong commands**

Mỗi command có thể hiển thị:

- full command
- IP thực thi
- số lần xuất hiện
- loại lỗi nếu là wrong command

⚠️ **Lưu ý:**  
Bộ lọc cần được xác nhận bằng nút **Filter** để áp dụng.

<!-- [Ảnh: Aggregated Dashboard] -->
<!-- [Ảnh: Training Instance Result visualization] -->
<!-- [Ảnh: Time-score-hints Relationship] -->
<!-- [Ảnh: Wrong Answers Overview] -->
<!-- [Ảnh: Wrong Answers Details] -->
<!-- [Ảnh: Time and Score Aggregations] -->
<!-- [Ảnh: Two Clusterable Features Comparison] -->
<!-- [Ảnh: Behavior Correlation Chart] -->
<!-- [Ảnh: Walkthrough] -->
<!-- [Ảnh: Command Analysis] -->

---

### 3. For Trainees

Sau khi trainee hoàn thành training run, hệ thống hiển thị các trực quan hóa tóm tắt hành vi và kết quả của chính họ.

Các tab phổ biến gồm:

- **Score Development**
- **Score Scatter Plot**
- bảng so sánh với các trainee khác
- **Command Analysis** và **Command Timeline** nếu có dữ liệu command

Phần này giúp trainee:

- xem lại mức độ hoàn thành của bản thân
- so sánh kết quả với người học khác
- hiểu được điểm mạnh và điểm còn hạn chế trong quá trình làm bài

<!-- [Ảnh: Training Run Results for Trainees] -->

---

## IV. Tổng kết

Visualization Tools giúp người dùng quan sát và phân tích dữ liệu huấn luyện theo hai hướng chính:

1. **Adaptive Training** – tập trung vào luồng di chuyển giữa các phase và task
2. **Linear Training** – tập trung vào tiến độ, điểm số, câu trả lời, command và hành vi người học

Đối với instructor, công cụ này hỗ trợ giám sát, đánh giá và cải thiện training definition.  
Đối với trainee, công cụ này giúp xem lại kết quả và hiểu rõ quá trình học của mình.
