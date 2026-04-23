---
title: Custom Frontend
sidebar_position: 6
---

# Custom Frontend

Tài liệu này hướng dẫn quy trình tùy chỉnh giao diện người dùng (Frontend) cho nền tảng KYPO, từ bước thiết lập môi trường đến triển khai vĩnh viễn trên hệ thống.

## 1. Chuẩn bị môi trường

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt và cấu hình **Docker Desktop** trên máy cục bộ. Công cụ này cần thiết để đóng gói mã nguồn thành image.

![Show](/img/fe1.png)

## 2. Clone repository frontend

Clone container frontend từ repository chính thức:

- Link repo: https://github.com/cyberrangecz/frontend-platform.git

Sau khi clone, tiến hành chỉnh sửa (custom) giao diện theo nhu cầu trong folder vừa tải về.

![Show](/img/fe2.png)

## 3. Build và push Docker image

Sau khi hoàn tất custom, sử dụng các lệnh sau để build và push image:

```bash
docker build --no-cache -t <Tên user>/<Tên Docker Image>:v<tag mong muốn>

docker push <Tên user>/<Tên Docker Image>:v<tag mong muốn>
```

![Show](/img/fe3.jpg)

## 4. Deploy lên hệ thống

Thực hiện kết nối SSH vào máy ảo (VM) chạy hệ thống và cập nhật image mới bằng Kubernetes (kubectl):

```
# Cập nhật image cho deployment
sudo kubectl set image deployment/angular-frontend angular-frontend=<Tên user>/<Tên Docker Image>:v<tag mong muốn> -n crczp

# Kiểm tra trạng thái rollout
sudo kubectl rollout status deployment/angular-frontend -n crczp
```

Khi deploy thành công sẽ hiển thị trạng thái `success`.

![Show](/img/fe4.png)

## 5. Kiểm tra kết quả

Quay lại trình duyệt, truy cập vào Portal và làm mới trang để kiểm tra thay đổi:

- Nhấn `F5` hoặc `Ctrl + Shift + R`

Giao diện mới sẽ được áp dụng.

⚠️ **Lưu ý:** Cách thực hiện trên chỉ mang tính chất tạm thời. Nếu container hoặc pod bị xóa/khởi động lại mà không qua script deploy gốc, hệ thống có thể tự động kéo image cũ và quay về giao diện mặc định.

## 6. Lưu thay đổi vĩnh viễn

Để thay đổi có hiệu lực vĩnh viễn trong các lần triển khai sau, cần thực hiện override cấu hình trong script deploy chính:

1. Truy cập vào repository build của hệ thống
2. Mở file: **/kypo-sp26/scripts/03-infrastructure-deploy.sh**
3. Tìm đến đoạn cấu hình định nghĩa image cho frontend
4. Thay thế bằng đường dẫn Docker image đã push (bao gồm cả tag)
5. Thực hiện chạy lại script build để áp dụng cho toàn bộ hệ thống

![Show](/img/fe5.png)
