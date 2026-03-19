---
title: Sandbox Agenda
sidebar_position: 3
---

# Sandbox Agenda

## Tổng quan

**Sandbox Agenda** là khu vực trung tâm của CyberRangeCZ Platform dùng để tạo và quản lý môi trường sandbox phục vụ đào tạo.

Chức năng chính bao gồm:

- Tạo và quản lý **Sandbox Definition**
- Quản lý **Pool**
- Theo dõi và điều khiển **Sandbox Instances**
- Quản lý **Images**

Luồng hoạt động cơ bản:

1. Tạo Sandbox Definition (mô tả hệ thống)
2. Tạo Pool từ Definition
3. Allocate để tạo Sandbox Instances
4. Quản lý vòng đời (lock, delete, retry, ...)

---

## Sandbox Definition

**Khái niệm**

**Sandbox Definition** là bản mô tả (blueprint) của một môi trường sandbox, bao gồm:

- Cấu trúc mạng (topology)
- Các máy ảo (VMs)
- Cấu hình hệ thống
- Script provisioning

Mỗi definition được lưu trữ dưới dạng **Git repository**.

**Danh sách Sandbox Definition**

Trang này hiển thị tất cả các sandbox definitions có trong hệ thống.

Mỗi dòng trong bảng tương ứng với một definition và có thể được sử dụng để tạo nhiều pool khác nhau.

<!-- TODO: Add screenshot - Sandbox Definition table -->

**Các thao tác**

**Xem chi tiết**

- Nhấn vào tên definition để xem thông tin chi tiết hoặc truy cập repository

**Xem topology**

Hiển thị sơ đồ mạng của sandbox, bao gồm:

- Router
- Switch
- Hosts
- Kết nối giữa các node

Giúp kiểm tra cấu trúc trước khi triển khai.

<!-- TODO: Add screenshot - Sandbox topology -->

**Xóa definition**

Xóa sandbox definition khỏi hệ thống.

⚠️ Điều kiện:

- Definition không được gán vào bất kỳ pool nào

Nếu không thỏa điều kiện, hệ thống sẽ không cho phép xóa.

<!-- TODO: Add screenshot - Delete sandbox definition -->

**Tạo Sandbox Definition**

**Các bước thực hiện**

1. Nhấn nút **Create**
2. Nhập thông tin:

- **Git URL**: đường dẫn repository chứa definition
- **Revision**: branch hoặc commit (thường là `master`)

3. Nhấn **Create**

**Cách hệ thống xử lý**

- Clone repository
- Phân tích cấu trúc definition
- Kiểm tra hợp lệ

Nếu definition không đúng format, quá trình tạo sẽ thất bại.

<!-- TODO: Add screenshot - Create sandbox definition form -->

---

## Pool

**Khái niệm**

**Pool** là nơi chứa và quản lý các sandbox instances được tạo từ một sandbox definition.

Pool đóng vai trò:

- Quản lý tài nguyên runtime
- Điều phối việc tạo sandbox
- Theo dõi trạng thái sử dụng

**Danh sách Pool**

Trang này hiển thị toàn bộ các pool hiện có.

Thông tin chính bao gồm:

- Tên pool
- Sandbox definition sử dụng
- Trạng thái
- Mức sử dụng tài nguyên

<!-- TODO: Add screenshot - Pool overview -->

**Các thao tác**

**Chỉnh sửa (Edit)**

Cho phép cập nhật:

- Pool size
- Mô tả (comment)
- Cấu hình thông báo

**Allocate sandbox**

Tạo sandbox instances từ pool.

- Nếu chỉ còn 1 sandbox → hệ thống tự động allocate
- Nếu nhiều → người dùng chọn số lượng cần tạo

Có thể nhập số hoặc sử dụng thanh trượt.

<!-- TODO: Add screenshot - Allocate sandbox -->

**Allocate một sandbox**

Tạo nhanh một sandbox instance duy nhất.

**Xóa pool**

Xóa pool khỏi hệ thống.

⚠️ Điều kiện:

- Pool không bị lock
- Pool không chứa sandbox instance

<!-- TODO: Add screenshot - Delete pool warning -->

**Lock / Unlock**

- **Lock**: pool đang được sử dụng, không thể chỉnh sửa
- **Unlock**: pool sẵn sàng để sử dụng

**Thống kê tài nguyên**

Hiển thị thông tin sử dụng:

- Instances
- vCPUs
- RAM
- Ports
- Networks

Giúp theo dõi tình trạng tài nguyên của hệ thống.

<!-- TODO: Add screenshot - Resource statistics -->

**Tạo Pool**

**Các bước**

1. Nhấn **Create**
2. Nhập thông tin:

- Sandbox Pool Size
- Sandbox Definition
- Comment (tuỳ chọn)
- Notification (tuỳ chọn)

3. Nhấn **Create**

**Lưu ý**

- Một pool chỉ gắn với một definition cố định
- Nếu muốn dùng version khác → cần tạo pool mới

<!-- TODO: Add screenshot - Create pool form -->

---

## Pool Detail

**Mô tả**

Trang này hiển thị danh sách các sandbox instances thuộc pool.

<!-- TODO: Add screenshot - Pool detail -->

**Các thao tác**

**Allocate Sandboxes**

Tạo nhiều sandbox cùng lúc.

- Nhập số lượng hoặc dùng slider
- Nhấn **Allocate** để xác nhận

**Xóa sandbox**

- Xóa sandbox instance khỏi pool
- Chỉ xóa được khi sandbox chưa bị lock

**Lock / Unlock**

- Lock khi sandbox đang được sử dụng
- Unlock khi sandbox sẵn sàng

---

## Sandbox Instances

**Mô tả**

Danh sách các sandbox đã được tạo từ pool.

**Các thao tác**

**Xóa sandbox**

Xóa sandbox instance.

⚠️ Chỉ xóa được khi sandbox chưa bị lock.

**Xem topology**

Hiển thị sơ đồ mạng của sandbox đang chạy.

<!-- TODO: Add screenshot - Instance topology -->

**SSH Config**

Tải file cấu hình SSH để truy cập vào sandbox.

**Lock / Unlock**

- Lock: sandbox đang được sử dụng
- Unlock: sandbox sẵn sàng để sử dụng lại

---

## Quá trình tạo sandbox

**Các giai đoạn**

Việc tạo sandbox gồm nhiều bước:

1. Tạo hạ tầng (Terraform)
2. Cấu hình mạng (Ansible)
3. Provisioning hệ thống

**Trạng thái**

| Trạng thái | Ý nghĩa        |
| ---------- | -------------- |
| In Queue   | Đang chờ xử lý |
| Running    | Đang thực thi  |
| Finished   | Hoàn thành     |
| Failed     | Lỗi            |

**Retry**

Nếu xảy ra lỗi:

- Có thể retry stage bị lỗi
- Hiện tại chỉ hỗ trợ retry một số stage

**Xem chi tiết**

- Nhấn vào sandbox để xem log từng stage
- Có thể theo dõi lỗi tại đây

<!-- TODO: Add screenshot - Allocation stages -->

---

## Images

**Khái niệm**

Images là danh sách các hệ điều hành có thể dùng để tạo máy ảo trong sandbox.

**Danh sách Images**

Thông tin hiển thị:

- Name
- Default User
- Updated At
- GUI Access
- Size

<!-- TODO: Add screenshot - Images table -->

**Thông tin chi tiết**

Bao gồm:

- OS Distro
- OS Type
- Disk Format
- Container Format
- Min Disk
- Min RAM
- Visibility
- Created At
- Tags
- Version

**Bộ lọc**

Có thể lọc theo:

- Only CRCZP images
- Only GUI access

Giúp tìm nhanh image phù hợp.

<!-- TODO: Add screenshot - Image filters -->

---

## Tổng kết

Sandbox Agenda bao gồm 4 thành phần chính:

1. **Sandbox Definition** – mô tả hệ thống
2. **Pool** – quản lý tài nguyên và runtime
3. **Sandbox Instances** – môi trường thực thi
4. **Images** – hệ điều hành sử dụng

Đây là workflow cốt lõi của CyberRangeCZ Platform trong việc triển khai và vận hành môi trường đào tạo.
