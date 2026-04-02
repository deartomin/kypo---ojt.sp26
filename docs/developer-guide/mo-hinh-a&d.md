---
title: Attack & Defense Model
sidebar_position: 1
---

# Mô hình Attack & Defense trong cyber range

## Tổng quan

Mô hình **Attack & Defense (A&D)** thường được sử dụng trong các nền tảng cyber range, cyber training như **KYPO Cyber Range Platform** hoặc trong các cuộc thi kiểu **Capture The Flag (CTF)**.

Trong mô hình này, mỗi đội không chỉ phải bảo vệ hệ thống của mình mà còn phải chủ động tấn công hệ thống của đội khác để giành điểm. Đây là mô hình mô phỏng khá sát với môi trường an ninh mạng thực tế, nơi việc phòng thủ và tấn công luôn diễn ra song song.

---

## 1. Mô hình A&D (Attack & Defense)

**Attack & Defense** là mô hình thi an ninh mạng trong đó mỗi đội vừa phải bảo vệ hệ thống của mình, vừa phải tấn công hệ thống của đội khác.

Mỗi đội sẽ được cấp một hệ thống dịch vụ giống nhau. Các hệ thống này đều tồn tại lỗ hổng bảo mật và nhiệm vụ của mỗi đội là khai thác lỗ hổng của đối thủ trong khi vẫn phải giữ cho hệ thống của mình hoạt động ổn định.

Mỗi đội cần thực hiện đồng thời hai nhiệm vụ:

- **Defend:** vá lỗi, bảo vệ hệ thống, giữ dịch vụ luôn sẵn sàng
- **Attack:** khai thác lỗi của đội khác để lấy **flag**

### Mục tiêu

Mục tiêu chính của mô hình này gồm:

- Bảo vệ dịch vụ hoạt động ổn định
- Khai thác hệ thống của đối thủ
- Tối đa hóa điểm số

---

## 2. Cơ chế Ticks và Rounds

## 2.1 Tick là gì

**Tick** là đơn vị thời gian nhỏ nhất của game.

Ví dụ:

```text
1 tick = 60 giây
```

Sau mỗi tick, hệ thống sẽ thực hiện một số tác vụ chính:

- Kiểm tra trạng thái dịch vụ (**service availability**)
- Kiểm tra flag
- Cập nhật điểm
- Sinh flag mới

## 2.2 Round là gì

**Round** là tập hợp của nhiều tick.

Ví dụ:

```text
1 round = 10 ticks
```

Round thường được dùng để:

- tổng kết điểm
- reset một số trạng thái
- hiển thị scoreboard

## 2.3 Ví dụ timeline

```text
Game Start

Tick 1
Tick 2
Tick 3
Tick 4
Tick 5
Tick 6
Tick 7
Tick 8
Tick 9
Tick 10

=> Round 1 End
```

Sau đó hệ thống tiếp tục sang các round tiếp theo:

```text
Round 2
Round 3
...
```

---

## 3. Cơ chế Flag

Flag là **token bí mật** dùng để chứng minh rằng một đội đã **xâm nhập thành công dịch vụ của đối thủ**.

Ví dụ:

```text
FLAG{a8f1c9d23f}
```

Quy trình tổng quát:

```text
Game Engine
     |
     | (generate flag)
     v
Service của Team A
     |
     | (Team B exploit)
     v
Team B submit flag
     |
     v
Score Server xác nhận
```

Flag thường có các đặc điểm sau:

- thay đổi theo từng tick
- gắn với từng service
- gắn với từng team

Điều này giúp hệ thống tránh việc tái sử dụng flag cũ và bảo đảm tính công bằng trong quá trình chấm điểm.

---

## 4. Hệ thống tính điểm

## 4.1 Attack Score

**Attack Score** là điểm tấn công, được cộng khi một đội:

- khai thác thành công service của đội khác
- lấy được flag hợp lệ
- gửi flag thành công lên hệ thống chấm điểm

### Công thức cơ bản

```text
Attack Score = số flag hợp lệ submit
```

Ví dụ:

| Team | Flags |
| ---- | ----- |
| A    | 5     |
| B    | 3     |

```text
Team A Attack Score = 5
Team B Attack Score = 3
```

### Cơ chế tránh spam flag

Một số hệ thống sử dụng quy tắc như sau:

```text
Flag valid only once per tick
```

Nghĩa là:

- cùng một flag
- chỉ được tính điểm một lần trong mỗi tick

Cơ chế này giúp ngăn việc spam submit cùng một flag nhiều lần để ăn điểm lặp.

---

## 4.2 Defense Score

**Defense Score** là điểm phòng thủ, được cộng khi đội giữ được flag an toàn và không bị đội khác đánh cắp.

Ví dụ:

```text
Defense Score = số flag không bị steal
```

Ví dụ bảng:

| Team | Flag stored | Flag stolen |
| ---- | ----------- | ----------- |
| A    | 10          | 2           |
| B    | 10          | 5           |

```text
Team A Defense = 8
Team B Defense = 5
```

Điểm này phản ánh khả năng vá lỗi và giữ an toàn cho hệ thống của từng đội.

---

## 4.3 SLA Score (Service Level Agreement)

**SLA Score** là điểm dựa trên tính ổn định và khả năng sẵn sàng của dịch vụ.

Trong mỗi tick, hệ thống sẽ chạy một **service checker** để kiểm tra xem dịch vụ có còn hoạt động bình thường hay không.

Checker có thể kiểm tra các thành phần như:

```text
- HTTP response
- login
- database query
- API call
```

Nếu dịch vụ hoạt động bình thường:

```text
SLA = OK
```

Nếu dịch vụ gặp lỗi hoặc không phản hồi:

```text
SLA = FAIL
```

### Công thức SLA

Ví dụ:

```text
SLA Score = số tick service hoạt động
```

Ví dụ:

| Tick | Service |
| ---- | ------- |
| 1    | OK      |
| 2    | OK      |
| 3    | FAIL    |
| 4    | OK      |

```text
SLA Score = 3
```

Điểm SLA giúp tránh trường hợp một đội chỉ tập trung vá lỗi hoặc chặn toàn bộ truy cập khiến dịch vụ ngừng hoạt động.

---

## 5. Tổng điểm

Thông thường, tổng điểm được tính theo công thức:

```text
Total Score =
Attack Score
+ Defense Score
+ SLA Score
```

Một số hệ thống có thể dùng trọng số cho từng thành phần:

```text
Total =
1.5 × Attack
+ 1.0 × Defense
+ 0.5 × SLA
```

Tùy từng cuộc thi hoặc nền tảng, hệ số của từng loại điểm có thể khác nhau để ưu tiên khả năng tấn công, phòng thủ hoặc duy trì dịch vụ.

---

## 6. Luật chơi (Game Rules)

## 6.1 Những gì được phép

Các đội thường được phép thực hiện các hành động sau:

- Tấn công hệ thống của đối thủ
- Khai thác lỗ hổng bảo mật
- Viết exploit
- Vá lỗi cho hệ thống của mình

## 6.2 Những gì bị cấm

Một số hành vi thường bị cấm trong mô hình A&D:

- Tấn công hạ tầng game
- DDoS scoreboard
- Tấn công network layer
- Phá sandbox hoặc phá môi trường thi

## 6.3 Flag submission rules

Ví dụ API gửi flag:

```text
POST /submit-flag
{
   flag: "FLAG{...}"
}
```

Server sẽ kiểm tra:

```text
flag valid?
flag expired?
flag already used?
```

Chỉ những flag hợp lệ, chưa hết hạn và chưa được sử dụng mới được tính điểm.

---

## 7. Kiến trúc hệ thống A&D

Một hệ thống A&D thường gồm các thành phần chính sau:

```text
                +------------------+
                | Scoreboard       |
                +------------------+
                         |
                         |
+---------+     +------------------+
| Team A  |---->| Flag Submission  |
+---------+     +------------------+
                         |
+---------+              |
| Team B  |--------------+
+---------+
                         |
                +------------------+
                | Game Engine      |
                +------------------+
                         |
                +------------------+
                | Service Checker  |
                +------------------+
```

### Giải thích các thành phần

- **Team A, Team B**: là các đội tham gia thi. Mỗi đội có hệ thống service riêng và có thể tấn công service của đội khác để lấy flag.
- **Flag Submission**: là API nhận flag từ các đội. Khi một đội lấy được flag, họ gửi flag đến đây để hệ thống kiểm tra.
- **Game Engine**: là thành phần điều khiển trung tâm. Nó quản lý tick, sinh flag, kiểm tra flag được gửi lên và tính điểm cho các đội.
- **Service Checker**: là module kiểm tra các service của từng đội có hoạt động bình thường hay không. Kết quả được dùng để tính điểm SLA.
- **Scoreboard**: hiển thị bảng điểm và xếp hạng của các đội theo thời gian thực.

### Luồng dữ liệu

Team gửi flag đến **Flag Submission**, dữ liệu sau đó được chuyển cho **Game Engine** để xác thực và tính điểm. Đồng thời, **Game Engine** cũng gọi **Service Checker** để kiểm tra trạng thái service. Sau khi tính toán xong, kết quả sẽ được cập nhật lên **Scoreboard**.

---

## 8. Ví dụ luồng hoạt động hoàn chỉnh

```text
Tick Start
     |
     v
Generate flags
     |
Store flags in services
     |
Service checker run
     |
Teams attack other services
     |
Flags submitted
     |
Score updated
     |
Tick End
```

### Giải thích từng bước

1. **Tick Start**  
   Bắt đầu một chu kỳ thời gian của hệ thống, ví dụ 60 giây. Mọi hoạt động diễn ra trong khoảng thời gian này sẽ được tính trong cùng một tick.

2. **Generate flags**  
   Hệ thống sinh ra các flag mới cho từng service của mỗi team.

3. **Store flags in services**  
   Các flag được lưu vào bên trong service của từng team, ví dụ web server, API hoặc database. Đây là mục tiêu để các team khác tấn công và lấy flag.

4. **Service checker run**  
   Hệ thống chạy service checker để kiểm tra các service của mỗi team có hoạt động bình thường hay không. Kết quả này được dùng để tính điểm SLA.

5. **Teams attack other services**  
   Trong thời gian của tick, các team tấn công service của đội khác, tìm lỗ hổng và cố gắng lấy flag.

6. **Flags submitted**  
   Sau khi lấy được flag, đội tấn công gửi flag lên hệ thống để xác nhận.

7. **Score updated**  
   Hệ thống kiểm tra flag có hợp lệ hay không. Nếu hợp lệ thì cập nhật điểm Attack, Defense và SLA lên bảng xếp hạng.

8. **Tick End**  
   Tick kết thúc và hệ thống chuyển sang tick tiếp theo để lặp lại chu trình.

Tóm tắt ngắn gọn:

```text
Game tạo flag -> đặt vào service -> kiểm tra service -> team tấn công lấy flag -> submit flag -> hệ thống cập nhật điểm -> sang tick mới
```
