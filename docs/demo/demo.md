---
title: Hướng dẫn Demo các kịch bản đào tạo
sidebar_position: 2
---

# Hướng dẫn Demo hệ thống KYPO

Tài liệu này hướng dẫn chi tiết quy trình thiết lập và triển khai bài thực hành trên hệ thống KYPO cho các loại hình: Tuyến tính (**Linear**), Thích nghi (**Adaptive**) và kịch bản **Brute-force**.

---

## I. Demo Linear Training (Huấn luyện tuyến tính)

Quy trình thực hiện bài học theo một lộ trình cố định.

### 1. Thiết lập hạ tầng Sandbox

1. Truy cập **Sandboxes** -> **Definition** -> Nhấn **Create**.
2. Sử dụng link Git: `https://github.com/Unknown-113/linear-test-2.git`. Điền vào ô **Git URL** và chọn **Revision** là `main`.
   ![Giao diện tạo Sandbox Definition](/img/demo1.png)
3. Kiểm tra lại trong danh sách **Sandbox Definition Overview**.
   ![Bảng định nghĩa Sandbox Definition Overview](/img/demo2.png)
4. Tạo Pool: Truy cập **Sandboxes** -> **Pool** -> **Create**. Chọn definition vừa tạo và thiết lập số lượng máy ảo.
   ![Giao diện tạo Sandbox Pool](/img/demo5.png)
5. Đợi cho đến khi trạng thái chuyển sang `unlocked` tại **Pool Overview**.
   ![Bảng quản lý Pool Overview](/img/demo6.jpg)

### 2. Linear Training Definition Overview

1. Truy cập **Trainings** -> **Definition** -> **Linear**. Nhấn **Upload** file JSON tương ứng.
   ![Popup upload bài học Linear](/img/demo3.jpg)
2. Chuyển trạng thái bài học sang **Released**.
   ![Danh sách các Training Definition](/img/demo4.jpg)

### 3. Tạo phiên thực hành (Instance) và Làm bài

1. Truy cập **Trainings** -> **Instance** -> **Linear** -> **Create**. Thiết lập Tiêu đề, Pool và **Access Token Prefix**.
   ![Thiết lập Training Instance](/img/demo7.jpg)
2. Sau khi lưu, hệ thống sẽ tự động tạo một mã PIN ngẫu nhiên ghép vào sau tiền tố để tạo thành **Access Token** hoàn chỉnh (ví dụ: `final1-1271`).
   ![Danh sách Training Instance Overview](/img/demo8.jpg)
3. **Người làm bài** lấy mã **Access Token** này, truy cập vào trang **Training Run**, nhập mã để đăng nhập và bắt đầu làm bài.
   ![Danh sách Training Instance Overview](/img/demo24.png)
4. Nhấn **Run**, vào tab **Topology**, chuột phải vào máy ảo chọn **Open Console** để giải đố.
   ![Giao diện Training Run](/img/demo9.jpg)
   ![Sơ đồ mạng và mở Console máy ảo](/img/demo10.png)

---

## II. Demo Adaptive Training (Huấn luyện thích nghi)

Quy trình thực hiện bài học có lộ trình thay đổi linh hoạt tùy theo năng lực người làm bài.

### 1. Thiết lập hạ tầng Sandbox cho Adaptive

1. Truy cập **Sandboxes** -> **Definition** -> Nhấn **Create**.
2. Sử dụng link Git: `https://github.com/Unknown-113/adaptive-test.git`.
   ![Giao diện tạo Sandbox Definition cho Adaptive](/img/demo11.jpg)
   ![Danh sách Sandbox Definition Overview Adaptive](/img/demo12.jpg)
3. Khởi tạo Pool cho Adaptive và đợi trạng thái sẵn sàng (`unlocked`).
   ![Giao diện tạo Pool cho Adaptive](/img/demo15.jpg)
   ![Bảng quản lý Pool Overview Adaptive](/img/demo16.jpg)

### 2. Adaptive Training Definition Overview

1. Truy cập **Trainings** -> **Definition** -> **Adaptive**. Tải lên kịch bản thích nghi (JSON).
   ![Popup upload bài học Adaptive](/img/demo13.jpg)
2. Đảm bảo trạng thái bài học là **Released**.
   ![Danh sách Adaptive Training Definition Overview](/img/demo14.jpg)

### 3. Tạo phiên thực hành và Bắt đầu

1. Tạo Instance cho Adaptive Training tương tự quy trình Linear. Tại đây bạn cũng cần thiết lập **Access Token Prefix**.
   ![Thiết lập Adaptive Training Instance](/img/demo17.jpg)
2. Kiểm tra mã **Access Token** (bao gồm tiền tố và mã PIN) trong bảng quản lý. **Người làm bài** sử dụng mã này để truy cập vào phiên học.
   ![Danh sách Adaptive Training Instance Overview](/img/demo18.jpg)
3. Khi nhấn **Run** và nhập mã thành công, **người làm bài** sẽ bắt đầu với màn hình chào mừng (Welcome).
   ![Giao diện bắt đầu bài học Adaptive](/img/demo19.jpg)

---

## III. Demo Kịch bản Brute-force

Kịch bản tập trung vào việc thực hiện tấn công bẻ khóa mật khẩu trong môi trường kiểm soát.

### 1. Kết nối kho lưu trữ và Định nghĩa Sandbox

1. Sử dụng kho lưu trữ chuyên dụng: `https://github.com/sp26-ojt/demo-training.git`.
2. Tạo một **Sandbox Definition** mới sử dụng URL này.
   ![Tạo Sandbox Definition cho kịch bản Brute-force](/img/demo20.png)
3. Xác nhận định nghĩa đã được hệ thống ghi nhận thành công.
   ![Xác nhận Sandbox Definition brute-force](/img/demo21.png)

### 2. Cung cấp hạ tầng và Tạo Pool

1. Tạo một **Sandbox Pool** liên kết với định nghĩa brute-force vừa tạo.
   ![Tạo Pool cho kịch bản brute-force](/img/demo22.png)
2. Theo dõi tại **Pool Overview** cho đến khi trạng thái chuyển sang `unlocked`.
   ![Hạ tầng brute-force sẵn sàng](/img/demo23.png)

### 3. Thực hiện tấn công và Phân tích

1. **Tạo Instance**: Thiết lập tiền tố mã truy cập. Sau khi hệ thống cấp **Access Token Pin**, **người làm bài** nhập toàn bộ mã vào trang làm bài.
2. **Truy cập máy Attacker**: Nhấn **Run**, vào tab **Topology**, chuột phải vào máy tấn công chọn **Open Console**.
3. **Thực hiện bẻ khóa**: Sử dụng các công cụ brute-force (như Hydra) để tìm mật khẩu, đăng nhập vào mục tiêu và lấy flag.
