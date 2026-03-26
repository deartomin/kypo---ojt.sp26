---
title: Training Definition
sidebar_position: 3
---

## Linear Training Definition

**Linear Training Definition** dùng để tạo và quản lý các bài huấn luyện tuyến tính. Đây là nơi instructor cấu hình nội dung bài học, các level, câu hỏi, quyền truy cập và thông tin hiển thị cho trainee.

### 1. Linear Training Definition Overview

Trang này hiển thị danh sách các định nghĩa huấn luyện mà instructor có thể truy cập. Mỗi dòng tương ứng với một definition và cho phép thực hiện các thao tác cơ bản như:

- **Edit**: chỉnh sửa definition
- **Delete**: xóa definition
- **Clone**: sao chép definition
- **Download**: tải definition dưới dạng file JSON
- **Preview**: xem trước giao diện của trainee
- **Release / Unrelease / Archive**: thay đổi trạng thái definition

⚠️ **Lưu ý:**  
Chỉ các definition ở trạng thái **Unreleased** mới có thể chỉnh sửa. Definition đã được dùng trong một **training instance** thì không thể xóa.

<!-- [Ảnh: Linear Training Definition Overview] -->
<!-- [Ảnh: Edit / Delete / Clone / Download / Preview / Release] -->

### 2. Add a New Definition

Có ba cách để tạo mới một linear training definition:

1. **Create a new definition**: tạo mới từ đầu
2. **Upload a definition**: tải lên từ file JSON
3. **Clone**: sao chép từ một definition có sẵn

#### Create Linear Training Definition Panel

Khi nhấn **Create**, hệ thống mở form tạo definition mới. Instructor nhập các thông tin cơ bản như:

- **Title**
- **Description**
- **Notes for instructors**
- **Learning outcomes**

Sau khi nhấn **Save**, definition sẽ được tạo và có thể tiếp tục chỉnh sửa level và designers.

<!-- [Ảnh: Create Linear Training Definition Panel] -->

### 3. Levels Panel

Levels Panel dùng để thêm, xóa, sắp xếp và chỉnh sửa các level trong bài huấn luyện. Instructor có thể thêm 4 loại level:

- **Training Level**
- **Assessment Level**
- **Info Level**
- **Access Level**

⚠️ **Lưu ý:**  
Mọi thay đổi bên trong level cần được lưu bằng nút **Save**. Có thể kéo thả để thay đổi thứ tự các level.

<!-- [Ảnh: Levels Panel] -->

#### I. Training Level

Training Level là nơi trainee thực hiện bài tập trong sandbox để tìm ra lời giải. Instructor có thể cấu hình:

- tiêu đề level
- nội dung bài tập
- đáp án / lời giải
- điểm số
- giới hạn câu trả lời sai
- yêu cầu command để hoàn thành
- variant answer nếu có

Ngoài nội dung chính, level này còn hỗ trợ:

- **Hints**: gợi ý cho trainee
- **MITRE ATT&CK Techniques**: gắn kỹ thuật ATT&CK liên quan
- **Expected Commands**: khai báo các lệnh mong đợi khi giải bài

<!-- [Ảnh: Training Level] -->
<!-- [Ảnh: Hints / MITRE ATT&CK / Expected Commands] -->

#### II. Assessment Level

Assessment Level dùng để tạo phần kiểm tra bằng câu hỏi. Instructor có thể tạo:

- **Free Form Question**
- **Multiple Choice Question**
- **Extended Matching Items Question**

Level này phù hợp cho bài kiểm tra, câu hỏi đánh giá hoặc questionnaire.

<!-- [Ảnh: Assessment Level] -->
<!-- [Ảnh: Questions Panel] -->

#### III. Info Level

Info Level dùng để hiển thị nội dung hướng dẫn hoặc thông tin mà trainee cần đọc trước khi tiếp tục.

<!-- [Ảnh: Info Level] -->

#### IV. Access Level

Access Level cung cấp thông tin để trainee truy cập vào cloud sandbox hoặc local sandbox. Level này có thể chứa:

- nội dung hướng dẫn truy cập
- passkey để mở level tiếp theo
- placeholder variables được thay bằng giá trị thực khi training run bắt đầu

<!-- [Ảnh: Access Level] -->

### 4. Designers Panel

Designers Panel dùng để thêm hoặc xóa các designer tham gia xây dựng training definition.

<!-- [Ảnh: Designers Panel] -->

### 5. Upload a Definition From JSON File

Instructor có thể tải lên một definition đã xuất trước đó ở định dạng **JSON**. Cách này hữu ích khi muốn tái sử dụng hoặc khôi phục lại một training definition cũ.

<!-- [Ảnh: Upload a Definition From JSON File] -->

### 6. Linear Training Definition Detail

Trang chi tiết hiển thị thông tin tổng quan của definition, bao gồm:

- số lượng level
- thời gian chỉnh sửa gần nhất
- thời lượng ước tính
- trạng thái hiện tại
- danh sách các level

Tại đây instructor có thể mở rộng từng level để xem chi tiết nội dung.  
**Assessment level** hiển thị thêm câu hỏi và đáp án đúng.  
**Training level** hiển thị nội dung, lời giải và các hint liên quan.

<!-- [Ảnh: Linear Training Definition Detail] -->
<!-- [Ảnh: Detail của Assessment Level / Training Level] -->

## Adaptive Training Definition

**Adaptive Training Definition** dùng để tạo và quản lý các bài huấn luyện thích ứng. Khác với linear training, phần này cho phép xây dựng nhiều phase và điều hướng người học dựa trên kết quả, câu trả lời và hiệu suất trong quá trình học.

### 1. Adaptive Training Definition Overview

Trang này hiển thị danh sách các adaptive training definition mà instructor có thể truy cập. Mỗi definition hỗ trợ các thao tác cơ bản như:

- **Edit**: chỉnh sửa definition
- **Delete**: xóa definition
- **Clone**: sao chép definition
- **Download**: tải definition dưới dạng file JSON
- **Release / Unrelease / Archive**: thay đổi trạng thái definition

⚠️ **Lưu ý:**  
Chỉ definition ở trạng thái **Unreleased** mới có thể chỉnh sửa. Definition đã được dùng trong một **training instance** thì không thể xóa.

<!-- [Ảnh: Adaptive Training Definition Overview] -->
<!-- [Ảnh: Edit / Delete / Clone / Download / Release] -->

### 2. Add a New Definition

Có ba cách để tạo mới một adaptive training definition:

1. **Create a new definition**: tạo mới từ đầu
2. **Upload a definition**: tải lên từ file JSON
3. **Clone**: sao chép từ một definition có sẵn

#### Create Adaptive Training Definition Panel

Khi nhấn **Create**, hệ thống mở form tạo definition mới. Instructor nhập các thông tin cơ bản như:

- **Title**
- **Description**
- **Notes for instructors**
- **Learning outcomes**

Sau khi nhấn **Save**, definition sẽ được tạo và có thể tiếp tục chỉnh sửa **phases** và **designers**.

<!-- [Ảnh: Create Adaptive Training Definition Panel] -->

### 3. Phases Panel

Phases Panel dùng để thêm, xóa, sắp xếp và chỉnh sửa các phase trong adaptive training. Instructor có thể thêm 5 loại phase:

- **Training Phase**
- **Adaptive Questionnaire Phase**
- **General Questionnaire Phase**
- **Info Phase**
- **Access Phase**

⚠️ **Lưu ý:**  
Mọi thay đổi bên trong phase cần được lưu bằng nút **Save**. Có thể kéo thả để thay đổi thứ tự các phase.

<!-- [Ảnh: Phases Panel] -->

#### I. Training Phase

Training Phase là nơi trainee thực hiện bài tập trong sandbox. Instructor có thể cấu hình nội dung phase, đáp án, giới hạn trả lời sai và các task tương ứng.

Điểm khác biệt của adaptive training là phase này có thể dùng **Decision Matrix** để xác định phase tiếp theo dựa trên hiệu suất của trainee, ví dụ như:

- số câu questionnaire đã trả lời
- thời gian hoàn thành
- từ khóa đã dùng
- có mở solution hay không
- số câu trả lời đã nộp

Ngoài ra, phase này còn hỗ trợ:

- **Tasks**: tạo và quản lý các task variant
- **MITRE ATT&CK Techniques**: gắn kỹ thuật ATT&CK liên quan
- **Expected Commands**: khai báo các lệnh mong đợi
- **Single Trainee Performance Simulation**: mô phỏng lộ trình của một trainee

<!-- [Ảnh: Training Phase / Decision Matrix] -->
<!-- [Ảnh: Tasks / MITRE ATT&CK / Expected Commands / Simulation] -->

#### II. Adaptive Questionnaire Phase

Adaptive Questionnaire Phase dùng để tạo các câu hỏi phục vụ đánh giá và điều hướng luồng học. Instructor có thể tạo nhiều loại câu hỏi như:

- **Free Form**
- **Multiple Choice**
- **Rating Form**

Phase này còn hỗ trợ **Question-Phase Relations**, cho phép liên kết các bộ câu hỏi với từng training phase tương ứng.

<!-- [Ảnh: Adaptive Questionnaire Phase] -->
<!-- [Ảnh: Questions / Question-Phase Relations] -->

#### III. General Questionnaire Phase

General Questionnaire Phase cũng dùng để tạo danh sách câu hỏi, nhưng không có liên kết phase như adaptive questionnaire. Loại phase này phù hợp để khảo sát chung hoặc lấy phản hồi sau bài học.

Instructor có thể thêm các loại câu hỏi như:

- **Free Form**
- **Multiple Choice**
- **Rating Form**

<!-- [Ảnh: General Questionnaire Phase] -->

#### IV. Info Phase

Info Phase dùng để hiển thị nội dung hướng dẫn hoặc thông tin cần đọc trước khi trainee tiếp tục.

<!-- [Ảnh: Info Phase] -->

#### V. Access Phase

Access Phase cung cấp thông tin để trainee truy cập cloud sandbox hoặc local sandbox. Phase này có thể chứa:

- nội dung hướng dẫn truy cập
- passkey để mở phase tiếp theo
- placeholder variables được thay bằng giá trị thực khi training run bắt đầu

<!-- [Ảnh: Access Phase] -->

### 4. Designers Panel

Designers Panel dùng để thêm hoặc xóa các designer tham gia xây dựng adaptive training definition.

<!-- [Ảnh: Designers Panel] -->

### 5. Upload a Definition From JSON File

Instructor có thể tải lên một adaptive training definition đã xuất trước đó ở định dạng **JSON**. Cách này hữu ích khi muốn tái sử dụng hoặc khôi phục một definition cũ.

<!-- [Ảnh: Upload a Definition From JSON File] -->

### 6. Adaptive Training Definition Detail

Trang chi tiết hiển thị thông tin tổng quan của definition, bao gồm:

- số lượng phase
- thời gian chỉnh sửa gần nhất
- thời lượng ước tính
- trạng thái hiện tại
- danh sách các phase

Tại đây instructor có thể mở rộng từng phase để xem chi tiết nội dung.

- **Info phase** hiển thị nội dung thông tin
- **Adaptive questionnaire phase** hiển thị số lượng câu hỏi, nội dung và đáp án đúng
- **General questionnaire phase** hiển thị câu hỏi và lựa chọn
- **Training phase** hiển thị nội dung task, lời giải và các thông tin liên quan

<!-- [Ảnh: Adaptive Training Definition Detail] -->
<!-- [Ảnh: Detail của Questionnaire / Training Phase] -->

## MITRE ATT&CK Matrix

**MITRE ATT&CK Matrix** dùng để trực quan hóa các kỹ thuật MITRE ATT&CK được bao phủ trong các training definition. Công cụ này giúp instructor nhanh chóng biết được bài huấn luyện đang tập trung vào tactic hoặc technique nào.

### Mitre Technique Service

Trang này hiển thị ma trận MITRE ATT&CK kèm thông tin bổ sung từ các **linear** và **adaptive training definition**. Ma trận này hỗ trợ instructor khi chọn bài huấn luyện phù hợp, đồng thời giúp xác định những chủ đề chưa được bao phủ.

Ma trận có thể được mở bằng nút **MITRE ATT&CK Techniques** trên trang **Linear / Adaptive Training Definition Overview**.

⚠️ **Lưu ý:**  
Phiên bản MITRE ATT&CK matrix được sử dụng ở đây là bản từ **tháng 10/2021**.

⚠️ **Lưu ý:**  
Ma trận này chỉ hiển thị các **released training definitions**.

Ngoài ra, trainee cũng có thể xem một phiên bản tương tự từ trang **Training Runs Overview**. Phiên bản này cho phép xem các chủ đề đã được học thông qua những training run đã chơi trước đó.

⚠️ **Lưu ý:**  
Trainee chỉ có thể xem các training definition đã chơi khi các training run tương ứng vẫn còn tồn tại.

<!-- [Ảnh: MITRE ATT&CK Matrix] -->

## Instance Simulator

**Instance Simulator** dùng để phân tích kết quả của một **adaptive training instance** sau khi huấn luyện kết thúc. Công cụ này hỗ trợ instructor đánh giá luồng đi của trainee và cải thiện adaptive training definition cho các lần huấn luyện tiếp theo.

### Post-training adaptive instance simulator

Trang này cho phép instructor tải dữ liệu của một adaptive training instance đã hoàn thành để mô phỏng và xem lại quá trình phân nhánh trong huấn luyện.

Simulator có thể được truy cập bằng nút **Simulating Tool** trên trang **Adaptive Training Definition Overview**. Công cụ này làm việc với dữ liệu được export từ các instance trước đó.

⚠️ **Lưu ý:**  
Instructor có thể export dữ liệu instance từ trang **Training Instances Overview**.

<!-- [Ảnh: Post-training adaptive instance simulator] -->

### Adaptive Training Definition Panel

Panel này hiển thị adaptive training definition đã được tải lên. Tại đây instructor có thể:

- điều chỉnh **decision matrix**
- chỉnh sửa các ràng buộc của phase đã chọn
- xem danh sách task ở chế độ chỉ đọc
- xem các quan hệ của pre-training questionnaire nếu có

<!-- [Ảnh: Adaptive Training Definition Panel] -->

### Instance Simulation

Sau khi nhấn **Generate**, hệ thống sẽ tạo mô phỏng hiệu suất của người tham gia dựa trên dữ liệu instance đã tải lên. Kết quả được hiển thị bằng sơ đồ Sankey để thể hiện đường đi của trainee qua từng phase và task trong bài huấn luyện.

Công cụ này giúp instructor:

- xem cách trainee di chuyển qua các phase
- so sánh số lượng người đi vào từng nhánh
- đánh giá hiệu quả của decision matrix
- điều chỉnh adaptive training definition cho phù hợp hơn

<!-- [Ảnh: Instance Simulation / Sankey Diagram] -->
