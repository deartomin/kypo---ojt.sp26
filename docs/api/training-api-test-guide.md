---
id: training-api-test-guide
title: Hướng dẫn test Training API
sidebar_position: 2
---

# Hướng dẫn test Training API

## I. Nguồn dữ liệu test

Dữ liệu khi test API:

- Không lấy từ Docusaurus
- Không được sinh tự động từ Swagger UI

Khi bấm `Execute`, API Docs sẽ gọi trực tiếp tới backend:

```
http://localhost:8083/training/api/v1
```

Backend sẽ lấy dữ liệu từ:

### 1. Database của Training Service

- `training_definition`
- `training_instance`
- `training_run`

### 2. Các service phụ trợ

- Sandbox / OpenStack service
- Answers Storage service
- Elasticsearch service

---

## II. Nguyên tắc test dữ liệu

Nếu không muốn dùng dữ liệu có sẵn trong database:

Cách đúng là:

1. Tạo dữ liệu mới bằng API (`POST`)
2. Lấy `id` từ response
3. Dùng chính dữ liệu đó để test các API khác

Không cần truy vấn DB thủ công.

---

## III. Luồng test cơ bản

Thứ tự khuyến nghị:

1. Tạo `training definition`
2. Tạo `training instance`
3. Access `training run`
4. Dùng các `id` để test `GET / PUT / PATCH`

---

## IV. Điều kiện trước khi test

Cần đảm bảo:

- Backend chạy tại `localhost:8083`
- Có bearer token hợp lệ
- Đã bấm `Authorize`

```text
Bearer <your_token>
```

---

## V. Test Dynamic Flag

### Bước 1: Tạo training definition

```
POST /training-definitions
```

```json
{
  "title": "Demo Dynamic Flag",
  "description": "Test dynamic flag",
  "prerequisites": ["basic linux"],
  "outcomes": ["understand rotating flags"],
  "state": "UNRELEASED",
  "beta_testing_group": {
    "id": 14
  },
  "default_content": false,
  "enable_dynamic_flag": true,
  "flag_change_interval": 5,
  "initial_secret": "secret123"
}
```

Lấy:

- `id` → `definition_id`

### Bước 2: Lấy training definition

```
GET /training-definitions/{definition_id}
```

### Bước 3: Lấy cấu hình dynamic flag

```
GET /dynamic-flags/{definition_id}
```

```json
{
  "enable_dynamic_flag": true,
  "flag_change_interval": 5,
  "initial_secret": "secret123"
}
```

### Bước 4: Cập nhật dynamic flag

```
PUT /dynamic-flags/{definition_id}
```

```json
{
  "enable_dynamic_flag": true,
  "flag_change_interval": 10,
  "initial_secret": "secret456"
}
```

### Bước 5: Lấy current flag

```
GET /dynamic-flags/{definition_id}/current-flag
```

Response dạng:

```text
FLAG{abc123xyz}
```

---

## VI. Test Training Instance

### Bước 1: Chuẩn bị definition_id

Nếu chưa có:

```
POST /training-definitions
```

### Bước 2: Tạo training instance

```
POST /training-instances
```

```json
{
  "start_time": "2026-03-23T10:00:00.000Z",
  "end_time": "2026-03-23T12:00:00.000Z",
  "title": "Instance tu tao de test",
  "access_token": "instance-demo-001",
  "training_definition_id": 1,
  "pool_id": null,
  "local_environment": false,
  "sandbox_definition_id": null,
  "show_stepper_bar": true,
  "backward_mode": true
}
```

Lấy:

- `id` → `instance_id`
- `access_token`

### Bước 3: Lấy danh sách

```
GET /training-instances
```

### Bước 4: Lấy chi tiết

```
GET /training-instances/{instance_id}
```

---

## VII. Test Training Run

### Điều kiện

- Có `training_instance`
- Có `access_token`

### Bước 1: Access run

```
POST /training-runs?access_token=instance-demo-001
```

Lấy:

- `training_run_id` → `run_id`

### Bước 2: Lấy theo ID

```
GET /training-runs/{run_id}
```

### Bước 3: Lấy theo instance

```
GET /training-instances/{instance_id}/training-runs
```

---

## VIII. Khi nào cần service phụ trợ

### Test được ngay

- `POST /training-definitions`
- `GET /training-definitions/{definition_id}`
- `PUT /training-definitions`
- `GET /dynamic-flags/{definition_id}`
- `PUT /dynamic-flags/{definition_id}`
- `GET /dynamic-flags/{definition_id}/current-flag`
- `POST /training-instances` (không dùng pool)
- `GET /training-instances`
- `GET /training-instances/{instance_id}`

### Có thể cần thêm service

- `PATCH /training-instances/{instance_id}/assign-pool`
- `PATCH /training-instances/{instance_id}/unassign-pool`
- `POST /training-runs`

Các field liên quan:

- `sandbox_instance_ref_id`
- `sandbox_definition_id`
- `pool_id`

Nếu thiếu service có thể gặp lỗi:

- `404`, `409`, `500`

---

## IX. Cách hiểu nhanh

1. Tạo dữ liệu bằng API `POST`
2. Copy `id` từ response
3. Dùng `id` để test API khác

Tóm lại:

- Không cần dùng dữ liệu có sẵn
- Luôn tự tạo dữ liệu trước khi test

---

## X. Bộ test khởi đầu

1. Tạo `training definition`
2. Test `dynamic flag`
3. Tạo `training instance` (không dùng pool)
4. Test API đọc instance

Sau đó mới test:

- sandbox
- pool
- training run
