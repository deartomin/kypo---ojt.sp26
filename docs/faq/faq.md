# Các lỗi thường gặp và cách giải quyết

Trong quá trình triển khai và sử dụng hệ thống KYPO Cyber Range, có thể gặp một số lỗi phổ biến liên quan đến cài đặt môi trường, khởi tạo sandbox hoặc thời gian tạo máy ảo. Dưới đây là một số lỗi thường gặp và cách khắc phục.

# 1. Thời gian tạo máy ảo quá lâu

Một trong những vấn đề thường gặp là quá trình tạo sandbox mất nhiều thời gian. Nguyên nhân thường do tài nguyên hệ thống không đủ hoặc máy chủ OpenStack đang phải xử lý nhiều yêu cầu cùng lúc.

Để khắc phục, cần kiểm tra tài nguyên của máy chủ như CPU, RAM và dung lượng lưu trữ. Ngoài ra có thể giảm số lượng máy ảo trong mỗi sandbox hoặc kiểm tra trạng thái của OpenStack để đảm bảo hệ thống hoạt động ổn định.

# 2. Sandbox không được tạo

Trong một số trường hợp, sandbox không được tạo sau khi người dùng gửi yêu cầu. Nguyên nhân có thể do lỗi kết nối giữa Sandbox Service và OpenStack hoặc do cấu hình thông tin xác thực chưa chính xác.

Cách giải quyết là kiểm tra lại file cấu hình của Sandbox Service, đảm bảo các thông tin như địa chỉ OpenStack, username và password được thiết lập đúng. Ngoài ra cần kiểm tra log của service để xác định nguyên nhân cụ thể.

# 3. Không truy cập được vào máy ảo

Sau khi sandbox được tạo, đôi khi người dùng không thể truy cập vào máy ảo. Nguyên nhân có thể do cấu hình mạng chưa đúng hoặc firewall đang chặn kết nối.

Để khắc phục, cần kiểm tra cấu hình mạng của OpenStack, đảm bảo máy ảo đã được gán địa chỉ IP và các cổng cần thiết được mở. Ngoài ra cũng cần kiểm tra lại cấu hình security group của máy ảo.

# 4. Lỗi khi build hoặc chạy service

Trong quá trình phát triển hoặc triển khai hệ thống, developer có thể gặp lỗi khi build hoặc chạy các service của KYPO. Nguyên nhân thường do thiếu thư viện, phiên bản Java không phù hợp hoặc lỗi cấu hình môi trường.

Cách giải quyết là kiểm tra lại các công cụ đã cài đặt như Java, Maven và NodeJS. Sau đó tiến hành build lại project và kiểm tra log để xác định lỗi cụ thể.