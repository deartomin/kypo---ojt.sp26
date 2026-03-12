# Phân tích kiến trúc KYPO Microservices Architecture

## Tổng quan

KYPO Cyber Range Platform không được xây dựng như một hệ thống nguyên khối (monolithic) mà được thiết kế theo kiến trúc microservices. Trong mô hình này, mỗi thành phần chức năng được triển khai dưới dạng dịch vụ độc lập và được container hóa bằng Docker.

Các dịch vụ giao tiếp với nhau thông qua REST API, giúp hệ thống linh hoạt, dễ mở rộng và dễ bảo trì.

---

## Sơ đồ kiến trúc hệ thống

![KYPO Microservices Architecture](/img/Graph.png)

## Các lớp trong kiến trúc hệ thống

Kiến trúc microservices của KYPO Cyber Range được chia thành ba lớp chính:

- Frontend (User Interface)
- Backend Microservices
- Infrastructure & Automation

Ba lớp này phối hợp với nhau thông qua REST API để cung cấp môi trường đào tạo an ninh mạng linh hoạt và tự động.

---

## Frontend (User Interface)

Frontend của hệ thống là **KYPO Angular Portal**, đóng vai trò là giao diện web trung tâm cho toàn bộ hệ thống.

Portal phục vụ hai nhóm người dùng chính:

- Administrator / Instructor
- Student / Trainee

Các chức năng chính của Portal:

- Thu thập yêu cầu từ người dùng (đăng nhập, tạo training, tham gia lab...)
- Gửi request đến các backend services thông qua REST API
- Hiển thị kết quả trả về như trạng thái lab, thông tin người dùng, quyền truy cập...

Frontend chỉ đảm nhiệm phần giao diện và tương tác người dùng, trong khi toàn bộ logic nghiệp vụ được xử lý ở backend.

---

## Backend Microservices

Lớp backend là trung tâm xử lý logic của hệ thống. Các chức năng được chia thành nhiều microservices độc lập.

### Xác thực và quản lý người dùng

Người dùng đăng nhập thông qua KYPO Angular Portal và được chuyển đến hệ thống xác thực sử dụng **Keycloak OIDC**.

Keycloak thực hiện:

- Authentication (xác thực người dùng)
- Cấp Access Token (OIDC / JWT)

Sau khi xác thực thành công, token này sẽ được các service backend sử dụng để xác định quyền truy cập của người dùng.

### User Management Service

User Management Service chịu trách nhiệm:

- Quản lý thông tin người dùng
- Xác định role (admin / instructor / student)
- Cung cấp thông tin user cho các service khác

Các service khác không xác thực trực tiếp người dùng mà tin cậy token do Keycloak cấp.

### Training Service

Training Service chịu trách nhiệm quản lý toàn bộ logic đào tạo:

- Quản lý course và training
- Quản lý scenario
- Quản lý topology lab
- Xác định số lượng VM cần thiết
- Quản lý tiến độ của người học

Service này quyết định khi nào cần tạo môi trường sandbox cho người học.

Training Service cũng có thể gọi REST API của User Management Service để kiểm tra:

- User là ai
- Thuộc role nào
- Có quyền tạo hoặc tham gia training hay không

Điều này giúp đảm bảo việc phân quyền được quản lý tập trung.

### Sandbox Service

Sandbox Service đóng vai trò là thành phần điều phối việc triển khai môi trường lab.

Training Service gửi yêu cầu tạo môi trường đến Sandbox Service, bao gồm:

- số lượng VM
- loại hệ điều hành
- network topology
- thông tin scenario

Sandbox Service thực hiện:

- Authentication và Authorization
- Quản lý quota
- Quản lý vòng đời sandbox (create / reset / destroy)

Sandbox Service được chia thành hai phần:

- Sandbox API Gateway
- Sandbox Infrastructure Orchestration

API Gateway tiếp nhận request từ Training Service và chuyển đến lớp orchestration để triển khai hạ tầng.

---

## Infrastructure & Automation

Lớp hạ tầng chịu trách nhiệm triển khai và cấu hình các môi trường máy ảo.

### OpenStack

Hệ thống sử dụng **OpenStack** để cung cấp tài nguyên hạ tầng cloud.

OpenStack chịu trách nhiệm:

- tạo máy ảo (VM)
- tạo network
- gán IP
- quản lý security group

Chỉ Sandbox Infrastructure Orchestration mới giao tiếp trực tiếp với OpenStack.

### Terraform (Infrastructure as Code)

Sandbox Service sử dụng **KYPO Terraform Client** để triển khai hạ tầng dưới dạng Infrastructure as Code.

Terraform thực hiện:

- lập kế hoạch triển khai
- tạo VM
- tạo network
- cấu hình tài nguyên trên OpenStack

### Ansible Automation

Sau khi các VM được tạo, hệ thống sử dụng **Ansible** để tự động cấu hình môi trường.

Ansible thực hiện:

- cấu hình hệ điều hành
- cài đặt các công cụ cần thiết
- thiết lập network nội bộ
- triển khai scenario
- tạo các lỗ hổng giả lập phục vụ đào tạo

Nhờ đó môi trường sandbox được thiết lập hoàn toàn tự động.

---

## Luồng hoạt động của hệ thống

Quy trình hoạt động của KYPO Cyber Range diễn ra theo các bước sau:

1. Người dùng đăng nhập vào KYPO Angular Portal
2. Portal chuyển yêu cầu xác thực đến Keycloak
3. Sau khi xác thực thành công, Keycloak cấp Access Token
4. Portal gửi request đến Training Service
5. Training Service yêu cầu Sandbox Service tạo môi trường lab
6. Sandbox Service sử dụng Terraform để triển khai hạ tầng trên OpenStack
7. Ansible cấu hình VM và cài đặt scenario
8. Trạng thái môi trường được trả về Sandbox Service
9. Training Service cập nhật trạng thái và gửi kết quả về Portal
10. Người dùng nhận thông tin truy cập và bắt đầu thực hành

---

## Đặc điểm của kiến trúc

### Isolation

Mỗi người học được cấp một môi trường sandbox riêng biệt, đảm bảo không ảnh hưởng đến các sandbox khác.

### Scalability

Nhờ kiến trúc microservices, các dịch vụ như Training Service hoặc User Management Service có thể được mở rộng độc lập mà không ảnh hưởng toàn hệ thống.

### Reproducibility

Việc sử dụng Infrastructure as Code giúp hệ thống triển khai hàng loạt môi trường giống hệt nhau một cách nhanh chóng và nhất quán.

### Centralized Security

Hệ thống xác thực tập trung thông qua Keycloak giúp tăng cường bảo mật và giảm rủi ro tấn công.

### Full Automation

Sự kết hợp giữa Terraform và Ansible tạo nên quy trình triển khai môi trường lab hoàn toàn tự động.
