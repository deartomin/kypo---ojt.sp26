<<<<<<< HEAD
# Hướng dẫn triển khai hệ thống
# 1. Chuẩn bị môi trường triển khai

Trước khi triển khai hệ thống KYPO Cyber Range, cần chuẩn bị môi trường phần cứng và phần mềm phù hợp để đảm bảo hệ thống có thể hoạt động ổn định và tạo được các môi trường thực hành (sandbox) cho người dùng.

Về phần cứng, máy chủ triển khai nên có tối thiểu 8 lõi CPU, 16GB RAM và khoảng 100GB dung lượng lưu trữ SSD. Ngoài ra máy cần có kết nối mạng ổn định để giao tiếp với các dịch vụ như OpenStack và các thành phần khác của hệ thống.

Về phần mềm, hệ thống được cài đặt trên hệ điều hành Ubuntu Server (phiên bản 20.04 hoặc 22.04). Ngoài ra cần cài đặt thêm các công cụ cần thiết như Docker hoặc Podman để chạy container, Docker Compose để quản lý nhiều container cùng lúc, Git để tải mã nguồn hệ thống, Java 17 và Maven để build các dịch vụ backend, cùng với NodeJS để chạy phần giao diện web (frontend).

Bên cạnh đó, hệ thống cũng cần có OpenStack để tạo và quản lý các máy ảo dùng trong sandbox. Một số cổng mạng phổ biến cần được mở để hệ thống hoạt động như cổng 80 và 443 cho truy cập web, cổng 8080 cho backend API và cổng 3000 cho frontend.

# 2. Tải mã nguồn hệ thống KYPO

Sau khi chuẩn bị môi trường, bước tiếp theo là tải mã nguồn của các thành phần trong hệ thống KYPO từ repository.

Các thành phần chính thường bao gồm:

kypo-sandbox-service: quản lý và tạo sandbox

kypo-training-service: quản lý các bài tập và training

kypo-training-portal: giao diện web cho người dùng

Sử dụng lệnh Git để clone mã nguồn về máy:

git clone https://gitlab.ics.muni.cz/muni-kypo-crp/backend-python/kypo-sandbox-service.git
git clone https://gitlab.ics.muni.cz/muni-kypo-crp/backend-python/kypo-training-service.git
git clone https://gitlab.ics.muni.cz/muni-kypo-crp/backend-python/kypo-training-portal.git

Sau khi tải về, các thư mục mã nguồn sẽ được lưu trên máy và có thể tiến hành build và triển khai các service.

# 3. Cấu hình OpenStack

KYPO sử dụng OpenStack để tạo ra các máy ảo phục vụ cho môi trường thực hành. Vì vậy, cần cấu hình thông tin kết nối giữa hệ thống KYPO và OpenStack.

Trong file cấu hình của sandbox service (thường là application.properties hoặc application.yml), cần thiết lập các thông tin như địa chỉ xác thực của OpenStack, tên người dùng, mật khẩu và project.

Ví dụ cấu hình:

openstack.auth.url=http://openstack:5000
openstack.username=admin
openstack.password=password
openstack.project=admin

Thông tin này giúp sandbox service có thể gửi các yêu cầu đến OpenStack để tạo, xóa hoặc quản lý các máy ảo.

# 4. Triển khai Sandbox Service

Sandbox Service là thành phần quan trọng của hệ thống KYPO. Service này chịu trách nhiệm tạo sandbox, quản lý trạng thái sandbox và giao tiếp với OpenStack để khởi tạo các máy ảo.

Trong mã nguồn của service, file trung tâm thường là SandboxService.java. File này chứa các chức năng chính để xử lý việc tạo sandbox và điều phối các tài nguyên cần thiết.

Để build service, di chuyển vào thư mục dự án và chạy Maven:

cd kypo-sandbox-service
mvn clean install

Sau khi build thành công, chạy service bằng lệnh:

java -jar target/sandbox-service.jar

Khi service chạy thành công, backend API của sandbox service sẽ hoạt động trên địa chỉ localhost với cổng 8080.

# 5. Triển khai Training Service

Training Service chịu trách nhiệm quản lý các bài tập, scenario và các hoạt động đào tạo trong hệ thống KYPO. Service này cũng có nhiệm vụ giao tiếp với sandbox service để tạo môi trường thực hành cho người học.

Để triển khai training service, thực hiện build dự án bằng Maven:

cd kypo-training-service
mvn clean install

Sau đó chạy service:

java -jar target/training-service.jar

Sau khi chạy thành công, training service sẽ sẵn sàng nhận các yêu cầu từ frontend và quản lý các hoạt động training.

# 6. Triển khai Training Portal (Frontend)

Training Portal là giao diện web của hệ thống KYPO, nơi người dùng có thể truy cập các bài lab, tạo sandbox và thực hành các bài tập an ninh mạng.

Để triển khai frontend, cần cài đặt các thư viện cần thiết bằng NodeJS.

Di chuyển vào thư mục frontend và chạy:

cd kypo-training-portal
npm install

Sau khi cài đặt xong các dependencies, chạy ứng dụng frontend:

npm start

Khi frontend khởi động thành công, giao diện web sẽ hoạt động tại địa chỉ:

http://localhost:3000

Người dùng có thể truy cập địa chỉ này để sử dụng hệ thống KYPO.

# 7. Kiểm tra hoạt động của hệ thống

Sau khi triển khai tất cả các thành phần, cần kiểm tra xem hệ thống hoạt động đúng hay không.

Trước hết, truy cập vào giao diện web của hệ thống bằng trình duyệt thông qua địa chỉ frontend. Sau khi đăng nhập vào hệ thống, người dùng có thể chọn một bài training hoặc tạo một sandbox mới.

Khi người dùng tạo sandbox, hệ thống sẽ gửi yêu cầu từ frontend đến training service. Sau đó training service sẽ gọi sandbox service. Sandbox service tiếp tục gửi yêu cầu đến OpenStack để tạo các máy ảo cần thiết cho môi trường thực hành.

Nếu quá trình này diễn ra thành công, OpenStack sẽ tạo các virtual machine và trả kết quả về hệ thống KYPO. Người dùng sau đó có thể truy cập vào các máy ảo này để thực hiện bài lab.

# 8. Kết luận

Sau khi triển khai thành công, hệ thống KYPO Cyber Range cho phép tạo các môi trường thực hành an ninh mạng một cách tự động. Người dùng có thể truy cập vào hệ thống thông qua giao diện web, tham gia các bài training và thực hành trên các sandbox được tạo ra từ các máy ảo.

Việc triển khai KYPO giúp xây dựng một nền tảng cyber range phục vụ cho đào tạo, nghiên cứu và thực hành an ninh mạng một cách hiệu quả và an toàn.
=======
# Hướng dẫn triển khai

## Yêu cầu hệ thống

- Linux
- Docker
- PostgreSQL
- Java
- OpenStack

## Các bước triển khai

1. Clone repository
2. Build project
3. Cấu hình hệ thống
4. Khởi động dịch vụ
>>>>>>> 61e4fb17add6fcc31192ac3eeb8059863a9e8c19
