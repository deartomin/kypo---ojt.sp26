---
title: Login & Logout
sidebar_position: 2
---

# Login & Logout

## Tổng quan

Tài liệu này hướng dẫn cách đăng nhập (Login) và đăng xuất (Logout) trên nền tảng CyberRangeCZ Platform

---

## Đăng nhập (Login)

### Kết nối mạng nội bộ

Trước khi truy cập giao diện web, bạn cần thiết lập kết nối mạng bảo mật bằng cách:

1. Mở terminal trên máy tính
2. Chạy lệnh sau:

   sshuttle -r sp26-ojt@100.70.135.32 10.1.2.0/24

3. Nhập mật khẩu khi được yêu cầu để thiết lập tunnel

### Truy cập hệ thống

Sau khi kết nối thành công:

1. Mở trình duyệt web
2. Nhập địa chỉ IP hoặc URL của hệ thống
3. Trang đăng nhập sẽ hiển thị

<!-- TODO: Add screenshot - Login page (CyberRangeCZ Platform) -->

### Phương thức xác thực

Hệ thống sử dụng cơ chế xác thực thông qua các nhà cung cấp **OIDC (OpenID Connect)**.

> ⚠️ **Lưu ý về quyền truy cập**
>
> - Nếu **không sử dụng Keycloak OIDC**: bạn cần được cấp quyền truy cập thủ công
> - Nếu **sử dụng Keycloak OIDC**:
>   - Quản trị viên sẽ cung cấp:
>     - **Username (Tên đăng nhập)**
>     - **Password (Mật khẩu)**

<!-- TODO: Add screenshot - OIDC provider selection -->

### Thực hiện đăng nhập

1. Chọn phương thức đăng nhập  
   _(ví dụ: **Login with local Keycloak**)_
2. Hệ thống sẽ chuyển hướng đến nhà cung cấp OIDC
3. Tại trang Keycloak (CRCZP REALM), nhập:
   - Username hoặc Email
   - Password
4. Nhấn **Sign In** để hoàn tất

<!-- TODO: Add screenshot - Keycloak login form -->

### Giao diện sau khi đăng nhập

Sau khi đăng nhập thành công, bạn sẽ được chuyển đến CyberRangeCZ Platform Portal

<!-- TODO: Add screenshot - Dashboard after login -->

#### Các nhóm chức năng chính

- **Participate**
  - Training Run: Bắt đầu, tiếp tục hoặc xem kết quả bài đào tạo

- **Design**
  - Sandbox Definition: Cấu hình mạng ảo và máy
  - Training Definition: Thiết kế kịch bản đào tạo

- **Organize**
  - Pool / Training Instance: Quản lý phiên đào tạo
  - Images: Quản lý cloud images

- **Manage**
  - Groups / Users: Quản lý người dùng và phân quyền
  - Microservices: Quản lý dịch vụ hệ thống

> ⚠️ Một số chức năng có thể không hiển thị tùy theo **role** của bạn.

---

## Đăng xuất (Logout)

### Thực hiện đăng xuất

Để đăng xuất khỏi hệ thống:

1. Nhấn vào menu người dùng ở góc trên bên phải
2. Chọn **Logout**

<!-- TODO: Add screenshot - Logout button / user menu -->

Sau khi đăng xuất:

- Phiên làm việc sẽ được kết thúc
- Hệ thống chuyển về trang đăng nhập

---

## Tổng kết

Quy trình cơ bản:

1. Kết nối mạng nội bộ
2. Truy cập CyberRangeCZ Platform
3. Đăng nhập qua OIDC (Keycloak nếu có)
4. Sử dụng hệ thống theo quyền được cấp
5. Đăng xuất sau khi hoàn tất để đảm bảo bảo mật
