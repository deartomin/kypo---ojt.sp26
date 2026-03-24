---
title: Administration Agenda
sidebar_position: 3
---

# Administration Agenda

## I. Tổng quan

### 1. Khái niệm

**Administration Agenda** là khu vực quản trị trung tâm của CyberRangeCZ Platform, dùng để quản lý người dùng, nhóm và microservice trong toàn hệ thống.

### 2. Chức năng chính

- Quản lý **Users**
- Quản lý **Groups**
- Đăng ký và quản lý **Microservices**
- Quản lý phân quyền truy cập thông qua **roles** và **groups**

### 3. Quyền truy cập

- Chỉ người dùng có role **administrator** mới được phép truy cập
- Mặc định, người dùng sẽ được gán role **trainee** khi đăng nhập

### 4. Truy cập

- Nhấp vào nút tương ứng trên trang đầu tiên của **CyberRangeCZ Platform**

![Overview](/img/ad1.jpg)

---

## II. Users

### 1. Chức năng

Phần **Users** hiển thị danh sách tất cả người dùng đã đăng nhập thông qua **OIDC provider**.

- Mỗi dòng tương ứng với một người dùng
- Có thể nhấp vào tên người dùng để xem thông tin chi tiết

![Overview](/img/add2.jpg)

### 2. Các thao tác chính

#### 🗑️ Xóa người dùng

- Xóa từng người dùng bằng biểu tượng 🗑
- Xóa nhiều người dùng bằng cách chọn checkbox rồi nhấn `Delete`

#### 📤 Export credentials

- Nhấn nút `Get Users Credentials` để tải file YAML chứa thông tin đăng nhập và mật khẩu

![Overview](/img/add3.jpg)

#### 📥 Import người dùng

- Nhấn nút `Import Users`
- Tải lên file YAML theo định dạng sau:

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

### 3. Lưu ý khi import

- `sub` và `iss` là các trường bắt buộc
- `full_name`, `given_name`, `family_name` là các trường không bắt buộc
- Nếu không khai báo `group_name`, người dùng cần được gán nhóm thủ công sau khi import

### 4. User Detail

Trang chi tiết người dùng gồm 2 phần chính:

1. Thông tin cơ bản của người dùng:
   - Username
   - Email
   - Số lượng role
2. Danh sách role và microservice tương ứng

![Overview](/img/add4.jpg)

- Có thể **expand/collapse** từng role để xem chi tiết

---

## III. Groups

### 1. Chức năng

Phần **Groups** dùng để quản lý nhóm người dùng.

- Quyền truy cập hệ thống được gán thông qua **group**

![Overview](/img/add5.jpg)

### 2. Các thao tác chính

- ➕ **Create**: tạo nhóm mới
- ✏️ **Edit**: chỉnh sửa nhóm
- 🗑️ **Delete**: xóa nhóm
- ✅ Có thể xóa nhiều nhóm bằng checkbox

![Overview](/img/add6.jpg)
![Overview](/img/add7.jpg)

### 3. Tạo / chỉnh sửa nhóm

Giao diện tạo hoặc chỉnh sửa nhóm gồm 3 phần:

1. **Thông tin group**
2. **Members**
3. **Roles**

![Create group](/img/add7.jpg)

#### a. Thông tin group

Cần nhập các thông tin sau:

- **Name** (bắt buộc)
- **Description**
- **Expiration Date** (không bắt buộc)

Sau khi nhập xong, có thể chọn:

- `Create` – tạo nhóm và quay về danh sách
- `Create And Continue Editing` – tạo nhóm và tiếp tục chỉnh sửa

![Create group](/img/add8.jpg)

#### b. Quản lý thành viên

Có thể thêm người dùng bằng các cách sau:

- **Add users** – tìm kiếm và thêm người dùng
- **Import users** – nhập người dùng từ nhóm khác

![Create group](/img/add9.jpg)

- Nhấn `Add` để thêm người dùng
- Có thể xóa người dùng khỏi nhóm bằng chức năng delete

#### c. Quản lý roles

- Thêm role bằng nút `Add`
- Các role được gán cho group
- Có thể xóa role đã thêm

![Create group](/img/add10.jpg)

### 4. Group Detail

Trang chi tiết nhóm hiển thị:

- Thông tin của nhóm:
  - Description
  - Expiration date
  - Số lượng người dùng
  - Số lượng role
- Danh sách người dùng trong nhóm
- Danh sách role của nhóm

![Create group](/img/add11.jpg)

- Có thể **expand** từng role để xem phần mô tả chi tiết

![Create group](/img/add12.jpg)

---

## IV. Microservices

### 1. Microservice Overview

Phần này hiển thị danh sách các microservice đã được đăng ký, bao gồm:

- **ID**
- **Name**
- **Endpoint**

![List](/img/micro1.jpg)

- Có thể thêm microservice mới bằng nút `Register`

### 2. Microservice Registration

Phần **Microservice Registration** dùng để đăng ký một microservice mới.

![Micro Registration](/img/micro2.jpg)

### 3. Thông tin cần nhập

Khi đăng ký microservice, cần nhập:

- **Name**
- **Endpoint**

### 4. Role của microservice

- Có thể tạo role cho microservice
- Có thể thiết lập role mặc định (**Default**) cho microservice đó

### 5. Khuyến nghị

- Nên import thư viện `security-commons`
- Nên đăng ký microservice ngay khi hệ thống khởi động

---

## V. Tổng kết

Administration Agenda cho phép:

1. Quản lý người dùng (**CRUD + import/export**)
2. Quản lý nhóm và phân quyền truy cập
3. Gán role thông qua group
4. Quản lý microservice và các role tương ứng

**Đây là trung tâm quản trị quyền truy cập của toàn bộ hệ thống CyberRangeCZ.**
