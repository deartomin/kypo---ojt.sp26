---
title: Training Run
sidebar_position: 5
---

## Linear Training Run

**Linear Training Run** là nơi trainee truy cập và thực hiện bài huấn luyện tuyến tính theo thứ tự các level đã được thiết kế sẵn.

### 1. Training Runs Overview

Trang này gồm hai phần chính:

- **Access Training**: nhập access token để vào bài huấn luyện
- **Training Runs**: hiển thị danh sách các lần chạy huấn luyện của trainee

⚠️ **Lưu ý:**  
Nếu trainee đã vào một training run nhưng chưa hoàn thành, lần chạy đó sẽ được tiếp tục. Nếu trainee đã hoàn thành rồi, cần xóa run cũ trước khi bắt đầu lại.

<!-- [Ảnh: Linear Training Run Overview] -->

### 2. Training Run

Trong quá trình chạy, trainee sẽ đi qua các level theo thứ tự. Thanh điều hướng ở đầu trang hiển thị toàn bộ level trong bài.

Các loại level trong linear training gồm:

- **Assessment Level**
- **Info Level**
- **Access Level**
- **Training Level**

#### Assessment Level

Assessment Level dùng để trả lời câu hỏi đánh giá. Các dạng câu hỏi có thể gồm:

- **Free Form Question**
- **Multiple Choice Question**
- **Extended Matching Item**

<!-- [Ảnh: Assessment Level] -->

#### Info Level

Info Level hiển thị nội dung thông tin hoặc hướng dẫn mà trainee cần đọc trước khi tiếp tục.

<!-- [Ảnh: Info Level] -->

#### Access Level

Access Level cung cấp thông tin để trainee truy cập vào cloud hoặc local sandbox.

<!-- [Ảnh: Access Level] -->

#### Training Level

Training Level là nơi trainee thực hiện bài tập chính trong sandbox. Bên trái là nội dung nhiệm vụ, bên phải là topology và bảng điều khiển.

<!-- [Ảnh: Training Level] -->

##### VM Manipulation

Trong phần topology, trainee có thể thao tác với các node mạng và máy ảo. Một số thao tác chính gồm:

- **Open console**: mở CLI của máy
- **Open console (deprecated)**: mở web console cũ
- **Open GUI**: mở giao diện đồ họa
- **Copy host info to clipboard**: sao chép thông tin node

⚠️ **Lưu ý:**  
Với local sandbox, chỉ tùy chọn **Copy host info to clipboard** có thể khả dụng.

⚠️ **Lưu ý:**  
Các tùy chọn kết nối tới VM yêu cầu thông tin đăng nhập hợp lệ.

<!-- [Ảnh: VM Manipulation / Open console / Open GUI / Copy host info] -->

##### Hints

Nếu trainee bị kẹt, có thể mở các **hint** được cung cấp trong bài.

<!-- [Ảnh: Hints] -->

##### Solution

Nếu hint chưa đủ, trainee có thể chọn **Reveal Solution** để xem lời giải.

##### Submit

Sau khi tìm được đáp án, trainee nhập câu trả lời và nhấn **Submit** để sang level tiếp theo.

##### SSH Access

Ngoài Guacamole hoặc Spice, trainee cũng có thể dùng **SSH** để kết nối vào sandbox bằng nút **Get SSH Config**.

### 3. Training Run Results

Sau khi hoàn thành training run, trainee có thể xem phần trực quan hóa kết quả và hành vi trong quá trình làm bài.

<!-- [Ảnh: Training Run Results] -->

---

## Adaptive Training Run

**Adaptive Training Run** là nơi trainee thực hiện bài huấn luyện thích ứng. Khác với linear training, lộ trình của trainee có thể thay đổi tùy theo câu trả lời và kết quả trong quá trình học.

### 1. Training Runs Overview

Trang này cũng gồm hai phần chính:

- **Access Training**: nhập access token để vào bài huấn luyện
- **Training Runs**: xem danh sách các lần chạy huấn luyện

⚠️ **Lưu ý:**  
Nếu trainee đã truy cập một run nhưng chưa hoàn thành, hệ thống sẽ tiếp tục run đó thay vì tạo mới.

<!-- [Ảnh: Adaptive Training Run Overview] -->

### 2. Training Run

Trong adaptive training, trainee sẽ đi qua các phase theo thứ tự điều hướng của bài học. Thanh ở đầu trang hiển thị toàn bộ phase trong run.

Các loại phase chính gồm:

- **Questionnaire Phase**
- **Info Phase**
- **Access Phase**
- **Training Phase**

#### Questionnaire Phase

Questionnaire Phase dùng để trả lời các câu hỏi đánh giá hoặc khảo sát. Các dạng câu hỏi có thể gồm:

- **Free Form Question**
- **Multiple Choice Question**
- **Rating Form**

<!-- [Ảnh: Questionnaire Phase] -->

#### Info Phase

Info Phase hiển thị nội dung thông tin hoặc hướng dẫn cần đọc trước khi tiếp tục.

<!-- [Ảnh: Info Phase] -->

#### Access Phase

Access Phase cung cấp thông tin để truy cập cloud hoặc local sandbox.

<!-- [Ảnh: Access Phase] -->

#### Training Phase

Training Phase là nơi trainee thực hiện bài tập trong sandbox. Giao diện gồm nội dung nhiệm vụ, topology và vùng nhập đáp án.

<!-- [Ảnh: Training Phase] -->

##### VM Manipulation

Phần topology cho phép trainee thao tác với các node tương tự linear training. Các thao tác chính gồm:

- **Open console**
- **Open console (deprecated)**
- **Open GUI**
- **Copy host info to clipboard**

⚠️ **Lưu ý:**  
Với local sandbox, chỉ một số tùy chọn có thể khả dụng.

⚠️ **Lưu ý:**  
Các thao tác kết nối yêu cầu đúng thông tin đăng nhập của máy ảo.

<!-- [Ảnh: VM Manipulation / Console / GUI / Host info] -->

##### Solution

Trainee có thể chọn **Reveal Solution** để xem lời giải.

##### Submit

Sau khi có đáp án, trainee nhập câu trả lời và nhấn **Submit** để tiếp tục.

##### SSH Access

Trainee có thể tải cấu hình SSH bằng nút **Get SSH Config** để kết nối trực tiếp vào sandbox.

### 3. Training Run Results

Khi training run kết thúc, trainee có thể xem trực quan hóa kết quả và hành vi trong suốt quá trình học.

<!-- [Ảnh: Adaptive Training Run Results] -->
