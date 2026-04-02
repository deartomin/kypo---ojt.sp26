---
title: Đóng góp
sidebar_position: 6
---

# Hướng dẫn sử dụng script triển khai KYPO

## Tổng quan

Script này được dùng để tự động hóa quá trình triển khai môi trường KYPO.  
Thay vì phải thao tác thủ công nhiều bước, người dùng chỉ cần chạy script và chọn chức năng phù hợp trong menu.

Script hỗ trợ các tác vụ chính:

- Build mới toàn bộ hệ thống
- Xem log hệ thống
- Restart mềm khi máy bị nghẽn
- Dọn dẹp và reset môi trường

Trong quá trình build, script sẽ tự động:

- Đồng bộ source code từ repository
- Cài đặt các gói phụ thuộc cần thiết
- Chuẩn bị image máy ảo
- Cấu hình IP cho các file triển khai
- Mở HTTP server để host image
- Chạy `vagrant up` thông qua Docker

---

# Hướng dẫn tải script và thực thi

Có thể sử dụng một trong hai cách dưới đây.

## Cách 1: Clone repository rồi chạy script

Clone source code:

```bash
git clone https://github.com/..../.....
```

Cấp quyền thực thi cho script:

```bash
chmod +x [ten-script].sh
```

Chạy script:

```bash
./[ten-script].sh
```

---

## Cách 2: Chạy trực tiếp bằng `curl`

Nếu script đã được đặt sẵn trên một đường dẫn công khai, có thể chạy trực tiếp bằng một câu lệnh:

```bash
curl -sSL https://..../[ten-script].sh | bash
```

Cách này gọn hơn vì không cần clone thủ công rồi cấp quyền riêng cho file script.

---

# Menu chức năng

Khi khởi động, script hiển thị menu chính gồm các tùy chọn sau:

```sh
show_menu() {
    clear
    echo "======================================================="
    echo "   KYPO SP26 - CÔNG CỤ QUẢN LÝ CÀI ĐẶT TỰ ĐỘNG"
    echo "======================================================="
    echo "1. BUILD MỚI (Khởi chạy quy trình chuẩn 6 bước)"
    echo "2. XEM LOG HỆ THỐNG (Tự động SSH & Chọn Log)"
    echo "3. RESTART MỀM (Khởi động lại dịch vụ khi bị nghẽn)"
    echo "4. DỌN DẸP & RESET (Xóa tiến độ cũ để làm lại)"
    echo "5. THOÁT"
    echo "-------------------------------------------------------"
    read -p "Lựa chọn của bạn (1-5): " main_opt
}
```

Các chức năng tương ứng là:

1. **Build mới hệ thống**  
   Dùng khi cần triển khai lại toàn bộ môi trường từ đầu.

2. **Xem log hệ thống**  
   Tự động SSH vào máy ảo Vagrant và mở menu phụ để xem Pod hoặc log dịch vụ.

3. **Restart mềm**  
   Dùng để giải phóng cache, restart Docker container và dịch vụ `libvirtd` khi hệ thống bị nghẽn.

4. **Dọn dẹp và reset**  
   Xóa toàn bộ tài nguyên đã tạo để đưa môi trường về trạng thái sạch.

---

# Luồng build hệ thống

Khi chọn **Build mới hệ thống**, script sẽ chạy quy trình gồm 6 bước:

1. Đồng bộ source code từ GitHub
2. Cài đặt dependency
3. Chuẩn bị image máy ảo
4. Cấu hình IP
5. Mở HTTP server
6. Chạy `vagrant up`

---

## Step 1: Đồng bộ source code

Script kiểm tra xem thư mục repository đã tồn tại hay chưa.

Nếu chưa có thì clone mới:

```bash
git clone "$REPO_URL"
```

Nếu đã có thì cập nhật lại toàn bộ nội dung bằng cách ghi đè:

```bash
git fetch --all
git reset --hard origin/main || git reset --hard origin/master
git clean -fd
```

Mục tiêu của bước này là đảm bảo source code luôn ở trạng thái sạch, không bị lẫn file cũ hoặc thay đổi local.

Sau đó script di chuyển vào thư mục repo và cấp lại quyền thực thi cho các file `.sh`:

```bash
cd "$REPO_DIR" || { echo "Failed to enter directory $REPO_DIR"; exit 1; }

chmod +x *.sh
chmod +x scripts/*.sh 2>/dev/null
```

Nếu không thể vào thư mục repository, script sẽ dừng.

---

## Step 2: Cài đặt dependency

Script cài đặt các gói phụ thuộc cần thiết bằng lệnh:

```bash
sudo apt update
sudo apt install -y qemu-kvm libvirt-daemon libvirt-clients bridge-utils virt-manager docker.io screen wget curl git
```

Các thành phần chính gồm:

- `qemu-kvm`
- `libvirt-daemon`
- `libvirt-clients`
- `bridge-utils`
- `virt-manager`
- `docker.io`
- `screen`
- `wget`
- `curl`
- `git`

Nếu máy chưa có `croc`, script cũng sẽ tự cài:

```bash
if ! command -v croc &> /dev/null; then
    echo "Installing croc for fast file transfer..."
    curl https://getcroc.schollz.com | bash
fi
```

`croc` được dùng để chuyển file nhanh từ máy cá nhân lên server.

---

## Step 3: Chuẩn bị image máy ảo

Script tạo thư mục chứa image nếu thư mục này chưa tồn tại:

```bash
if [ ! -d "$HTTP_DIR" ]; then
    mkdir -p "$HTTP_DIR"
fi
```

Sau đó khai báo danh sách các image cần dùng:

```bash
IMAGES=(
    "ubuntu-noble-x86_64.qcow2|https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img"
    "debian-12-generic-amd64.qcow2|https://cloud.debian.org/images/cloud/bookworm/latest/debian-12-generic-amd64.qcow2"
    "kali.qcow2|https://gm7ve.upcloudobjects.com/crczp-images/kali.qcow2"
    "ubuntu-noble-man.qcow2|https://gm7ve.upcloudobjects.com/crczp-images/ubuntu-noble-man.qcow2"
)
```

Người dùng sẽ được chọn một trong ba cách chuẩn bị image:

1. **Dùng file đã có sẵn trên server**
2. **Chuyển file từ máy cá nhân bằng `croc`**
3. **Tải mới từ Internet**

Menu lựa chọn như sau:

```bash
while true; do
    echo "-------------------------------------------------------"
    echo "LỰA CHỌN THIẾT LẬP IMAGE:"
    echo "1. Tôi đã có sẵn file trên Server (Sẽ tự cấu hình)"
    echo "2. Chuyển file từ máy cá nhân qua Server (Hướng dẫn dùng croc)"
    echo "3. Tải mới từ Internet (Prepared images)"
    echo "-------------------------------------------------------"
    read -p "Chọn phương thức của bạn (1/2/3): " img_option
```

Nếu chọn tải mới từ Internet, script sẽ tự động tải từng file image chưa có:

```bash
for item in "${IMAGES[@]}"; do
    FILENAME=$(echo "$item" | cut -d'|' -f1)
    URL=$(echo "$item" | cut -d'|' -f2)
    if [ ! -f "$HTTP_DIR/$FILENAME" ]; then
        echo "Đang tải $FILENAME..."
        wget -O "$HTTP_DIR/$FILENAME" "$URL"
    else
        echo "File $FILENAME đã tồn tại, bỏ qua."
    fi
done
```

---

## Step 4: Cấu hình IP

Sau khi có image, script sẽ cập nhật địa chỉ IP vào các file triển khai.

### Cập nhật `images.tf`

Script tự động phát hiện IP, sau đó cho phép người dùng nhập lại nếu cần:

```bash
echo "IP tự động phát hiện: $AUTO_IP"
read -p "Nhập Hosting IP (Nhấn Enter để dùng $AUTO_IP): " HOST_IP_INPUT
HOST_IP=${HOST_IP_INPUT:-$AUTO_IP}
```

Nếu file `images.tf` tồn tại, script sẽ thay toàn bộ URL cũ bằng địa chỉ mới:

```bash
sed -i "s|http://[0-9.]*:[0-9]*|http://$HOST_IP:$HTTP_PORT|g" "$HTTP_DIR/images.tf"
```

### Cập nhật file deploy

Tiếp theo, script yêu cầu nhập IP thật của máy chủ vật lý:

```bash
read -p "Nhập IP thật của máy chủ (Physical Server IP): " REAL_MACHINE_IP
```

Sau đó thay địa chỉ mặc định trong file `scripts/03-infrastructure-deploy.sh`:

```bash
sed -i "s|192.168.121.1|$REAL_MACHINE_IP|g" "$DEPLOY_FILE"
```

---

## Step 5: Mở HTTP server

Trước khi bắt đầu build, script hiển thị thông tin xác nhận cấu hình:

```bash
echo "1. Hosting IP: $HOST_IP"
echo "2. Physical IP: $REAL_MACHINE_IP"
read -p "Ấn Enter để bắt đầu quá trình BUILD..." CONFIRM_UP
```

Sau khi xác nhận, script mở một HTTP server nền bằng `python3` và chạy bằng `screen`:

```bash
screen -S http.python -X quit 2>/dev/null
cd "$HTTP_DIR" || exit
screen -dmS http.python python3 -m http.server $HTTP_PORT
cd ..
```

HTTP server này được dùng để host các file image, giúp các bước triển khai phía sau lấy image từ local server thay vì tải trực tiếp từ Internet.

---

## Step 6: Chạy `vagrant up`

Bước cuối cùng là chạy `vagrant up` thông qua Docker container `vagrantlibvirt`.

Script tạo lệnh như sau:

```bash
VAGRANT_DOCKER_CMD="docker run -it --rm -e LIBVIRT_DEFAULT_URI -v /var/run/libvirt/:/var/run/libvirt/ -v ~/.vagrant.d:/.vagrant.d -v \$(realpath "\${PWD}"):\${PWD} -w "\${PWD}" --network host vagrantlibvirt/vagrant-libvirt:latest vagrant up"
```

Sau đó chạy trong `screen` và ghi log vào file debug:

```bash
screen -dmS kypo_build bash -c "$VAGRANT_DOCKER_CMD 2>&1 | tee $DEBUG_FILE"
```

Script sẽ hiển thị:

- đường dẫn xem log build
- lệnh mở lại terminal đang chạy

Ví dụ:

```bash
tail -f debug.txt
screen -r kypo_build
```

---

# Truy cập máy ảo và xem log hệ thống

Chức năng này giúp SSH vào máy ảo Vagrant và mở menu phụ để xem log nhanh.

Trước tiên, script kiểm tra xem thư mục repository đã tồn tại hay chưa:

```bash
if [ ! -d "$REPO_DIR" ]; then
    echo "Lỗi: Không tìm thấy thư mục $REPO_DIR."
    read -p "Ấn Enter để quay lại..."
    return
fi
```

Nếu thư mục tồn tại, script tạo một chuỗi lệnh Bash để chạy bên trong máy ảo.

Menu phụ bên trong máy ảo gồm:

1. Xem danh sách Pod
2. Xem log Sandbox Service
3. Xem log Ansible Worker
4. Xem log UAG Service
5. Mở Bash shell
6. Thoát SSH

Ví dụ một số lệnh được dùng:

```bash
sudo kubectl get pods -A
```

```bash
sudo kubectl logs -f -l "app.kubernetes.io/name=sandbox-service" -n crczp --tail=50
```

Cuối cùng, script SSH vào máy ảo bằng `vagrant ssh` thông qua Docker:

```bash
docker run -it --rm     -e LIBVIRT_DEFAULT_URI     -v /var/run/libvirt/:/var/run/libvirt/     -v ~/.vagrant.d:/.vagrant.d     -v $(realpath "${PWD}"):${PWD}     -w "${PWD}"     --network host     vagrantlibvirt/vagrant-libvirt:latest     vagrant ssh -c "$LOG_COMMAND"
```

---

# Restart mềm

Chức năng này dùng khi máy chủ có dấu hiệu treo hoặc phản hồi chậm.

Script sẽ:

1. Xóa RAM cache
2. Restart các Docker container đang chạy
3. Restart dịch vụ `libvirtd`

```bash
soft_restart() {
    echo "--- RESTART MỀM ---"
    sudo sync; echo 3 | sudo tee /proc/sys/vm/drop_caches > /dev/null
    CONTAINERS=$(docker ps -q)
    [ ! -z "$CONTAINERS" ] && docker restart $CONTAINERS
    sudo systemctl restart libvirtd
    read -p "Ấn Enter..."
}
```

Đây là cách xử lý nhanh khi hệ thống bị nghẽn nhưng chưa cần build lại toàn bộ.

---

# Dọn dẹp và reset

Chức năng này dùng để đưa hệ thống về trạng thái sạch, chuẩn bị cho một lần build mới.

Luồng xử lý tổng quát:

```text
[Xóa session screen] -> [vagrant destroy] -> [Xóa thư mục .vagrant] -> [Dọn Docker]
```

Các thành phần được dọn dẹp gồm:

- session `screen`
- máy ảo Vagrant
- thư mục `.vagrant`
- container hoặc tài nguyên Docker còn sót

Tính năng này phù hợp khi môi trường cũ đã lỗi, build hỏng hoặc cần triển khai lại từ đầu.
