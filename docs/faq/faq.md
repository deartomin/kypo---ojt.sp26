# Các lỗi thường gặp và cách khắc phục

Trong quá trình triển khai và sử dụng hệ thống **KYPO Cyber Range**, người dùng có thể gặp một số lỗi phổ biến liên quan đến môi trường, quá trình deploy hoặc khởi tạo sandbox. Tài liệu này tổng hợp các lỗi thường gặp cùng với nguyên nhân và hướng dẫn xử lý tương ứng.

---

## 1. Lỗi mạng (Network Issues)

Lỗi mạng là một trong những nguyên nhân phổ biến nhất gây gián đoạn hệ thống. Khi hệ thống không có kết nối Internet hoặc cấu hình DNS sai, các service sẽ không thể giao tiếp với nhau hoặc không thể kết nối đến OpenStack.

### Nguyên nhân

- Mất kết nối Internet hoặc mạng không ổn định
- Cấu hình DNS không chính xác
- Firewall hoặc các port cần thiết bị chặn bởi firewall

### Cách khắc phục

- Kiểm tra kết nối mạng bằng lệnh `ping`
- Kiểm tra cấu hình DNS tại `/etc/resolv.conf`
- Kiểm tra và mở các port cần thiết
- Tạm thời tắt firewall để kiểm tra (nếu cần)

> 💡 Luôn kiểm tra kết nối mạng trước khi tiến hành debug các lỗi khác.

---

## 2. Lỗi download chậm dẫn đến timeout

Trong quá trình cài đặt, hệ thống cần tải nhiều tài nguyên từ bên ngoài. Nếu tốc độ mạng chậm hoặc không ổn định, quá trình download có thể bị timeout và làm gián đoạn script cài đặt.

### Nguyên nhân

- Tốc độ mạng không ổn định
- Script cài đặt chưa tối ưu thời gian timeout
- Tài nguyên tải về có dung lượng lớn

### Cách khắc phục

- Chạy lại script cài đặt
- Tăng thời gian timeout trong script
- Thêm cơ chế retry khi download thất bại
- Tải thủ công tài nguyên nếu cần

> 💡 Lỗi này thường xảy ra khi deploy bằng kết nối WiFi yếu hoặc không ổn định.

---

## 3. Lỗi truy cập web bị 404 sau khi deploy

Sau khi deploy hệ thống, người dùng có thể gặp lỗi 404 khi truy cập web và giao diện không hiển thị.

### Nguyên nhân

- Service chưa chạy hoặc bị lỗi
- Sai cấu hình endpoint hoặc route
- Script deploy gặp lỗi

### Cách khắc phục

- Kiểm tra trạng thái các service (ví dụ: `systemctl status`, `docker ps`, ...)
- Xem log hệ thống để xác định nguyên nhân
- Kiểm tra lại cấu hình endpoint và route
- Thực hiện deploy lại hệ thống nếu cần

> 💡 Trong nhiều trường hợp, deploy lại là cách nhanh nhất nếu lỗi xuất phát từ script.

---

## 4. Lỗi service không khởi động

Một số service có thể không khởi động hoặc bị dừng ngay sau khi start, ảnh hưởng đến toàn bộ hệ thống.

### Nguyên nhân

- Sai cấu hình file
- Thiếu dependency
- Xung đột port

### Cách khắc phục

- Kiểm tra log của service
- Kiểm tra các port đang được sử dụng (`netstat -tulpn` hoặc `ss -tulpn`)
- Cài đặt lại các dependency cần thiết
- Đổi port nếu xảy ra xung đột

---

## 5. Lỗi sai version môi trường

Việc sử dụng sai version của Java, NodeJS hoặc Maven có thể khiến project không build hoặc không thể chạy.

### Nguyên nhân

- Version không tương thích với project
- Cấu hình môi trường sai

### Cách khắc phục

- Kiểm tra version hiện tại (`java -version`, `node -v`, ...)
- Cài đặt đúng version theo tài liệu
- Cấu hình lại biến môi trường (PATH, JAVA_HOME, ...)

---

## 6. Lỗi container không hoạt động

Khi sử dụng Docker hoặc Podman, container có thể không chạy hoặc không truy cập được.

### Nguyên nhân

- Container bị dừng (stopped)
- Sai cấu hình port mapping
- Image bị lỗi hoặc chưa được build đúng

### Cách khắc phục

- Kiểm tra danh sách container (`docker ps -a`)
- Xem log của container (`docker logs <container_id>`)
- Restart container
- Kiểm tra lại cấu hình port mapping và image

---

## 7. Lỗi cấu hình sai

Một số lỗi khó phát hiện thường xuất phát từ việc cấu hình sai trong file `.env` hoặc các file cấu hình hệ thống.

### Nguyên nhân

- Sai địa chỉ IP hoặc port
- Sai endpoint
- Thiếu hoặc sai biến môi trường

### Cách khắc phục

- Kiểm tra lại file cấu hình
- So sánh với tài liệu chuẩn
- Restart service sau khi chỉnh sửa

---

⚠ **Lưu ý:** Tài liệu sẽ được cập nhật và bổ sung khi phát sinh thêm các lỗi mới trong quá trình triển khai và sử dụng hệ thống.
