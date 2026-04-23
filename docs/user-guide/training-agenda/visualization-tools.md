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

1. Visualizations for Adaptive Training
2. Visualizations for Linear Training

### 3. Theo vai trò sử dụng

Đối với linear training, phần trực quan hóa được chia theo vai trò:

- For Instructors: theo dõi training instance và phân tích kết quả
- For Trainees: xem lại kết quả và hành vi sau khi hoàn thành training run

---

## II. Visualizations for Adaptive Training

### 1. Khái niệm

Cung cấp các trực quan hóa dành cho adaptive training. Tùy vai trò, người dùng sẽ thấy các dạng biểu đồ khác nhau.

### 2. For Instructors

#### Sankey Diagram

Biểu đồ Sankey thể hiện luồng di chuyển của người học giữa các task trong từng phase. Mỗi nhánh biểu diễn một hướng chuyển tiếp kèm số lượng người đi qua.

Giúp instructor:

- theo dõi luồng di chuyển giữa các phase
- xác định nhánh phổ biến
- đánh giá decision matrix
- phát hiện điểm nghẽn

![Visual](/img/ATI-sankey.png)

### 3. For Trainees

#### Adaptive Transition Visualization

Hiển thị lộ trình mà trainee đã đi qua sau khi hoàn thành training run.

Giúp trainee:

- xem lại đường đi
- so sánh với các nhánh có thể xảy ra
- hiểu cách hệ thống adaptive điều hướng

Mỗi node đại diện cho một task, có thể click để xem chi tiết.

![Visual](/img/ATI-transition.png)

---

## III. Visualizations for Linear Training

### 1. Khái niệm

Cung cấp các công cụ trực quan hóa cho linear training, chia theo instructor và trainee.

### 2. For Instructors

### Progress of Training Instance

Cho phép theo dõi tiến trình của training instance qua hai tab:

- Progress
- Command Timeline

#### a. Progress

Hiển thị tiến độ tổng thể của trainee trong suốt buổi training.

![Visual](/img/TI-progress.png)

Các thành phần chính:

- Settings
- Timeline Allocation
- Trainee Selection
- Level Selection
- Progress Visualization
- Individual Trainee Detail

![Visual](/img/TI-progress-detail.png)

Giúp instructor:

- theo dõi tiến độ theo level
- phát hiện điểm nghẽn
- so sánh giữa các trainee
- kiểm tra việc dùng hint hoặc submit sai

#### b. Command Timeline

Hiển thị các command theo trục thời gian.

Thông tin gồm:

- loại command
- tùy chọn
- IP thực thi
- thời điểm thực hiện

Phù hợp để phân tích hành vi thao tác.

Lưu ý: thời gian là timestamp trong training, không phải thời gian thực.

![Visual](/img/TI-command-timeline.png)

---

### Results of Training Instance

Tổng hợp dữ liệu sau khi training kết thúc.

#### a. Dashboard

Hiển thị nhiều biểu đồ trong một màn hình:

- Score Development
- Score Scatter Plot
- Final Training Runs View

![Visual](/img/TI-dashboard.png)

**Score Development**  
Hiển thị sự thay đổi điểm theo thời gian.

![Visual](/img/TI-score-dev.png)

**Score Scatter Plot**  
So sánh điểm và thời gian hoàn thành.

![Visual](/img/TI-score-scatter.png)

**Final Training Runs View**  
Tóm tắt walkthrough của trainee.

![Visual](/img/TI-score-progress.png)

#### b. Assessment

Thống kê kết quả trả lời:

- số lượng lựa chọn
- tỉ lệ phần trăm
- phân bố câu trả lời

![Visual](/img/TI-assessment.png)

#### c. Aggregated Dashboard

Tổng hợp dữ liệu từ nhiều training instance.

![Visual](/img/TI-aggregated-dashboard.png)

Dùng để:

- so sánh nhiều đợt training
- đánh giá độ khó
- phân tích hành vi lặp lại

Các trực quan hóa chính:

**Training Instance Result**  
So sánh điểm giữa các instance.

![Visual](/img/TI-results.png)

**Time-score-hints Relationship**  
Phân tích mối quan hệ giữa thời gian, điểm và hint.

![Visual](/img/TI-time-score-hints.png)

**Wrong Answers Overview**  
Tỉ lệ đúng/sai theo level.

![Visual](/img/TI-wrong-answers-overview.png)

**Wrong Answers Details**  
Chi tiết câu trả lời theo level.

![Visual](/img/TI-wrong-answers-detail.png)

**Time and Score Aggregations**  
Tổng hợp thời gian và điểm.

![Visual](/img/TI-time-and-score-aggregations.png)

**Two Clusterable Features Comparison**  
So sánh hai đặc trưng hành vi.

![Visual](/img/TI-wrong-flags-submitted.png)

![Visual](/img/TI-time-spent-after-using-hint.png)

**Behavior Correlation Chart**  
Hiển thị tương quan giữa các chỉ số hành vi.

![Visual](/img/TI-behavior-correlation-chart.png)

**Walkthrough**  
Biểu diễn hành trình qua các level.

![Visual](/img/TI-walkthrough.png)

**Command Analysis**  
Phân tích command:

- correct commands
- wrong commands

![Visual](/img/TI-command-analysis.png)

Có thể hiển thị:

- full command
- IP
- số lần
- loại lỗi

Lưu ý: cần bấm Filter để áp dụng bộ lọc.

---

### 3. For Trainees

Sau khi hoàn thành training run, trainee có thể xem:

- Score Development
- Score Scatter Plot
- bảng so sánh với người khác
- Command Analysis
- Command Timeline

Giúp:

- đánh giá kết quả cá nhân
- so sánh với người khác
- hiểu điểm mạnh và điểm yếu

![Visual](/img/TR-results.png)

---

## IV. Tổng kết

Visualization Tools hỗ trợ phân tích dữ liệu theo hai hướng:

1. Adaptive Training: tập trung vào luồng giữa các phase và task
2. Linear Training: tập trung vào tiến độ, điểm số và hành vi

Instructor dùng để giám sát và cải thiện training.  
Trainee dùng để xem lại và hiểu quá trình học.
