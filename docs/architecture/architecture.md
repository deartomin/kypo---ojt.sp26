# Mô tả hệ thống KYPO
# 1. Tổng quan hệ thống

KYPO Cyber Range là một nền tảng được sử dụng để tạo môi trường thực hành an ninh mạng. Hệ thống cho phép người dùng tham gia các bài lab trong các môi trường ảo gọi là sandbox. Mỗi sandbox thường bao gồm một hoặc nhiều máy ảo được tạo tự động nhằm mô phỏng các tình huống tấn công và phòng thủ trong an ninh mạng. Việc sử dụng sandbox giúp người học thực hành trong môi trường an toàn mà không ảnh hưởng đến hệ thống thật.

# 2. Các thành phần chính của hệ thống

Hệ thống KYPO bao gồm ba thành phần chính. Training Portal là giao diện web nơi người dùng đăng nhập, truy cập các bài thực hành và tạo sandbox. Training Service là dịch vụ backend có nhiệm vụ quản lý các bài training và xử lý các yêu cầu từ người dùng. Sandbox Service chịu trách nhiệm tạo và quản lý sandbox.

Ngoài ra hệ thống còn sử dụng OpenStack để quản lý và khởi tạo các máy ảo dùng trong môi trường thực hành.

# 3. Nguyên lý hoạt động

Khi người dùng bắt đầu một bài thực hành trên Training Portal và chọn tạo sandbox, yêu cầu sẽ được gửi đến Training Service. Service này sẽ xử lý thông tin của bài training và gửi yêu cầu tiếp đến Sandbox Service.

Sau đó Sandbox Service sẽ giao tiếp với OpenStack để khởi tạo các máy ảo cần thiết cho sandbox. Khi các máy ảo được tạo thành công, hệ thống sẽ trả lại thông tin truy cập cho người dùng thông qua Training Portal để bắt đầu thực hành.

Nhờ cơ chế này, mỗi người dùng sẽ có một môi trường thực hành riêng biệt, giúp đảm bảo tính an toàn và tránh ảnh hưởng giữa các bài lab.