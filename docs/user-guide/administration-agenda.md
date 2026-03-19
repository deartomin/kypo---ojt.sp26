# Administration Agenda

## Overview

Administration Agenda dùng để quản lý người dùng, nhóm và microservice trong hệ thống CyberRangeCZ.

<!-- image: overview page -->

- Chỉ user có role **administrator** mới truy cập được.
- Mặc định, user được gán role **trainee** khi đăng nhập.
- Gồm 3 phần chính:
  - User Overview (Quản lý người dùng)
  - Group Overview (Quản lý nhóm)
  - Microservice Registration (Đăng ký microservice)

---

## Users

### Chức năng

- Hiển thị danh sách tất cả user đã đăng nhập qua OIDC provider.
- Mỗi dòng là 1 user.
- Click vào tên user để xem chi tiết.

<!-- image: user overview table -->

### Thao tác

- **Xóa user:**
  - Xóa từng user bằng icon 🗑
  - Xóa nhiều user bằng checkbox → `Delete`

- **Export credentials:**
  - Nút `Get Users Credentials` để tải file YAML (login + password)

<!-- image: get users credentials button -->

- **Import users:**
  - Nút `Import Users`

<!-- image: upload users modal -->

- Upload file YAML theo format:

```json
{
  "users": [
    {
      "sub": "test-user",
      "iss": "https://test.oidc.com/oidc/",
      "full_name": "Test User",
      "given_name": "Test",
      "family_name": "User"
    }
  ],
  "group_name": "TEST GROUP"
}
```

### Lưu ý

- `sub`, `iss` là bắt buộc
- `full_name`, `given_name`, `family_name` là optional
- Nếu không có `group_name` → cần gán group thủ công

### User Detail

- Gồm 2 phần:
  1. Thông tin user (username, email, số role)
  2. Danh sách role + microservice

<!-- image: user detail roles -->

- Có thể expand/collapse từng role để xem chi tiết

---

## Groups

### Chức năng

- Quản lý nhóm user
- Quyền truy cập hệ thống được gán qua group

<!-- image: group overview table -->

### Thao tác

- **Create group:** Nút `Create`
- **Edit:** Icon ✏️
- **Delete:** Icon 🗑 hoặc delete nhiều bằng checkbox

<!-- image: delete group confirm -->

### Create / Edit Group

#### Cấu trúc gồm 3 phần:

1. Thông tin group
2. Members
3. Roles

<!-- image: create group form -->

#### Create/Edit Group

- Điền:
  - Name (bắt buộc)
  - Description
  - Expiration Date (optional)

- Sau đó:
  - `Create` → tạo và quay về danh sách
  - `Create And Continue Editing` → tiếp tục chỉnh sửa

#### Edit Members

- Thêm user:
  - Add users (tìm kiếm)
  - Import users từ group khác

<!-- image: edit members section -->

- Click `Add` để thêm
- Xóa user bằng delete

#### Edit Roles

- Thêm role bằng `Add`
- Role được gán cho group
- Có thể xóa role

<!-- image: edit roles section -->

### Group Detail

Hiển thị:

- Thông tin group (description, expiration, số user, số role)
- Danh sách user trong group
- Danh sách role

<!-- image: group detail -->

- Có thể expand role để xem description

---

## Microservices

### Microservice Overview

- Danh sách các microservice đã đăng ký
- Thông tin gồm:
  - ID
  - Name
  - Endpoint

<!-- image: microservice overview -->

- Thêm mới bằng nút `Register`

### Microservice Registration

Dùng để đăng ký microservice mới.

<!-- image: microservice registration form -->

### Thông tin cần nhập:

- Name
- Endpoint

### Role:

- Tạo role cho microservice
- Có thể set role mặc định (Default)

### Khuyến nghị:

- Import thư viện `security-commons`
- Đăng ký microservice khi startup

---

## Tổng kết

Administration Agenda cho phép:

- Quản lý user (CRUD + import/export)
- Quản lý group (phân quyền)
- Gán role theo group
- Quản lý microservice và role tương ứng

=> Đây là trung tâm quản trị quyền truy cập của toàn hệ thống CyberRangeCZ.
