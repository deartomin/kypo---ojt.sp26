---
title: Kiến trúc Microservices
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Phân tích kiến trúc Microservices của KYPO

## Tổng quan

KYPO Cyber Range Platform được thiết kế theo kiến trúc **microservices** thay vì mô hình nguyên khối (monolithic). Trong hệ thống này, mỗi thành phần chức năng hoạt động như một dịch vụ độc lập, được đóng gói bằng Docker container.

Các dịch vụ tương tác với nhau thông qua REST API, giúp hệ thống đạt được sự linh hoạt, khả năng mở rộng cao và thuận tiện trong bảo trì.

---

## Sơ đồ kiến trúc hệ thống

![KYPO Microservices Architecture](/img/Graph.png)

## Các lớp kiến trúc chính

Hệ thống được chia thành ba lớp chiến lược:

1. **Frontend (User Interface):** Giao diện tương tác người dùng.
2. **Backend Microservices:** Trung tâm xử lý logic nghiệp vụ.
3. **Infrastructure & Automation:** Quản lý hạ tầng và tự động hóa.

Các lớp này phối hợp chặt chẽ qua REST API để cung cấp một môi trường đào tạo an ninh mạng tự động hóa hoàn toàn.

---

## Frontend (User Interface)

**KYPO Angular Portal** là giao diện web trung tâm, phục vụ hai nhóm đối tượng:

- Administrator / Instructor (Quản trị viên và Giảng viên).
- Student / Trainee (Học viên).

**Chức năng chính:**

- Tiếp nhận yêu cầu: Đăng nhập, khởi tạo khóa học, tham gia lab.
- Điều phối request: Gửi yêu cầu đến các dịch vụ backend qua REST API.
- Hiển thị trạng thái: Cập nhật tình trạng lab, thông tin quyền truy cập và tiến độ học tập.

---

## Backend Microservices

Đây là "bộ não" điều khiển mọi logic nghiệp vụ của hệ thống, bao gồm các dịch vụ độc lập:

### Xác thực và quản lý người dùng

Hệ thống sử dụng **Keycloak OIDC** để quản lý tập trung:

- **Authentication:** Xác thực danh tính người dùng.
- **Authorization:** Cấp phát Access Token (OIDC / JWT) để định danh quyền hạn trong toàn hệ thống.

### User Management Service

- Quản lý thông tin chi tiết và vai trò (role) của người dùng.
- Cung cấp dữ liệu định danh cho các dịch vụ khác dựa trên token từ Keycloak.

### Training Service

Đảm nhiệm logic đào tạo cốt lõi:

- Quản lý khóa học, kịch bản (scenario) và cấu trúc lab (topology).
- Theo dõi tiến độ học viên và quyết định thời điểm khởi tạo môi trường thực hành.

### Sandbox Service

Thành phần điều phối triển khai môi trường Lab (sandbox):

- Tiếp nhận yêu cầu từ Training Service về số lượng VM, hệ điều hành và cấu hình mạng.
- Quản lý vòng đời sandbox (khởi tạo, đặt lại, hủy bỏ).
- Gồm hai phần: **Sandbox API Gateway** (tiếp nhận request) và **Sandbox Infrastructure Orchestration** (điều phối hạ tầng).

---

## Infrastructure & Automation

Lớp hạ tầng chịu trách nhiệm biến các yêu cầu logic thành tài nguyên máy ảo thực tế.

### OpenStack

Nền tảng Cloud cung cấp tài nguyên hạ tầng:

- Khởi tạo máy ảo (VM), mạng ảo (Network) và gán IP.
- Quản lý các nhóm bảo mật (Security Groups).

### Terraform (Infrastructure as Code)

Sử dụng **KYPO Terraform Client** để định nghĩa hạ tầng bằng mã nguồn:

- Lập kế hoạch và triển khai chính xác các tài nguyên đã thiết kế trên OpenStack.

### Ansible Automation

Tự động hóa cấu hình sau khi máy ảo được khởi tạo:

- Cài đặt phần mềm, công cụ chuyên dụng.
- Thiết lập các lỗ hổng giả lập và triển khai kịch bản scenario.
- Đảm bảo môi trường thực hành sẵn sàng mà không cần can thiệp thủ công.

---

## Luồng vận hành hệ thống

1. **Truy cập:** Người dùng đăng nhập qua Portal.
2. **Xác thực:** Keycloak xác thực và cấp Access Token.
3. **Yêu cầu:** Portal gửi yêu cầu học tập đến Training Service.
4. **Điều phối:** Training Service yêu cầu Sandbox Service chuẩn bị lab.
5. **Khởi tạo:** Sandbox Service dùng Terraform tạo tài nguyên trên OpenStack.
6. **Cấu hình:** Ansible thiết lập chi tiết bên trong máy ảo theo kịch bản.
7. **Phản hồi:** Trạng thái sẵn sàng được báo lại cho người dùng qua Portal để bắt đầu thực hành.

---

## Đặc điểm nổi bật của kiến trúc

- **Sự cách ly (Isolation):** Mỗi học viên có môi trường sandbox riêng, không gây ảnh hưởng lẫn nhau.
- **Khả năng mở rộng (Scalability):** Các dịch vụ có thể nâng cấp độc lập tùy theo tải trọng hệ thống.
- **Tính nhất quán (Reproducibility):** Nhờ Infrastructure as Code, mọi môi trường lab đều được tái hiện chính xác như nhau.
- **Bảo mật tập trung (Centralized Security):** Quản lý quyền hạn chặt chẽ thông qua Keycloak.
- **Tự động hóa toàn diện (Full Automation):** Giảm thiểu tối đa sai sót từ con người nhờ sự kết hợp giữa Terraform và Ansible.
