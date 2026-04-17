---
title: Login & Logout
sidebar_position: 2
---

# Login & Logout

## I. Tổng quan

Tài liệu này hướng dẫn cách đăng nhập (**Login**) và đăng xuất (**Logout**) trên nền tảng **CyberRangeCZ Platform**.

Trong phiên bản triển khai hiện tại, hệ thống sử dụng **IP public** hoặc **domain public**, vì vậy người dùng có thể truy cập trực tiếp giao diện web mà không cần thiết lập kết nối mạng nội bộ bằng `sshuttle`.

---

## II. Đăng nhập (Login)

### 1. Truy cập hệ thống

Để truy cập hệ thống, thực hiện các bước sau:

1. Mở trình duyệt web
2. Nhập **địa chỉ IP public** hoặc **URL/domain** của hệ thống
3. Trang đăng nhập sẽ được hiển thị

![Truy cập hệ thống](/img/log2.jpg)

### 2. Phương thức xác thực

Hệ thống sử dụng cơ chế xác thực thông qua các nhà cung cấp **OIDC (OpenID Connect)**.

> ⚠️ **Lưu ý về quyền truy cập**
>
> - Nếu không sử dụng **Keycloak OIDC**, bạn cần được cấp quyền truy cập phù hợp
> - Nếu sử dụng **Keycloak OIDC**, quản trị viên sẽ cung cấp:
>   - **Username** (Tên đăng nhập)
>   - **Password** (Mật khẩu)

![OIDC](/img/log3.jpg)

### 3. Thực hiện đăng nhập

Các bước đăng nhập như sau:

1. Chọn phương thức đăng nhập  
   _(ví dụ: **Login with local Keycloak**)_
2. Hệ thống sẽ chuyển hướng đến nhà cung cấp OIDC
3. Tại trang **Keycloak (CRCZP REALM)**, nhập:
   - **Username** hoặc **Email**
   - **Password**
4. Nhấn **Sign In** để hoàn tất đăng nhập

Đối với tài khoản **administrator** mặc định:

- **Username**: `crczp-admin`
- **Password**: `admin`

### 4. Giao diện sau khi đăng nhập

Sau khi đăng nhập thành công, bạn sẽ được chuyển đến **CyberRangeCZ Platform Portal**.

![Giao diện](/img/log4.jpg)

#### Các nhóm chức năng chính

- **Participate**
  - **Training Run**: Bắt đầu, tiếp tục hoặc xem kết quả bài đào tạo

- **Design**
  - **Sandbox Definition**: Cấu hình mạng ảo và máy
  - **Training Definition**: Thiết kế kịch bản đào tạo

- **Organize**
  - **Pool / Training Instance**: Quản lý phiên đào tạo
  - **Images**: Quản lý cloud images

- **Manage**
  - **Groups / Users**: Quản lý người dùng và phân quyền
  - **Microservices**: Quản lý các dịch vụ hệ thống

> ⚠️ Một số chức năng có thể không hiển thị tùy theo role của bạn.

---

## III. Đăng xuất (Logout)

### 1. Thực hiện đăng xuất

Để đăng xuất khỏi hệ thống:

1. Nhấn vào menu người dùng ở góc trên bên phải
2. Chọn **Logout**

![Đăng xuất](/img/log5.jpg)

### 2. Kết quả sau khi đăng xuất

Sau khi đăng xuất:

- Phiên làm việc sẽ được kết thúc
- Hệ thống sẽ chuyển về trang đăng nhập

---

## IV. Tổng kết

Quy trình sử dụng cơ bản gồm các bước:

1. Truy cập **CyberRangeCZ Platform** bằng **IP public** hoặc **domain public**
2. Đăng nhập thông qua **OIDC** hoặc **Keycloak** nếu được cấu hình
3. Sử dụng hệ thống theo quyền được cấp
4. Đăng xuất sau khi hoàn tất để đảm bảo an toàn và bảo mật
