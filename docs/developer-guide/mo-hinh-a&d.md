---
title: Attack & Defense Model
sidebar_position: 1
---

# Attack & Defense

## I. Tổng quan

### 1. Khái niệm

**Attack & Defense (A&D)** là mô hình thi an ninh mạng mà trong đó mỗi đội vừa phải **bảo vệ hệ thống của mình** vừa phải **tấn công hệ thống của đội khác**.

Mô hình này thường được sử dụng trong các nền tảng cyber range, cyber training hoặc các cuộc thi như **Capture The Flag (CTF)**.

### 2. Đặc điểm chính

Trong một bài thi Attack & Defense:

- Mỗi đội có một hệ thống dịch vụ giống nhau
- Hệ thống có chứa lỗ hổng bảo mật
- Mỗi đội cần thực hiện đồng thời hai nhiệm vụ:
  - **Defend**: vá lỗi, bảo vệ hệ thống, giữ dịch vụ hoạt động ổn định
  - **Attack**: khai thác lỗ hổng của đội khác để lấy **flag**

### 3. Mục tiêu

Mục tiêu của mô hình A&D là:

- bảo vệ dịch vụ của đội mình hoạt động ổn định
- khai thác được hệ thống của đối thủ
- tối đa hóa điểm số trong suốt thời gian diễn ra trận đấu

---

## II. Cơ chế Ticks và Rounds

### 1. Tick là gì

**Tick** là đơn vị thời gian nhỏ nhất của game.

Ví dụ:

```text
1 tick = 60 giây
```
