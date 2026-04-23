---
title: Hướng dẫn Demo Linear & Adaptive Training
sidebar_position: 2
---

# Hướng dẫn Demo Training

Tài liệu này hướng dẫn chi tiết quy trình thiết lập và triển khai bài thực hành cho cả hai loại hình: Tuyến tính (**Linear**) và Thích nghi (**Adaptive**).

---

## I. Demo Linear Training

Quy trình thực hiện bài học theo lộ trình cố định.

### 1. Thiết lập hạ tầng Sandbox

1. Truy cập **Sandboxes** -> **Definition** -> Nhấn **Create**. Điền **Git URL** và **Revision**.
   ![Giao diện tạo Sandbox Definition](/img/demo1.png)
2. Kiểm tra lại trong danh sách Overview.
   ![Bảng định nghĩa Sandbox Definition Overview](/img/demo2.png)
3. Tạo Pool: Truy cập **Sandboxes** -> **Pool** -> **Create**. Chọn definition vừa tạo và số lượng máy ảo.
   ![Giao diện tạo Sandbox Pool](/img/demo5.png)
4. Đợi trạng thái hiển thị `unlocked` tại Pool Overview.
   ![Bảng quản lý Pool Overview](/img/demo6.jpg)

### 2. Linear Training Definition Overview

1. Truy cập **Trainings** -> **Definition** -> **Linear**. Nhấn **Upload** file JSON.
   ![Popup upload bài học Linear](/img/demo3.jpg)
2. Chuyển trạng thái bài học sang **Released**.
   ![Danh sách các Training Definition](/img/demo4.jpg)

### 3. Tạo phiên thực hành (Instance) và Làm bài

1. Truy cập **Trainings** -> **Instance** -> **Linear** -> **Create**. Thiết lập Title, Pool và Token.
   ![Thiết lập Training Instance](/img/demo7.jpg)
2. Lấy Access Token để đăng nhập.
   ![Danh sách Training Instance Overview](/img/demo8.jpg)
3. Nhấn **Run**, vào tab **Topology**, chuột phải vào máy ảo chọn **Open Console** để giải đố.
   ![Giao diện Training Run](/img/demo9.jpg)
   ![Sơ đồ mạng và mở Console máy ảo](/img/demo10.png)

---

## II. Demo Adaptive Training

Quy trình thực hiện bài học có lộ trình thay đổi tùy theo năng lực người học.

### 1. Thiết lập hạ tầng Sandbox cho Adaptive

1. Tương tự Linear, bạn cần tạo Definition và Pool riêng cho bài Adaptive.
   ![Giao diện tạo Sandbox Definition cho Adaptive](/img/demo11.jpg)
   ![Danh sách Sandbox Definition Overview Adaptive](/img/demo12.jpg)
2. Khởi tạo Pool và đợi hạ tầng sẵn sàng.
   ![Giao diện tạo Pool cho Adaptive](/img/demo15.jpg)
   ![Bảng quản lý Pool Overview Adaptive](/img/demo16.jpg)

### 2. Adaptive Training Definition Overview

1. Truy cập **Trainings** -> **Definition** -> **Adaptive**. Tải lên kịch bản thích nghi.
   ![Popup upload bài học Adaptive](/img/demo13.jpg)
2. Đảm bảo trạng thái là **Released**.
   ![Danh sách Adaptive Training Definition Overview](/img/demo14.jpg)

### 3. Tạo phiên thực hành và Bắt đầu

1. Tạo Instance cho Adaptive Training tương tự như Linear.
   ![Thiết lập Adaptive Training Instance](/img/demo17.jpg)
2. Kiểm tra Instance đã tạo trong bảng quản lý.
   ![Danh sách Adaptive Training Instance Overview](/img/demo18.jpg)
3. Khi nhấn **Run**, người học sẽ bắt đầu với màn hình Welcome trước khi vào các giai đoạn tùy biến.
   ![Giao diện bắt đầu bài học Adaptive](/img/demo19.jpg)
