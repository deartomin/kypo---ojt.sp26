---
sidebar_position: 2
title: Triển khai KYPO bằng Local Image (HTTP Server)
---

# Triển khai KYPO bằng Local Image (HTTP Server)

## Tổng quan

Trong một số môi trường, băng thông mạng không đủ để tải image trực tiếp từ internet trong quá trình triển khai. Vì vậy, giải pháp được áp dụng là **host image nội bộ** và cấu hình OpenStack tải từ nguồn local.

Cách làm cụ thể:

- Ghi đè file `images.tf` để thay link download bằng **link nội bộ**
- Sử dụng **Python HTTP Server** để host các image
- OpenStack sẽ tải image từ **HTTP server local**

### Luồng triển khai

1. Chuẩn bị môi trường theo template có sẵn
2. Cấu hình và host image local
3. Ghi đè `images.tf`
4. Deploy hạ tầng
5. Cài đặt và truy cập giao diện KYPO

📌 Tài liệu tham khảo (có thể thiếu một số chi tiết):  
https://drive.google.com/file/d/1hevrTVSduv5o4A1Tuuq9DAEqgdKX5p4K/view

📌 Update (23/04/2026):  
Hiện tại đã có Cloud → thời gian tải giảm còn khoảng **30–40 phút**.  
Nhóm cũng đã build script tự động → xem thêm ở phần _Script tự cài đặt KYPO_.

---

## Yêu cầu hệ thống

### Hệ điều hành

- Ubuntu 24.04

### Cấu hình đề xuất

| Tài nguyên | Cấu hình |
| ---------- | -------- |
| CPU        | 8 vCPU   |
| RAM        | 48 GB    |
| Storage    | 250 GB   |

### Cấu hình tối thiểu

- 4 vCPU
- 48 GB RAM

---

## Nền tảng triển khai

Có thể triển khai trên:

- Máy chủ vật lý
- Máy tính cá nhân
- Máy ảo

---

## Bước 1: Clone repository

```bash
git clone https://github.com/cyberrangecz/devops-crczp-lite.git
```

Tạo thư mục chứa image:

```bash
mkdir httpSV
cd httpSV
```

---

## Bước 2: Tải image

```bash
wget -O ubuntu-noble-x86_64.qcow2 https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img
wget -O kali.qcow2 https://gm7ve.upcloudobjects.com/crczp-images/kali.qcow2
wget -O ubuntu-noble-man.qcow2 https://gm7ve.upcloudobjects.com/crczp-images/ubuntu-noble-man.qcow2
wget -O debian-12.qcow2 https://cloud.debian.org/images/cloud/bookworm/latest/debian-12-generic-amd64.qcow2
```

---

## (Tùy chọn) Gửi file bằng croc

Repository: https://github.com/schollz/croc

### Cài đặt

Linux:

```bash
curl https://getcroc.schollz.com | bash
```

Windows:

```bash
scoop install croc
# hoặc
choco install croc
# hoặc
winget install schollz.croc
```

MacOS:

```bash
brew install croc
```

### Gửi file

Máy gửi:

```bash
croc send [file]
```

Server nhận:

```bash
croc
```

---

## Bước 3: Tạo file images.tf

```bash
nano images.tf
```

```hcl
resource "openstack_images_image_v2" "noble" {
  name             = "ubuntu-noble-x86_64"
  image_source_url = "http://192.168.121.1:8080/noble-server-cloudimg-amd64.img"
  container_format = "bare"
  disk_format      = "qcow2"

  properties = {
    os_type = "linux"
  }
}

resource "openstack_images_image_v2" "debian_12" {
  name             = "debian-12-x86_64"
  image_source_url = "http://192.168.121.1:8080/debian-12-genericcloud-amd64.qcow2"
  container_format = "bare"
  disk_format      = "qcow2"

  properties = {
    os_type = "linux"
  }
}

resource "openstack_images_image_v2" "kali" {
  count            = var.kali ? 1 : 0
  name             = "kali"
  image_source_url = "http://192.168.121.1:8080/kali.qcow2"
  container_format = "bare"
  disk_format      = "qcow2"

  properties = {
    os_type = "linux"
    "owner_specified.openstack.gui_access" = true
  }
}

resource "openstack_images_image_v2" "noble_man" {
  count            = var.noble_man ? 1 : 0
  name             = "ubuntu-noble-man"
  image_source_url = "http://192.168.121.1:8080/ubuntu-noble-man.qcow2"
  container_format = "bare"
  disk_format      = "qcow2"

  properties = {
    os_type = "linux"
    "owner_specified.openstack.gui_access" = true
  }
}
```

⚠ Lưu ý: Thay `192.168.121.1` bằng IP server của bạn

---

## Bước 4: Chỉnh sửa script deploy

```bash
03-infrastructure-deploy.sh
```

Thay function `deploy_base_infrastructure()` để:

- Tự động tải `images.tf`
- Ghi đè module images
- Giảm song song tránh nghẽn I/O

Sau khi chạy:

```bash
tofu init
```

Script sẽ:

1. Download `images.tf`
2. Ghi đè vào module Terraform
3. Chạy:

```bash
tofu apply -parallelism=1
```

---

## Bước 5 (Tùy chọn): Screen

```bash
sudo apt install screen
screen -S http.python
```

---

## Bước 6: Chạy HTTP Server

```bash
python3 -m http.server 8080
```

⚠ Nếu đổi port → phải sửa lại trong `images.tf`

---

## Bước 7: Deploy hạ tầng

```bash
cd devops-crczp-lite
```

(Optional)

```bash
screen -S vagrant.up
```

Cài dependency:

```bash
sudo apt install -y qemu-kvm libvirt-daemon libvirt-clients bridge-utils virt-manager docker.io
```

Chạy deploy:

```bash
docker run -it --rm \
-e LIBVIRT_DEFAULT_URI \
-v /var/run/libvirt/:/var/run/libvirt/ \
-v ~/.vagrant.d:/.vagrant.d \
-v $(realpath "${PWD}"):${PWD} \
-w "${PWD}" \
--network host \
vagrantlibvirt/vagrant-libvirt:latest \
vagrant up | tee debug.txt
```

---

## Xem log

```bash
tail -f debug.txt
```

---

## Reset môi trường

```bash
vagrant destroy -f
rm -rf .vagrant
```

---

## Hoàn tất

Sau khi deploy xong, chạy:

```bash
sshuttle -r sp26-ojt@100.70.135.32 10.1.2.0/24
```

để truy cập mạng nội bộ và giao diện web.

---

## Lưu ý quan trọng

- Luôn thay `192.168.121.1` bằng IP thực tế
- IP thay đổi tùy môi trường
- Thời gian deploy:
  - Không cloud: ~4–5 giờ
  - Có cloud: ~30–40 phút
