---
title: Keycloak OIDC & Phân quyền trong KYPO
sidebar_position: 5
---

# Keycloak OIDC & Quản lý tài khoản trong KYPO Cyber Range

## 1. Đặt vấn đề & Mục tiêu

Trong môi trường đào tạo, sinh viên thường phải sử dụng nhiều tài khoản cho các hệ thống khác nhau như Email, LMS, đăng ký môn học và KYPO Sandbox. Điều này dẫn đến:

- **Sự bất tiện**: Dễ quên mật khẩu, phải đăng nhập nhiều lần, gây ra hiện tượng _login fatigue_
- **Nguy cơ bảo mật**: Người dùng có xu hướng đặt mật khẩu yếu hoặc dùng lại mật khẩu, trong khi việc quản lý tài khoản phân tán cũng gây khó khăn cho quản trị viên

:::info Giải pháp
Triển khai cơ chế **Single Sign-On (SSO)** sử dụng **Keycloak** làm **Identity Provider (IdP)**, dựa trên giao thức **OpenID Connect (OIDC)**, nhằm tập trung hóa xác thực, đồng bộ quản lý tài khoản và phân quyền thống nhất cho hệ thống **KYPO Cyber Range**.
:::

---

## 2. Các thành phần và công cụ

| Công cụ                    | Vai trò                                                                   |
| :------------------------- | :------------------------------------------------------------------------ |
| **Keycloak Admin Console** | Giao diện quản trị để cấu hình Realm, Client, Role, Group và User         |
| **Docker**                 | Triển khai nhanh môi trường Keycloak dưới dạng container                  |
| **JWT.io**                 | Kiểm tra và debug nội dung của Access Token                               |
| **KYPO Dashboard**         | Nhận thông tin người dùng từ Keycloak để định danh và phân quyền truy cập |

---

## 3. Phân quyền trong KYPO thông qua Keycloak

Trong KYPO, việc phân quyền dựa trên các **claims** được nhúng trong **Access Token (JWT)** do Keycloak phát hành sau khi người dùng đăng nhập thành công.

### 3.1. Phân cấp theo Groups

Người dùng được tổ chức theo mô hình cây:

```
Năm học → Khoa → Lớp
```

**Mục đích:**

- Gán bài lab theo từng nhóm học viên
- Quản lý danh sách sinh viên theo cơ cấu tổ chức
- Hỗ trợ mở sandbox hàng loạt cho từng lớp hoặc khoa

---

### 3.2. Phân quyền theo Roles

Bên cạnh việc phân nhóm, người dùng còn được gán **roles** để xác định quyền chức năng:

- **Student**
  - Tham gia _Training Run_
  - Thực hiện lab và nộp kết quả
  - Không được truy cập đáp án hoặc hạ tầng

- **Instructor**
  - Tạo và quản lý bài lab
  - Theo dõi tiến độ sinh viên
  - Truy cập dữ liệu phân tích

---

### 3.3. Mapping dữ liệu bằng Protocol Mappers

Sử dụng **Protocol Mappers** để ánh xạ các thuộc tính người dùng vào JWT.

**Ví dụ Access Token:**

```json
{
  "preferred_username": "sv001",
  "student_id": "20240001",
  "class": "ATTT-K18",
  "faculty": "CNTT",
  "roles": ["student"]
}
```

Thông qua các trường này, KYPO có thể nhận diện đúng người dùng và áp dụng quyền truy cập tương ứng.

---

## 4. Quy trình triển khai

### Giai đoạn 1: Khởi tạo Realm và Client

- Tạo `student-realm` và Client `student-portal`
- Cấu hình **Redirect URI** để KYPO nhận phản hồi đăng nhập

### Giai đoạn 2: Khai báo thông tin người dùng

- Tạo **User Attributes** (MSSV, Lớp, Khoa)
- Gán người dùng vào **Groups** và cấp **Roles** phù hợp

### Giai đoạn 3: Cấu hình Protocol Mappers

- Tạo các mapper đưa thông tin tùy chỉnh vào Access Token
- Kiểm tra token bằng **JWT.io**
- Tích hợp để KYPO đọc các **claims**

---

## 5. Đóng góp của nhóm

- **Thành viên A**: Triển khai Keycloak bằng Docker, cấu hình Realm và Client
- **Thành viên B (Lan)**: Thiết kế mô hình phân quyền bằng Groups/Roles và mapping dữ liệu
- **Thành viên C**: Tích hợp KYPO với Keycloak và kiểm thử quy trình đăng nhập

---

## 6. Ưu điểm & Ứng dụng thực tế

- **Trải nghiệm người dùng**
  - Đăng nhập một lần (SSO) cho toàn bộ hệ sinh thái KYPO

- **Quản trị tập trung**
  - Kiểm soát quyền truy cập
  - Khóa/mở tài khoản tại một nơi duy nhất

- **Khả năng mở rộng**
  - Dễ dàng tích hợp **2FA**, **OTP**
  - Áp dụng chính sách mật khẩu mạnh mà không cần can thiệp mã nguồn KYPO

---

## 7. Kết luận

Giải pháp tích hợp **Keycloak** với **KYPO Cyber Range** giúp:

- Đơn giản hóa việc đăng nhập
- Tăng cường bảo mật
- Chuẩn hóa cơ chế phân quyền trong môi trường đào tạo quy mô lớn
