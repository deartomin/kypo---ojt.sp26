---
title: Demo Full luồng qua API
sidebar_position: 4
---

# Demo Full luồng bằng API (Step-by-step)

Tài liệu này hướng dẫn toàn bộ quy trình từ tạo lab, vào bài đến làm bài thông qua API.

---

## PHẦN 1 — CHUẨN BỊ LAB

### Bước 1 — Lấy token từ Keycloak

```bash
export TOKEN=$(curl -k -X POST [https://42.115.38.85/keycloak/realms/CRCZP/protocol/openid-connect/token](https://42.115.38.85/keycloak/realms/CRCZP/protocol/openid-connect/token) \
  -d "username=crczp-admin" \
  -d "password=password" \
  -d "grant_type=password" \
  -d "client_id=CRCZP-Client" | jq -r '.access_token')

echo $TOKEN
```

### Bước 2 — Tạo sandbox definition

```bash
curl -k -X POST [https://42.115.38.85/sandbox-service/api/v1/definitions](https://42.115.38.85/sandbox-service/api/v1/definitions) \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "<repo github chứa bài lab muốn tạo>",
    "rev": "<branch hoặc tag của repo đó (thông thường sẽ là master hoặc main)>"
  }'
```

### Bước 3 — Tạo pool

```bash
curl -k -X POST [https://42.115.38.85/sandbox-service/api/v1/pools](https://42.115.38.85/sandbox-service/api/v1/pools) \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "definition_id": <ID của sandbox definition>,
    "max_size": <số sandbox tối đa>,
    "comment": "Pool test manual",
    "visible": true
  }'
```

### Bước 4 — Allocate sandbox

```bash
curl -k -X POST "[https://42.115.38.85/sandbox-service/api/v1/pools/](https://42.115.38.85/sandbox-service/api/v1/pools/)<ID của pool>/sandbox-allocation-units?count=<số lượng sandbox muốn allocate>" \
  -H "Authorization: Bearer $TOKEN"
```

### Bước 5 — Kiểm tra trạng thái sandbox

```bash
curl -k -G [https://42.115.38.85/sandbox-service/api/v1/pools/](https://42.115.38.85/sandbox-service/api/v1/pools/)<ID của pool>/sandbox-allocation-units \
  -H "Authorization: Bearer $TOKEN"
```

Lưu ý: Đợi cho đến khi trạng thái sandbox là READY.

---

## PHẦN 2 — CẤU HÌNH TRAINING DEFINITION

### Bước 6 — Import training definition

Đảm bảo đang ở thư mục chứa file `training.json`.

**Adaptive:**

```bash
curl -k -X POST [https://42.115.38.85/adaptive-training/api/v1/imports/training-definitions](https://42.115.38.85/adaptive-training/api/v1/imports/training-definitions) \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @training.json
```

**Linear:**

```bash
curl -k -X POST [https://42.115.38.85/training/api/v1/imports/training-definitions](https://42.115.38.85/training/api/v1/imports/training-definitions) \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @training.json
```

### Bước 7 — Tạo training instance

**Adaptive Instance:**

```bash
curl -k -X POST [https://42.115.38.85/adaptive-training/api/v1/training-instances](https://42.115.38.85/adaptive-training/api/v1/training-instances) \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "<Nhập title>",
    "pool_id": <ID của pool>,
    "training_definition_id": <ID của training definition>,
    "access_token": "<Nhập prefix-token>",
    "start_time": "2026-03-20T09:00:00.000Z",
    "end_time": "2026-03-20T12:00:00.000Z",
    "backward_mode": false
  }'
```

**Linear Instance:**

```bash
curl -k -X POST [https://42.115.38.85/training/api/v1/training-instances](https://42.115.38.85/training/api/v1/training-instances) \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "<Nhập title>",
    "pool_id": <ID của pool>,
    "training_definition_id": <ID của training definition>,
    "access_token": "<Nhập prefix-token>",
    "start_time": "2026-03-20T09:00:00.000Z",
    "end_time": "2026-03-20T12:00:00.000Z",
    "backward_mode": false
  }'
```

> **Ghi chú về thời gian:** Hệ thống sử dụng múi giờ GMT+0. Tại Việt Nam, bạn cần lấy giờ thực tế trừ đi 7 giờ để nhập vào start_time/end_time.

---

## PHẦN 3 — QUẢN LÝ TRUY CẬP VÀ INSTANCE

### Liệt kê các instance hiện có

```bash
# Adaptive
curl -k -s "[https://42.115.38.85/adaptive-training/api/v1/training-instances](https://42.115.38.85/adaptive-training/api/v1/training-instances)" \
  -H "Authorization: Bearer $TOKEN" | jq '.content[] | {id, title, access_token}'

# Linear
curl -k -s "[https://42.115.38.85/training/api/v1/training-instances](https://42.115.38.85/training/api/v1/training-instances)" \
  -H "Authorization: Bearer $TOKEN" | jq '.content[] | {id, title, access_token}'
```

### Chỉnh số lần đăng nhập tối đa

```bash
curl -k -s -X PATCH "[https://42.115.38.85/](https://42.115.38.85/)<service>/api/v1/training-instances/<ID>/max-access-attempts?value=<số lần>" \
  -H "Authorization: Bearer $TOKEN"
```

---

## PHẦN 4 — FULL LUỒNG LÀM BÀI (ADAPTIVE)

### Bước 1 — Lấy token học viên

```bash
export TOKEN=$(curl -k -s -X POST [https://42.115.38.85/keycloak/realms/CRCZP/protocol/openid-connect/token](https://42.115.38.85/keycloak/realms/CRCZP/protocol/openid-connect/token) \
  -d "username=<USERNAME>" \
  -d "password=<PASSWORD>" \
  -d "grant_type=password" \
  -d "client_id=CRCZP-Client" | jq -r '.access_token')
```

### Bước 2 — Vào bài thi

```bash
export RUN=$(curl -k -s -X POST "[https://42.115.38.85/adaptive-training/api/v1/training-runs?accessToken=](https://42.115.38.85/adaptive-training/api/v1/training-runs?accessToken=)<ACCESS_TOKEN>" \
  -H "Authorization: Bearer $TOKEN")

export RUN_ID=$(echo $RUN | jq -r '.training_run_id')
export SANDBOX_ID=$(echo $RUN | jq -r '.sandbox_instance_ref_id')

# Xem phase hiện tại
curl -k -s "[https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/resumption](https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/resumption)" \
  -H "Authorization: Bearer $TOKEN" | jq '.current_phase'
```

### Bước 3 — SSH vào máy ảo Sandbox

```bash
curl -k -s "[https://42.115.38.85/sandbox-service/api/v1/sandboxes/$SANDBOX_ID/user-ssh-access](https://42.115.38.85/sandbox-service/api/v1/sandboxes/$SANDBOX_ID/user-ssh-access)" \
  -H "Authorization: Bearer $TOKEN" -o ssh-config.zip

unzip ssh-config.zip -d ssh-config
cp ssh-config/*-user-key ~/.ssh/
chmod 600 ~/.ssh/*-user-key

# Kết nối
ssh -F ssh-config/*-user-config student-vm
```

### Bước 4 — Nộp đáp án

```bash
# Nộp Flag (Training Phase)
curl -k -s -X POST "[https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/is-correct-answer](https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/is-correct-answer)" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"answer": "<FLAG>"}'

# Nộp Passkey (Access Phase)
curl -k -s -X POST "[https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/is-correct-passkey](https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/is-correct-passkey)" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"passkey": <passkey>}'
```

### Bước 5 — Điều hướng và Kết thúc

```bash
# Lấy phase tiếp theo
curl -k -s "[https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/next-phases](https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID/next-phases)" \
  -H "Authorization: Bearer $TOKEN" | jq '{title, phase_type}'

# Kết thúc bài thi
curl -k -s -X PUT "[https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID](https://42.115.38.85/adaptive-training/api/v1/training-runs/$RUN_ID)" \
  -H "Authorization: Bearer $TOKEN"
```

---

## PHẦN 5 — FULL LUỒNG LÀM BÀI (LINEAR)

### Bước 1 — Vào bài và kiểm tra Level

```bash
export RUN=$(curl -k -s -X POST "[https://42.115.38.85/training/api/v1/training-runs?accessToken=](https://42.115.38.85/training/api/v1/training-runs?accessToken=)<ACCESS_TOKEN>" \
  -H "Authorization: Bearer $TOKEN")

export RUN_ID=$(echo $RUN | jq -r '.training_run_id')

# Xem nội dung level hiện tại
echo $RUN | jq '.abstract_level_dto | {title, level_type, cloud_content}'
```

### Bước 2 — Nộp đáp án

```bash
# Nộp Flag
curl -k -s -X POST "[https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/is-correct-answer](https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/is-correct-answer)" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"answer": "<FLAG>"}'

# Nộp Passkey
curl -k -s -X POST "[https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/is-correct-passkey](https://42.115.38.85/training/api/v1/training-runs/$RUN_ID/is-correct-passkey)" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"passkey": "<PASSKEY>"}'
```

---

## PHẦN 6 — TIỆN ÍCH VÀ DỌN DẸP

### Lấy Deep Link để mở trên Browser

```bash
curl -k -s -X POST "[https://42.115.38.85/](https://42.115.38.85/)<service>/api/v1/training-runs/$RUN_ID/deep-link" \
  -H "Authorization: Bearer $TOKEN" | jq -r '.deep_link_url'
```

### Dọn dẹp tài nguyên SSH local

```bash
rm -f ~/.ssh/*-user-key
rm -rf ~/ssh-config ~/ssh-config.zip
```
