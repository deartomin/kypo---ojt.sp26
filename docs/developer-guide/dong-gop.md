---
title: Script tự động cài đặt KYPO
sidebar_position: 6
---

# Hướng dẫn triển khai KYPO bằng script tự động

## 1. Tổng quan

Tài liệu này hướng dẫn sử dụng script để triển khai **CyberRangeCZ Platform Lite (KYPO)** trên một máy chủ duy nhất.

Script được thiết kế nhằm tự động hóa toàn bộ quy trình cài đặt, giúp người dùng không cần thao tác thủ công nhiều bước phức tạp.

Chỉ cần chạy script và lựa chọn chức năng trong menu, hệ thống sẽ tự động:

- Cài đặt môi trường cần thiết
- Đồng bộ source code
- Triển khai hạ tầng ảo hóa
- Cài đặt CyberRangeCZ Platform

⚠️ **Lưu ý quan trọng**

- Đây là phiên bản **Lite (single-host)**
- Sử dụng **multi-layer virtualization**
- Không phù hợp cho production

Phù hợp cho:

- Học tập
- Demo
- Phát triển nội dung

---

## 2. Yêu cầu hệ thống

- Hệ điều hành: **Ubuntu 24.04**
- CPU: **8 vCPU** (tối thiểu 4)
- RAM: **48 GB**
- Disk: **250 GB**
- Hỗ trợ KVM / nested virtualization

---

## 3. Hướng dẫn tải và chạy script

### Cách 1: Clone repository

```bash
git clone https://github.com/sp26-ojt/kypo-sp26-backup
cd kypo-sp26-backup
```

Cấp quyền thực thi:

```bash
chmod +x *.sh
chmod +x scripts/*.sh 2>/dev/null
```

Chạy script:

```bash
./[ten-script].sh
```

### Cách 2: Chạy trực tiếp bằng curl

```bash
curl -sSL https://..../[ten-script].sh | bash
```

👉 Chỉ nên dùng khi tin tưởng nguồn script.

---

## 4. Menu chức năng

```text
1. BUILD MỚI (Triển khai hệ thống)
2. XEM LOG (Kiểm tra trạng thái hệ thống)
3. RESTART MỀM (Khắc phục nghẽn tạm thời)
4. RESET (Xóa toàn bộ môi trường)
5. THOÁT
```

---

## 5. Quy trình build hệ thống

### Step 1: Đồng bộ source code

```bash
git fetch --all
git reset --hard origin/main || git reset --hard origin/master
git clean -fd
```

Lệnh này giúp repository luôn ở trạng thái sạch và đồng bộ với source mới nhất.

### Step 2: Cài đặt dependency

```bash
sudo apt update
sudo apt install -y \
  qemu-kvm \
  libvirt-daemon \
  libvirt-clients \
  bridge-utils \
  virt-manager \
  docker.io \
  screen \
  wget curl git
```

Các package này phục vụ cho:

- Ảo hóa KVM
- Docker
- Chạy tiến trình nền

### Step 3: Triển khai hệ thống

```bash
docker run -it --rm \
  -e LIBVIRT_DEFAULT_URI \
  -v /var/run/libvirt/:/var/run/libvirt/ \
  -v ~/.vagrant.d:/.vagrant.d \
  -v $(realpath "${PWD}"):${PWD} \
  -w "${PWD}" \
  --network host \
  vagrantlibvirt/vagrant-libvirt:latest \
  vagrant up
```

Quá trình này sẽ:

1. Tạo VM bằng KVM
2. Cài OpenStack
3. Deploy CyberRangeCZ Platform

### Step 4: Truy cập hệ thống

#### Local

Mở trực tiếp bằng trình duyệt

#### Remote

```bash
sshuttle -r root@host 10.1.2.0/24
```

---

## 6. Thông tin hệ thống sau khi deploy

- Network: `10.1.2.0/24`
- OpenStack: `10.1.2.9`
- VM chính: `10.1.2.10`

### Truy cập OpenStack CLI

```bash
vagrant ssh -- -t 'sudo su'
```

### Truy cập OpenStack GUI

```text
http://10.1.2.9
```

- User: `admin`

Lấy password:

```bash
grep "OS_PASSWORD" /etc/kolla/admin-openrc.sh
```

---

## 7. Xem log hệ thống

```bash
kubectl get pods -A
kubectl logs -f -l "app.kubernetes.io/name=sandbox-service" -n crczp
```

Dùng để kiểm tra trạng thái các service Kubernetes.

---

## 8. Restart mềm hệ thống

Dùng khi hệ thống bị chậm hoặc nghẽn tạm thời.

```bash
sudo sync
echo 3 | sudo tee /proc/sys/vm/drop_caches
docker restart $(docker ps -q)
sudo systemctl restart libvirtd
```

Thao tác này sẽ:

- Giải phóng cache RAM
- Restart container
- Restart dịch vụ KVM

---

## 9. Reset môi trường

Dùng khi cần triển khai lại từ đầu.

```text
Dừng screen → vagrant destroy → xóa .vagrant → dọn Docker
```

⚠️ Lưu ý: thao tác này sẽ xóa toàn bộ môi trường hiện tại.

---

## 10. Kiến trúc hệ thống

```text
Host → KVM → OpenStack → VM → Kubernetes
```

Đây là kiến trúc ảo hóa nhiều tầng nên yêu cầu tài nguyên cao.

Khuyến nghị:

- RAM ≥ 48GB
- SSD / disk tốc độ cao
- CPU đủ mạnh

Nếu thiếu tài nguyên, `vagrant up` có thể bị lỗi hoặc treo.
