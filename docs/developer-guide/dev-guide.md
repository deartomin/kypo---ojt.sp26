<<<<<<< HEAD
# Hướng dẫn dành cho Developer
# 1. Thiết lập môi trường phát triển

Để phát triển và chỉnh sửa hệ thống KYPO, developer cần chuẩn bị môi trường làm việc phù hợp. Trước hết cần cài đặt các công cụ như Git để quản lý mã nguồn, Java và Maven để build các dịch vụ backend, cùng với NodeJS để chạy phần giao diện web.

Sau khi cài đặt các công cụ cần thiết, developer tiến hành tải mã nguồn của hệ thống KYPO từ repository về máy để có thể chỉnh sửa và phát triển thêm các chức năng.

# 2. Cấu trúc các dịch vụ trong hệ thống

Hệ thống KYPO được xây dựng theo kiến trúc nhiều dịch vụ (microservices). Mỗi service đảm nhiệm một chức năng riêng và giao tiếp với nhau thông qua API.

Một số service quan trọng trong hệ thống gồm:

Training Portal: giao diện web cho người dùng

Training Service: quản lý các bài training và xử lý logic hệ thống

Sandbox Service: tạo và quản lý sandbox

Developer có thể chỉnh sửa từng service riêng biệt tùy theo chức năng cần phát triển.

# 3. Quy trình phát triển và chạy hệ thống

Sau khi tải mã nguồn, developer cần build các service bằng Maven để tạo file chạy cho backend. Sau đó các service backend được khởi động để cung cấp API cho hệ thống.

Tiếp theo, frontend được chạy bằng NodeJS để cung cấp giao diện web cho người dùng. Khi tất cả các service hoạt động, developer có thể truy cập giao diện web để kiểm tra chức năng của hệ thống.

Trong quá trình phát triển, developer có thể chỉnh sửa mã nguồn, build lại service và chạy lại hệ thống để kiểm tra các thay đổi. Điều này giúp việc phát triển và thử nghiệm các chức năng mới của KYPO được thực hiện dễ dàng.
=======
---
title: Hướng dẫn dành cho Developer
---
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
