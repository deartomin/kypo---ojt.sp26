---
title: Training Definition
sidebar_position: 3
---

## Linear Training Definition

**Linear Training Definition** dùng để tạo và quản lý các bài huấn luyện tuyến tính. Đây là nơi instructor cấu hình nội dung bài học, các level, câu hỏi, quyền truy cập và thông tin hiển thị cho trainee.

### 1. Linear Training Definition Overview

Trang này hiển thị danh sách các định nghĩa huấn luyện mà instructor có thể truy cập. Mỗi dòng tương ứng với một definition và cho phép thực hiện các thao tác cơ bản như:

![Linear Overview](/img/train3.jpg)

- **Info**: User với vai trò ROLE_TRAINING_ADMINISTRATOR có thể xem tất cả các Training Definition
- **Edit**: chỉnh sửa definition

![Linear Overview](/img/train4.jpg)

- **Delete**: xóa definition, và không thể xóa các training definition được sử dụng trong training instance

![Linear Overview](/img/train5.jpg)

- **Clone**: sao chép definition

![Linear Overview](/img/train7.jpg)

- **Download**: tải definition dưới dạng file JSON
- **Preview**: xem trước giao diện của trainee. Cách giải
  và hints được tự động hiện thị trong bản preview của training definition nhưng luôn ẩn đi, chỉ hiện tra nếu nhấp vào

![Linear Training Definition Overview](/img/train8.jpg)

- **Release / Unrelease / Archive**: thay đổi trạng thái definition

⚠️ **Lưu ý:**
Chỉ các definition ở trạng thái **Unreleased** mới có thể chỉnh sửa. Definition đã được dùng trong một **training instance** thì không thể xóa.

### 2. Add a New Definition

Có ba cách để tạo mới một linear training definition:

1. **Create a new definition**: tạo mới từ đầu
2. **Upload a definition**: tải lên từ file JSON
3. **Clone**: sao chép từ một definition có sẵn

Cách 1: Create a new definition

#### Create Linear Training Definition Panel

Khi nhấn **Create**, hệ thống mở form tạo definition mới. Instructor nhập các thông tin cơ bản như:

- **Title**
- **Description**
- **Notes for instructors**
- **Learning outcomes**

Sau khi nhấn **Save**, definition sẽ được tạo và có thể tiếp tục chỉnh sửa level và designers.

![Linear Overview](/img/train9.jpg)

#### Levels Panel

Levels Panel dùng để thêm, xóa, sắp xếp và chỉnh sửa các level trong bài huấn luyện. Instructor có thể thêm 4 loại level:

- **Training Level**
- **Assessment Level**
- **Info Level**
- **Access Level**

![Linear Overview](/img/train10.jpg)

![Linear Overview](/img/train11.jpg)

⚠️ **Lưu ý:**
Mọi thay đổi bên trong level cần được lưu bằng nút **Save**. Có thể kéo thả để thay đổi thứ tự các level.

##### I. Training Level

Training Level là nơi trainee thực hiện bài tập trong sandbox để tìm ra lời giải. Instructor có thể cấu hình:

- tiêu đề level
- nội dung bài tập
- đáp án / lời giải
- điểm số
- giới hạn câu trả lời sai
- yêu cầu command để hoàn thành
- variant answer nếu có

![Linear Overview](/img/train12.jpg)

Ngoài nội dung chính, level này còn hỗ trợ:

- **Hints**: gợi ý cho trainee

  ![Linear Overview](/img/train13.jpg)

  ![Linear Overview](/img/train14.jpg)

- **MITRE ATT&CK Techniques**: gắn kỹ thuật ATT&CK liên quan

  ![Linear Overview](/img/train15.jpg)

- **Expected Commands**: khai báo các lệnh mong đợi khi giải bài

![Linear Overview](/img/train16.jpg)

##### II. Assessment Level

Assessment Level dùng để tạo phần kiểm tra bằng câu hỏi.

![Linear Overview](/img/train17.jpg)

![Linear Overview](/img/train18.jpg)

![Linear Overview](/img/train19.jpg)

Instructor có thể tạo:

- **Free Form Question**

  ![Linear Overview](/img/train20.jpg)

- **Multiple Choice Question**

  ![Linear Overview](/img/train21.jpg)

- **Extended Matching Items Question**

  ![Linear Overview](/img/train22.jpg)

  Level này phù hợp cho bài kiểm tra, câu hỏi đánh giá hoặc questionnaire.

##### III. Info Level

Info Level dùng để hiển thị nội dung hướng dẫn hoặc thông tin mà trainee cần đọc trước khi tiếp tục.

![Linear Overview](/img/train23.jpg)

##### IV. Access Level

Access Level cung cấp thông tin để trainee truy cập vào cloud sandbox hoặc local sandbox. Level này có thể chứa:

- nội dung hướng dẫn truy cập
- passkey để mở level tiếp theo
- placeholder variables được thay bằng giá trị thực khi training run bắt đầu

![Linear Overview](/img/train24.jpg)

#### Designers Panel

Designers Panel dùng để thêm hoặc xóa các designer tham gia xây dựng training definition.

![Linear Overview](/img/train26.jpg)

Cách 2: Upload a Definition From JSON File

Instructor có thể tải lên một definition đã xuất trước đó ở định dạng **JSON**. Cách này hữu ích khi muốn tái sử dụng hoặc khôi phục lại một training definition cũ.

![Linear Overview](/img/train27.jpg)

#### Linear Training Definition Detail

Trang chi tiết hiển thị thông tin tổng quan của definition, bao gồm:

- số lượng level
- thời gian chỉnh sửa gần nhất
- thời lượng ước tính
- trạng thái hiện tại
- danh sách các level

![Linear Overview](/img/train28.jpg)

Tại đây instructor có thể mở rộng từng level để xem chi tiết nội dung.
**Assessment level** hiển thị thêm câu hỏi và đáp án đúng.

![Linear Overview](/img/train29.jpg)

**Training level** hiển thị nội dung, lời giải và các hint liên quan.

![Linear Overview](/img/train30.jpg)

## Adaptive Training Definition

**Adaptive Training Definition** dùng để tạo và quản lý các bài huấn luyện thích ứng.

Về mặt quản lý definition, phần này có nhiều điểm **tương tự Linear Training Definition** như danh sách definition, các thao tác quản trị, cách tạo mới, upload JSON, clone, thêm designers và xem detail.

Điểm khác biệt chính là adaptive training cho phép xây dựng **nhiều phase** và điều hướng trainee dựa trên kết quả, câu trả lời và hiệu suất trong quá trình học.

### 1. Adaptive Training Definition Overview

Trang này hiển thị danh sách các adaptive training definition mà instructor có thể truy cập.

![Linear Overview](/img/adap1.jpg)

Về tổng thể, màn hình này **tương tự phần Linear Training Definition Overview**: mỗi definition hỗ trợ các thao tác quản trị cơ bản như:

- **Edit**: chỉnh sửa definition
- **Delete**: xóa definition
- **Clone**: sao chép definition
- **Download**: tải definition dưới dạng file JSON
- **Release / Unrelease / Archive**: thay đổi trạng thái definition

⚠️ **Lưu ý:**
Phần này áp dụng quy tắc **giống linear training**:

- Chỉ definition ở trạng thái **Unreleased** mới có thể chỉnh sửa
- Definition đã được dùng trong một **training instance** thì không thể xóa

### 2. Add a New Definition

Cách tạo mới adaptive training definition **giống với linear training definition**, gồm 3 cách:

1. **Create a new definition**: tạo mới từ đầu
2. **Upload a definition**: tải lên từ file JSON
3. **Clone**: sao chép từ một definition có sẵn

Cách 1: Create a new definition

#### Create Adaptive Training Definition Panel

Khi nhấn **Create**, hệ thống mở form tạo definition mới. Phần thông tin cơ bản này **tương tự linear training**, instructor nhập các trường:

- **Title**
- **Description**
- **Notes for instructors**
- **Learning outcomes**

Sau khi nhấn **Save**, definition sẽ được tạo và có thể tiếp tục chỉnh sửa **phases** và **designers**.

![Linear Overview](/img/adap2.jpg)

#### Phases Panel

Phases Panel là phần tương ứng với **Levels Panel** trong linear training. Instructor có thể:

- thêm phase mới
- xóa phase
- sắp xếp thứ tự phase
- chỉnh sửa nội dung từng phase

Adaptive training hỗ trợ 5 loại phase:

- **Training Phase**
- **Adaptive Questionnaire Phase**
- **General Questionnaire Phase**
- **Info Phase**
- **Access Phase**

![Linear Overview](/img/adap3.jpg)

⚠️ **Lưu ý:**
Phần thao tác sử dụng **giống linear training**:

- Mọi thay đổi bên trong phase cần được lưu bằng nút **Save**
- Có thể kéo thả để thay đổi thứ tự các phase

##### I. Training Phase

Training Phase là phần gần tương ứng với **Training Level** trong linear training: trainee thực hiện bài tập trong sandbox, instructor cấu hình nội dung, đáp án, giới hạn trả lời sai và các task liên quan.

Tuy nhiên, điểm khác biệt quan trọng của adaptive training là phase này có thể sử dụng **Decision Matrix** để xác định phase tiếp theo dựa trên hiệu suất của trainee, ví dụ như:

- số câu questionnaire đã trả lời
- thời gian hoàn thành
- từ khóa đã dùng
- có mở solution hay không
- số câu trả lời đã nộp

![Linear Overview](/img/adap4.jpg)

Ngoài ra, phase này cũng hỗ trợ nhiều thành phần **tương tự linear training**, bao gồm:

- **MITRE ATT&CK Techniques**: gắn kỹ thuật ATT&CK liên quan
- **Expected Commands**: khai báo các lệnh mong đợi

Bên cạnh đó, adaptive training có thêm các tính năng đặc thù:

- **Tasks**: tạo và quản lý các task variant

![Linear Overview](/img/adap5.jpg)

![Linear Overview](/img/adap6.jpg)

- **Single Trainee Performance Simulation**: mô phỏng lộ trình của một trainee

![Linear Overview](/img/adap7.jpg)

##### II. Adaptive Questionnaire Phase

Phase này là phần đặc thù của adaptive training, dùng để tạo các câu hỏi phục vụ **đánh giá và điều hướng luồng học**.

Instructor có thể tạo nhiều loại câu hỏi như:

- **Free Form**
- **Multiple Choice**
- **Rating Form**

So với **Assessment Level** của linear training, phần này có mục đích gần giống ở chỗ đều dùng câu hỏi để đánh giá trainee. Tuy nhiên, **Adaptive Questionnaire Phase** mạnh hơn vì có thể gắn với cơ chế điều hướng.

Phase này còn hỗ trợ **Question-Phase Relations**, cho phép liên kết các bộ câu hỏi với từng training phase tương ứng.

![Linear Overview](/img/adap8.jpg)

##### III. General Questionnaire Phase

General Questionnaire Phase cũng dùng để tạo danh sách câu hỏi. Về mặt chức năng, nó khá giống phần questionnaire / assessment trong linear training, nhưng **không có liên kết phase như adaptive questionnaire**.

Loại phase này phù hợp để:

- khảo sát chung
- thu thập phản hồi sau bài học
- đặt các câu hỏi không tham gia vào logic điều hướng

Instructor có thể thêm các loại câu hỏi như:

- **Free Form**
- **Multiple Choice**
- **Rating Form**

##### IV. Info Phase

Info Phase có vai trò **tương tự Info Level** trong linear training: dùng để hiển thị nội dung hướng dẫn hoặc thông tin mà trainee cần đọc trước khi tiếp tục.

![Linear Overview](/img/adap8.jpg)

##### V. Access Phase

Access Phase có vai trò **tương tự Access Level** trong linear training: cung cấp thông tin để trainee truy cập cloud sandbox hoặc local sandbox.

Phase này có thể chứa:

- nội dung hướng dẫn truy cập
- passkey để mở phase tiếp theo
- placeholder variables được thay bằng giá trị thực khi training run bắt đầu

![Linear Overview](/img/adap9.jpg)

### 4. Designers Panel

Designers Panel **giống với phần Designers Panel của linear training definition**, dùng để thêm hoặc xóa các designer tham gia xây dựng adaptive training definition.

![Linear Overview](/img/adap10.jpg)

Cách 2: Upload a Definition From JSON File

Phần này **giống linear training**: instructor có thể tải lên một adaptive training definition đã xuất trước đó ở định dạng **JSON** để tái sử dụng hoặc khôi phục definition cũ.

![Linear Overview](/img/adap11.jpg)

### Adaptive Training Definition Detail

Trang chi tiết hiển thị thông tin tổng quan của definition. Về bố cục và cách trình bày, phần này **tương tự Linear Training Definition Detail**, bao gồm:

- số lượng phase
- thời gian chỉnh sửa gần nhất
- thời lượng ước tính
- trạng thái hiện tại
- danh sách các phase

![Linear Overview](/img/adap12.jpg)

Tại đây instructor có thể mở rộng từng phase để xem chi tiết nội dung.

Một số thông tin hiển thị theo từng loại phase:

- **Info phase**: hiển thị nội dung thông tin
- **Adaptive questionnaire phase**: hiển thị số lượng câu hỏi, nội dung và đáp án đúng
- **General questionnaire phase**: hiển thị câu hỏi và lựa chọn
- **Training phase**: hiển thị nội dung task, lời giải và các thông tin liên quan

![Linear Overview](/img/adap13.jpg)

![Linear Overview](/img/adap14.jpg)

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

![Linear Overview](/img/mitre1.jpg)

## Instance Simulator

**Instance Simulator** dùng để phân tích kết quả của một **adaptive training instance** sau khi huấn luyện kết thúc. Công cụ này hỗ trợ instructor đánh giá luồng đi của trainee và cải thiện adaptive training definition cho các lần huấn luyện tiếp theo.

### Post-training adaptive instance simulator

Trang này cho phép instructor tải dữ liệu của một adaptive training instance đã hoàn thành để mô phỏng và xem lại quá trình phân nhánh trong huấn luyện.

Simulator có thể được truy cập bằng nút **Simulating Tool** trên trang **Adaptive Training Definition Overview**. Công cụ này làm việc với dữ liệu được export từ các instance trước đó.

⚠️ **Lưu ý:**
Instructor có thể export dữ liệu instance từ trang **Training Instances Overview**.

![Linear Overview](/img/smi1.jpg)

### Adaptive Training Definition Panel

Panel này hiển thị adaptive training definition đã được tải lên. Tại đây instructor có thể:

- điều chỉnh **decision matrix**
- chỉnh sửa các ràng buộc của phase đã chọn
- xem danh sách task ở chế độ chỉ đọc
- xem các quan hệ của pre-training questionnaire nếu có

### Instance Simulation

Sau khi nhấn **Generate**, hệ thống sẽ tạo mô phỏng hiệu suất của người tham gia dựa trên dữ liệu instance đã tải lên. Kết quả được hiển thị bằng sơ đồ Sankey để thể hiện đường đi của trainee qua từng phase và task trong bài huấn luyện.

Công cụ này giúp instructor:

- xem cách trainee di chuyển qua các phase
- so sánh số lượng người đi vào từng nhánh
- đánh giá hiệu quả của decision matrix
- điều chỉnh adaptive training definition cho phù hợp hơn

![Linear Overview](/img/smi2.jpg)
