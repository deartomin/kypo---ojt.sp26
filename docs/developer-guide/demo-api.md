---
title: Demo Full luồng qua API
sidebar_position: 4
---

## Demo Full Luồng bằng API

Tài liệu này mô tả đầy đủ luồng thao tác bằng API, bao gồm:

- lấy token từ Keycloak
- tạo sandbox definition
- tạo pool
- allocate sandbox
- import training definition
- tạo training instance
- truy cập vào bài
- lấy deep link
- chỉnh số lần đăng nhập tối đa
- full luồng làm bài cho **adaptive training**
- full luồng làm bài cho **linear training**

### 1. Lấy token từ Keycloak

```bash
export TOKEN=$(curl -k -X POST https://42.115.38.85/keycloak/realms/CRCZP/protocol/openid-connect/token \
  -d "username=crczp-admin" \
  -d "password=password" \
  -d "grant_type=password" \
  -d "client_id=CRCZP-Client" | jq -r '.access_token')
```

### 2. Tạo sandbox definition

```bash
curl -k -X POST https://42.115.38.85/sandbox-service/api/v1/definitions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "<repo github chứa bài lab muốn tạo>",
    "rev": "<branch hoặc tag của repo đó (thông thường sẽ là master hoặc main)>"
  }'
```

### 3. Tạo pool

```bash
curl -k -X POST https://42.115.38.85/sandbox-service/api/v1/pools \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "definition_id": <ID của sandbox definition>,
    "max_size": <số sandbox tối đa>,
    "comment": "Pool test manual",
    "visible": true
  }'
```

> `comment` có thể có hoặc không.

### 4. Allocate sandbox

```bash
curl -k -X POST "https://42.115.38.85/sandbox-service/api/v1/pools/<ID của pool>/sandbox-allocation-units?count=<số lượng sandbox muốn allocate>" \
  -H "Authorization: Bearer $TOKEN"
```

### 5. Kiểm tra trạng thái của sandbox đang allocate

```bash
curl -k -G https://42.115.38.85/sandbox-service/api/v1/pools/<ID của pool>/sandbox-allocation-units \
  -H "Authorization: Bearer $TOKEN"
```

### 6. Tạo adaptive training definition

Đảm bảo đang ở thư mục chứa file `training.json`.

```bash
curl -k -X POST https://42.115.38.85/adaptive-training/api/v1/imports/training-definitions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @training.json
```

### 7. Tạo linear training definition

Đảm bảo đang ở thư mục chứa file `training.json`.

```bash
curl -k -X POST https://42.115.38.85/training/api/v1/imports/training-definitions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @training.json
```

### 8. Tạo adaptive instance

```bash
curl -k -X POST https://42.115.38.85/adaptive-training/api/v1/training-instances \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "<Nhập title>",
    "pool_id": <ID của pool>,
    "training_definition_id": <ID của training definition>,
    "access_token": "<Nhập prefix-token>",
    "start_time": "<Nhập thời gian bắt đầu bài lab theo định dạng ISO 8601 (Ví dụ: 2026-03-20T09:00:00.000Z)>",
    "end_time": "<Nhập thời gian bài lab hết hạn>",
    "backward_mode": <true hoặc false>
  }'
```

### 9. Tạo linear instance

```bash
curl -k -X POST https://42.115.38.85/training/api/v1/training-instances \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "<Nhập title>",
    "pool_id": <ID của pool>,
    "training_definition_id": <ID của training definition>,
    "access_token": "<Nhập prefix-token>",
    "start_time": "<Nhập thời gian bắt đầu bài lab theo định dạng ISO 8601 (Ví dụ: 2026-03-20T09:00:00.000Z)>",
    "end_time": "<Nhập thời gian bài lab hết hạn>",
    "backward_mode": <true hoặc false>
  }'
```

### 10. Lưu ý về thời gian

Các mốc thời gian như `start_time`, `end_time` được tính theo múi giờ gốc **GMT +0**, do đó khi tạo lab phải **trừ đi 7h**.

### 11. Truy cập vào bài (adaptive)

```bash
curl -k -X POST "https://42.115.38.85/adaptive-training/api/v1/training-runs?accessToken=$TRAINING_TOKEN" \
  -H "Authorization: Bearer $TOKEN"
```

### 12. Lấy link vào bài (adaptive)

```bash
curl -k -X POST "https://42.115.38.85/adaptive-training/api/v1/training-runs/<training_run_id>/deep-link" \
  -H "Authorization: Bearer $TOKEN"
```

### 13. Truy cập vào bài (linear)

```bash
curl -k -X POST "https://42.115.38.85/training/api/v1/training-runs?accessToken=$TRAINING_TOKEN" \
  -H "Authorization: Bearer $TOKEN"
```

### 14. Lấy link vào bài (linear)

```bash
curl -k -s -X POST "https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/deep-link" \
  -H "Authorization: Bearer $TOKEN"
```

### 15. Liệt kê các instance hiện có (adaptive)

```bash
curl -k -s "https://42.115.38.85/adaptive-training/api/v1/training-instances" \
  -H "Authorization: Bearer $TOKEN" | jq '.content[] | {id, title, access_token}'
```

### 16. Liệt kê các instance hiện có (linear)

```bash
curl -k -s "https://42.115.38.85/training/api/v1/training-instances" \
  -H "Authorization: Bearer $TOKEN" | jq '.content[] | {id, title, access_token}'
```

### 17. Chỉnh số lần đăng nhập vào bài tối đa (adaptive)

```bash
curl -k -s -X PATCH "https://42.115.38.85/adaptive-training/api/v1/training-instances/<Instance ID>/max-access-attempts?value=<số lần>" \
  -H "Authorization: Bearer $TOKEN"
```

### 18. Chỉnh số lần đăng nhập vào bài tối đa (linear)

```bash
curl -k -s -X PATCH "https://42.115.38.85/training/api/v1/training-instances/<Instance ID>/max-access-attempts?value=<số lần>" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Full luồng làm bài (adaptive)

### Bước 1 — Lấy token của account

```bash
export TOKEN=$(curl -k -s -X POST https://42.115.38.85/keycloak/realms/CRCZP/protocol/openid-connect/token \
  -d "username=<USERNAME>" \
  -d "password=<PASSWORD>" \
  -d "grant_type=password" \
  -d "client_id=CRCZP-Client" | jq -r '.access_token')
```

Kiểm tra token đã lấy được:

```bash
echo $TOKEN
```

### Bước 2 — Vào bài thi

Liệt kê các instance hiện có:

```bash
curl -k -s "https://42.115.38.85/adaptive-training/api/v1/training-instances" \
  -H "Authorization: Bearer $TOKEN" | jq '.content[] | {id, title, access_token}'
```

```bash
export RUN=$(curl -k -s -X POST "https://42.115.38.85/adaptive-training/api/v1/training-runs?accessToken=<ACCESS_TOKEN>" \
  -H "Authorization: Bearer $TOKEN")

export RUN_ID=$(echo $RUN | jq -r '.training_run_id')
export SANDBOX_ID=$(echo $RUN | jq -r '.sandbox_instance_ref_id')

echo "Training Run ID: $RUN_ID"
echo "Sandbox ID: $SANDBOX_ID"
```

Xem nội dung phase hiện tại:

```bash
curl -k -s "https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/resumption" \
  -H "Authorization: Bearer $TOKEN" | jq '.current_phase'
```

### Bước 3 — Lấy SSH config

```bash
curl -k -s "https://42.115.38.85/sandbox-service/api/v1/sandboxes/$SANDBOX_ID/user-ssh-access" \
  -H "Authorization: Bearer $TOKEN" -o ssh-config.zip

unzip ssh-config.zip -d ssh-config
```

Copy private key vào `~/.ssh`:

```bash
cp ssh-config/*-user-key ~/.ssh/
chmod 600 ~/.ssh/*-user-key
```

### Bước 4 — SSH vào máy ảo sandbox

Xem danh sách các host có thể SSH:

```bash
cat ssh-config/*-user-config
```

SSH vào máy lab (thường là `student-vm`):

```bash
ssh -F ssh-config/*-user-config student-vm
```

### Bước 5 — Nộp đáp án

Đối với training phase:

```bash
curl -k -s -X POST "https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/is-correct-answer" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"answer": "<FLAG>"}'
```

Response `"correct": true` nghĩa là đúng.

Đối với access phase, nộp passkey:

```bash
curl -k -s -X POST "https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/is-correct-passkey" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"passkey": <passkey>}'
```

### Bước 6 — Chuyển sang phase tiếp theo

```bash
curl -k -s "https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/next-phases" \
  -H "Authorization: Bearer $TOKEN" | jq '{title, phase_type}'
```

### Bước 7 — Kết thúc bài thi

```bash
curl -k -s -X PUT "https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID" \
  -H "Authorization: Bearer $TOKEN"
```

Không có output = thành công (HTTP 200).

### Bước 8 — Dọn dẹp

```bash
rm -f ~/.ssh/*-user-key
rm -rf ~/ssh-config ~/ssh-config.zip
```

### Lấy deep link để mở giao diện web (tùy chọn)

Nếu muốn chuyển sang giao diện web sau khi đã vào bài từ terminal:

```bash
curl -k -s -X POST "https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/deep-link" \
  -H "Authorization: Bearer $TOKEN" | jq -r '.deep_link_url'
```

Mở URL trả về trên browser — tự động đăng nhập và vào thẳng bài thi.

---

## Full luồng làm bài (linear)

### Bước 1 — Lấy token của account

```bash
export TOKEN=$(curl -k -s -X POST https://42.115.38.85/keycloak/realms/CRCZP/protocol/openid-connect/token \
  -d "username=<USERNAME>" \
  -d "password=<PASSWORD>" \
  -d "grant_type=password" \
  -d "client_id=CRCZP-Client" | jq -r '.access_token')
```

Kiểm tra token đã lấy được:

```bash
echo $TOKEN
```

### Bước 2 — Vào bài thi

Liệt kê các instance hiện có:

```bash
curl -k -s "https://42.115.38.85/training/api/v1/training-instances" \
  -H "Authorization: Bearer $TOKEN" | jq '.content[] | {id, title, access_token}'
```

```bash
export RUN=$(curl -k -s -X POST "https://42.115.38.85/training/api/v1/training-runs?accessToken=<ACCESS_TOKEN>" \
  -H "Authorization: Bearer $TOKEN")

export RUN_ID=$(echo $RUN | jq -r '.training_run_id')
export SANDBOX_ID=$(echo $RUN | jq -r '.sandbox_instance_ref_id')

echo "Training Run ID: $RUN_ID"
echo "Sandbox ID: $SANDBOX_ID"
```

Xem nội dung phase hiện tại:

```bash
echo $RUN | jq '.abstract_level_dto | {title, level_type, cloud_content}'
```

### Bước 3 — Lấy SSH config

```bash
curl -k -s "https://42.115.38.85/sandbox-service/api/v1/sandboxes/$SANDBOX_ID/user-ssh-access" \
  -H "Authorization: Bearer $TOKEN" -o ssh-config.zip

unzip ssh-config.zip -d ssh-config
```

Copy private key vào `~/.ssh`:

```bash
cp ssh-config/*-user-key ~/.ssh/
chmod 600 ~/.ssh/*-user-key
```

### Bước 4 — SSH vào máy ảo sandbox

Xem danh sách các host có thể SSH:

```bash
cat ssh-config/*-user-config
```

SSH vào máy lab (thường là `student-vm`):

```bash
ssh -F ssh-config/*-user-config student-vm
```

### Bước 5 — Nộp đáp án

Đối với training level:

```bash
curl -k -s -X POST "https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/is-correct-answer" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"answer": "<FLAG>"}'
```

Response `"correct": true` nghĩa là đúng.

Đối với access level, nộp passkey:

```bash
curl -k -s -X POST "https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/is-correct-passkey" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"passkey": "<PASSKEY>"}'
```

### Bước 6 — Chuyển sang level tiếp theo

```bash
curl -k -s "https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/next-levels" \
  -H "Authorization: Bearer $TOKEN" | jq '{title, level_type}'
```

### Bước 7 — Kết thúc bài thi

```bash
curl -k -s -X PUT "https://42.115.38.85/training/api/v1/training-runs/$RUN_ID" \
  -H "Authorization: Bearer $TOKEN"
```

Không có output = thành công (HTTP 200).

### Bước 8 — Dọn dẹp

```bash
rm -f ~/.ssh/*-user-key
rm -rf ~/ssh-config ~/ssh-config.zip
```

### Lấy deep link để mở giao diện web (tùy chọn)

Nếu muốn chuyển sang giao diện web sau khi đã vào bài từ terminal:

```bash
curl -k -s -X POST "https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/deep-link" \
  -H "Authorization: Bearer $TOKEN" | jq -r '.deep_link_url'
```

Mở URL trả về trên browser — tự động đăng nhập và vào thẳng bài thi.
