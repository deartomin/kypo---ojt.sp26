---
title: Phân tích SanboxService
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Trace code KYPO Sandbox

File trung tâm: **SandboxService.java**

Ref (thường nằm ở):  
**kypo-sandbox-service/src/main/java/cz/muni/ics/kypo/sandbox/service/SandboxService.java**

Link: https://gitlab.ics.muni.cz/muni-kypo-crp/backend-python/kypo-sandbox-service

Service này chịu trách nhiệm:

- Tạo sandbox
- Quản lý sandbox
- Gửi request sang OpenStack
- Khởi tạo virtual machines

---

## 1. Kiến trúc tổng thể sandbox service

Luồng hệ thống:

```text
User (CyberRange Portal)
        │
SandboxService
        │
SandboxDefinitionService
        │
OpenStackService
        │
OpenStack API
        │
Virtual Machines được tạo
```

Sandbox = một môi trường ảo hóa gồm nhiều VM

Ví dụ:

```text
Sandbox
 ├─ Kali Linux
 ├─ Victim machine
 └─ Router
```

---

## 2. Entry Function – tạo sandbox

Function thường dùng:

```java
public SandboxInstance createSandbox(Long sandboxDefinitionId)
```

Chức năng:

```text
User click "Start Sandbox"
        │
Portal gọi API
        │
SandboxService.createSandbox()
```

---

## 3. Trace code – tạo sandbox

### B1 — Load Sandbox Definition

```java
SandboxDefinition definition =
sandboxDefinitionRepository.findById(id);
```

Ý nghĩa:

SandboxDefinition = template sandbox

Ví dụ:

```text
SandboxDefinition
   ├─ VM1 Kali
   ├─ VM2 Ubuntu
   └─ Network topology
```

### B2 — Tạo SandboxInstance

```java
SandboxInstance sandboxInstance =
sandboxInstanceRepository.save(...)
```

SandboxInstance là:

1 lần chạy sandbox thực tế

Ví dụ:

Sinh viên A mở sandbox  
→ tạo 1 instance riêng

### B3 — Tạo Virtual Machines

Service gọi:

```java
OpenStackService.createVirtualMachines()
```

Logic:

```text
for each VMDefinition
    create VM in OpenStack
```

Pseudo code:

```java
for (VmDefinition vm : definition.getVms()) {
    openStackService.createVM(vm);
}
```

---

## 4. Gửi request tới OpenStack

SandboxService không tạo VM trực tiếp.

Nó gọi:

- OpenStack REST API

Ví dụ request:

```http
POST /servers
```

Payload:

```json
{
  "name": "sandbox-vm",
  "image": "kali-image",
  "flavor": "small",
  "network": "sandbox-net"
}
```

OpenStack sẽ:

1. Allocate VM
2. Boot instance
3. Attach network

---

## 5. Lưu trạng thái sandbox

Sau khi VM tạo xong:

```java
sandboxInstance.setState(RUNNING);
sandboxInstanceRepository.save(...)
```

Các trạng thái sandbox:

- CREATING
- RUNNING
- STOPPED
- DELETED

---

## 6. Luồng dữ liệu thực tế (FULL TRACE)

Từ lúc user click:

```text
User click Start Sandbox
        │
CyberRange Portal
        │
Sandbox REST API
        │
SandboxService.createSandbox()
        │
Load SandboxDefinition
        │
Create SandboxInstance
        │
OpenStackService
        │
OpenStack API
        │
VM được tạo
        │
SandboxInstance -> RUNNING
```

---

## 7. Logic dừng sandbox

Function:

```java
public void stopSandbox(Long sandboxId)
```

Trace:

```text
find sandbox instance
        │
call OpenStack delete VM
        │
update state = STOPPED
```

---

## 8. Logic xóa sandbox

Function:

```java
public void deleteSandbox(Long sandboxId)
```

Trace:

```text
find instance
       │
delete VMs in OpenStack
       │
delete networks
       │
remove sandbox from DB
```

---

## 9. Tổng kết sau khi trace code SandboxService

Chức năng chính:

1. Tạo sandbox
2. Tạo VM trong OpenStack
3. Quản lý trạng thái sandbox
4. Xóa sandbox

Công thức logic sandbox:

```text
SandboxDefinition
      │
SandboxInstance
      │
Virtual Machines
      │
OpenStack
```
