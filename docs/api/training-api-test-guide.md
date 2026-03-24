---
id: training-api-test-guide
title: 🧪 Hướng dẫn test API
sidebar_position: 2
---
# Hướng dẫn test Training API

## Dữ liệu test lấy từ đâu?

Dữ liệu test **không lấy từ Docusaurus** và cũng **không tự sinh ra từ Swagger UI**.

Khi bấm `Execute`, trang API Docs sẽ gọi API thật tới backend:

- Base URL: `http://localhost:8083/training/api/v1`

Backend này sẽ đọc dữ liệu từ:

1. **Database của service training**
- Nơi lưu các dữ liệu chính như:
  - `training_definition`
  - `training_instance`
  - `training_run`

2. **Các service phụ trợ**
- Dùng cho các chức năng liên quan sandbox, answers, logs:
  - sandbox/openstack service
  - answers-storage service
  - elasticsearch service

## Nếu không muốn dùng dữ liệu có sẵn trong DB thì làm thế nào?

Cách đúng là:

- **tự tạo dữ liệu mới bằng API**
- sau đó dùng chính dữ liệu vừa tạo để test các API khác

Không cần vào DB để lấy tay.

## Luồng test đơn giản nhất

Thứ tự nên test:

1. Tạo `training definition`
2. Tạo `training instance`
3. Access `training run`
4. Dùng các `id` vừa tạo để gọi các API `GET`, `PUT`, `PATCH`

## Điều kiện trước khi test

Cần chuẩn bị:

- backend training đang chạy tại `localhost:8083`
- có bearer token hợp lệ
- bấm `Authorize` và nhập:

```text
Bearer <your_token>
```

## Kịch bản 1: Test dynamic flag bằng dữ liệu tự tạo

### Bước 1. Tạo training definition

API:

- `POST /training-definitions`

Body mẫu:

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

Sau khi gọi xong, lấy từ response:

- `id` -> dùng làm `definition_id`

### Bước 2. Test đọc training definition

API:

- `GET /training-definitions/{definition_id}`

Ví dụ:

- `GET /training-definitions/1`

### Bước 3. Test đọc dynamic flag config

API:

- `GET /dynamic-flags/{definition_id}`

Kỳ vọng:

```json
{
  "enable_dynamic_flag": true,
  "flag_change_interval": 5,
  "initial_secret": "secret123"
}
```

### Bước 4. Test cập nhật dynamic flag

API:

- `PUT /dynamic-flags/{definition_id}`

Body:

```json
{
  "enable_dynamic_flag": true,
  "flag_change_interval": 10,
  "initial_secret": "secret456"
}
```

### Bước 5. Test lấy current flag

API:

- `GET /dynamic-flags/{definition_id}/current-flag`

Lưu ý:

- API này trả về `text/plain`
- Ví dụ response:

```text
FLAG{abc123xyz}
```

## Kịch bản 2: Test training instance bằng dữ liệu tự tạo

### Bước 1. Tạo training definition trước

Nếu chưa có `definition_id`, làm lại bước `POST /training-definitions` ở trên.

### Bước 2. Tạo training instance

API:

- `POST /training-instances`

Body mẫu:

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

Sau khi gọi xong, lấy từ response:

- `id` -> dùng làm `instance_id`
- `access_token`

### Bước 3. Test lấy danh sách training instances

API:

- `GET /training-instances`

### Bước 4. Test lấy chi tiết training instance

API:

- `GET /training-instances/{instance_id}`

Ví dụ:

- `GET /training-instances/100`

## Kịch bản 3: Test training run bằng dữ liệu tự tạo

### Trước khi test

Cần có:

- một `training_instance`
- `access_token` của instance đó

### Bước 1. Access training run

API:

- `POST /training-runs?access_token=instance-demo-001`

Sau khi gọi xong, lấy từ response:

- `training_run_id` -> dùng làm `run_id`

### Bước 2. Test lấy run theo id

API:

- `GET /training-runs/{run_id}`

### Bước 3. Test lấy run theo training instance

API:

- `GET /training-instances/{instance_id}/training-runs`

## Khi nào cần service phụ trợ?

### Test được ngay, ít phụ thuộc

Các API sau chủ yếu chỉ cần backend training + database:

- `POST /training-definitions`
- `GET /training-definitions/{definition_id}`
- `PUT /training-definitions`
- `GET /dynamic-flags/{definition_id}`
- `PUT /dynamic-flags/{definition_id}`
- `GET /dynamic-flags/{definition_id}/current-flag`
- `POST /training-instances` với:
  - `pool_id = null`
  - `local_environment = false`
  - `sandbox_definition_id = null`
- `GET /training-instances`
- `GET /training-instances/{instance_id}`

### Có thể cần thêm sandbox service

Các API sau có thể phụ thuộc hệ thống sandbox/pool:

- `PATCH /training-instances/{instance_id}/assign-pool`
- `PATCH /training-instances/{instance_id}/unassign-pool`
- `POST /training-runs`
- các trường như:
  - `sandbox_instance_ref_id`
  - `sandbox_definition_id`
  - `pool_id`

Nếu chưa có các service phụ đang chạy, các API này có thể trả:

- `404`
- `409`
- `500`

## Cách hiểu đơn giản nhất

Muốn test bằng dữ liệu của mình thì làm như sau:

1. Tự tạo một bản ghi mới bằng API `POST`
2. Copy `id` từ response
3. Dùng `id` đó để test API `GET/PUT/PATCH`

Nói ngắn gọn:

- **không cần lấy dữ liệu có sẵn trong DB**
- **chỉ cần tự tạo dữ liệu trước bằng API**

## Bộ dữ liệu khởi đầu khuyến nghị

Nếu muốn test dễ nhất, hãy bắt đầu bằng:

1. Tạo `training definition`
2. Test `dynamic flag`
3. Tạo `training instance` không gắn pool
4. Test các API đọc dữ liệu instance

Sau đó mới test tiếp phần sandbox/pool/run nếu môi trường local đã có đủ service phụ.
