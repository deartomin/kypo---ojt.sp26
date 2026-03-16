---
sidebar_position: 2
---

# Hướng dẫn triển khai KYPO

## Tổng quan

Do hệ thống mạng tại server không đáp ứng được nhu cầu trong quá trình setup, việc triển khai sẽ được thực hiện bằng cách **ghi đè file `images.tf`**.

Trong đó:

- Toàn bộ link download image trong `images.tf` sẽ được **thay bằng link local**.
- Sử dụng **Python HTTP Server** để host các image.
- OpenStack sẽ download image từ **HTTP server local** thay vì từ internet.

Trước tiên cần **cài đặt môi trường cơ bản theo khung có sẵn**.  
Sau khi hệ thống hoạt động ổn định, tiến hành **cài đặt giao diện KYPO**.

Bạn có thể tham khảo chi tiết trước tại đây (1 số phần tại blog không ghi rõ) [Tài liệu setup KYPO](https://drive.google.com/file/d/1hevrTVSduv5o4A1Tuuq9DAEqgdKX5p4K/view)

---

# Yêu cầu hệ thống

## Hệ điều hành

- Ubuntu 24.04

## Cấu hình phần cứng đề xuất

| Tài nguyên | Cấu hình   |
| ---------- | ---------- |
| CPU        | 8 vCPU     |
| RAM        | 48 GB      |
| Storage    | 250 GB HDD |

Cấu hình tối thiểu để chạy chức năng cơ bản:

- **4 vCPU**
- **48 GB RAM**

---

# Nền tảng triển khai

Hệ thống có thể chạy trên:

- Máy chủ vật lý
- Máy tính để bàn
- Máy ảo

---

# Step 1: Clone repository

Clone repository từ GitHub:

```bash
git clone https://github.com/cyberrangecz/devops-crczp-lite.git
```

Tạo thư mục để chứa image và file `images.tf`:

```bash
mkdir httpSV
cd httpSV
```

---

# Step 2: Tải image

Tải các image cần thiết:

```bash
wget -O ubuntu-noble-x86_64.qcow2 https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img
```

```bash
wget -O kali.qcow2 https://gm7ve.upcloudobjects.com/crczp-images/kali.qcow2
```

```bash
wget -O ubuntu-noble-man.qcow2 https://gm7ve.upcloudobjects.com/crczp-images/ubuntu-noble-man.qcow2
```

---

## Cách khác: sử dụng croc để gửi file

Có thể tải file về máy local rồi gửi lên server bằng **croc**.

Repository:

https://github.com/schollz/croc

### Cài đặt croc

Linux

```bash
curl https://getcroc.schollz.com | bash
```

Windows

```bash
scoop install croc
```

hoặc

```bash
choco install croc
```

hoặc

```bash
winget install schollz.croc
```

MacOS

```bash
brew install croc
```

---

### Gửi file

Trên máy có file:

```bash
croc send [file]
```

Sau đó trên server chạy:

```bash
croc
```

Nhập mã hiển thị, ví dụ:

```bash
croc 3584-common-citrus-octopus
```

---

# Step 3: Tạo file images.tf

Tạo file:

```bash
nano images.tf
```

Nội dung:

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

⚠ Lưu ý:

Thay `192.168.121.1` bằng **địa chỉ IP server của bạn**.

---

# Step 4: Chỉnh sửa file deploy

Mở file:

```bash
03-infrastructure-deploy.sh
```

Thay toàn bộ function `deploy_base_infrastructure()` bằng version custom để:

- Tự động tải `images.tf`
- Ghi đè module images
- Chạy Terraform tuần tự

---

## Mục đích của thay đổi

- Download `images.tf` sau khi chạy `tofu init`
- Ghi đè file images.tf trong module
- Chạy `tofu apply` với `parallelism=1` để tránh nghẽn I/O

---

## Tóm tắt

Sau khi chạy:

```bash
tofu init
```

Script sẽ:

1. Download `images.tf`
2. Ghi đè vào thư mục module Terraform
3. Chạy:

```bash
tofu apply -parallelism=1
```

Điều này giúp tránh lỗi khi xử lý đa luồng.

---

⚠ Lưu ý

Luôn thay:

```
192.168.121.1
```

bằng **IP server của bạn**.

---

# Step 5 (Optional): Sử dụng Screen

Để tránh mất session khi SSH, nên sử dụng **screen**.

GNU Screen là công cụ giúp quản lý nhiều session terminal.

### Cài đặt

```bash
sudo apt install screen
```

Tạo session để chạy HTTP server:

```bash
screen -S http.python
```

---

# Step 6: Chạy HTTP Server

Trong thư mục chứa image:

```bash
python3 -m http.server 8080
```

hoặc

```bash
python -m http.server 8080
```

⚠ Lưu ý: Nếu thay đổi port, cần cập nhật lại trong `images.tf`.

---

# Step 7: Deploy hạ tầng

Mở tab SSH mới.

Vào thư mục repo:

```bash
cd devops-crczp-lite
```

(Optional) tạo screen:

```bash
screen -S vagrant.up
```

Cài đặt dependency:

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

# Xem log

```bash
tail -f debug.txt
```

---

# Reset môi trường

Lưu ý: Nếu cần deploy lại từ đầu:

```bash
vagrant destroy -f
rm -rf .vagrant
```

## Hoàn tất triển khai

Nếu màn hình hiển thị như hình dưới đây, quá trình deploy đã thành công

![Deployment Done](/img/deployment-done.jpg)

Sau đó chạy lệnh sau để kết nối vào mạng nội bộ, và dùng IP để truy cập vào giao diện web:

```bash
sshuttle -r sp26-ojt@100.70.135.32 10.1.2.0/24
```

⚠ Lưu ý: Thay 192.168.121.1 bằng địa chỉ IP server của bạn
IP này có thể khác nhau tùy theo từng máy hoặc môi trường  
Quá trình deploy có thể mất 4 -5 tiếng tùy cấu hình máy và mạng (nếu có cloud thì sẽ nhanh hơn)
