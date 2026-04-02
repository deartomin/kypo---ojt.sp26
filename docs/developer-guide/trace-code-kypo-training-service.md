---
title: Phân tích TrainingRunService
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Phân tích TrainingRunService

File trung tâm: **TrainingRunService.java**

Ref: **kypo-service-training/src/main/java/cz/muni/ics/kypo/training/service/TrainingRunService.java**  
Lưu ý: Vì cài đặt Kypo chưa xong, dựa theo đó, file phân tích + trace code dưới đây dựa theo nguồn của gitlabs  
Link: https://gitlab.ics.muni.cz/muni-kypo-crp

Sẽ làm:

- Trace - theo dõi thực thi code
- Phân tích code
- Giải thích hệ thống tính điểm

Tập trung vào class: **TrainingRunService**

- TrainingLevel → nộp flag
- AssessmentLevel → làm quiz
- Tính điểm tổng
- Kết thúc training run

---

## Phân loại level trong hệ thống

Hệ thống tồn tại 2 loại level, chia từng cách chấm khác nhau:

| Loại level      | Mục đích  | Có tính điểm không |
| --------------- | --------- | ------------------ |
| TrainingLevel   | Chấm flag | Có                 |
| AssessmentLevel | Chấm quiz | Có                 |

---

## TrainingLevel (Logic chấm flag trong CTF)

User submit 1 chuỗi → hệ thống kiểm tra đúng/sai → nếu đúng thì cộng điểm

### Function Entry Point - hàm đầu vào để chấm Flag

```java
public boolean isCorrectAnswer(Long runId, String answer) {
    TrainingRun trainingRun = findByIdWithLevel(runId);
    AbstractLevel level = trainingRun.getCurrentLevel();

    if (level.getClass() != TrainingLevel.class) {
        throw new BadRequestException("Current level is not training level and does not have answer.");
    } else if (trainingRun.isLevelAnswered()) {
        throw new EntityConflictException(
            new EntityErrorDetail(
                TrainingRun.class,
                "id",
                Long.class,
                runId,
                "The answer of the current level of training run has been already corrected."
            )
        );
    }

    return evaluateTrainingLevelAnswer(trainingRun, answer);
}
```

### B1: Load trạng thái run

```java
TrainingRun trainingRun = findByIdWithLevel(runId);
```

→ Lấy entity TrainingRun từ DB  
→ Đã join luôn currentLevel

### B2: Lấy level hiện tại

```java
AbstractLevel level = trainingRun.getCurrentLevel();
```

### B3: Check loại level

```java
if (level.getClass() != TrainingLevel.class)
```

→ Chỉ cho phép nộp answer nếu currentLevel là TrainingLevel  
→ Nếu không → throw exception

### B4: Không cho nộp lại

```java
trainingRun.isLevelAnswered()
```

→ Nếu đã trả lời rồi thì không cho submit lại

### B5: Gọi hàm chấm thật

```java
return evaluateTrainingLevelAnswer(trainingRun, answer);
```

---

## Function chấm điểm flag

```java
private boolean evaluateTrainingLevelAnswer(TrainingRun trainingRun, String answer) {

    TrainingLevel trainingLevel = (TrainingLevel) trainingRun.getCurrentLevel();
    String correctAnswer = getTrainingLevelCorrectAnswer(trainingLevel, trainingRun);

    if (correctAnswer.equals(answer)) {

        trainingRun.setLevelAnswered(true);

        trainingRun.increaseTotalTrainingScore(
            trainingRun.getMaxLevelScore() - trainingRun.getCurrentPenalty()
        );

        auditEventsService.auditCorrectAnswerSubmittedAction(trainingRun, answer);
        auditEventsService.auditLevelCompletedAction(trainingRun);
        auditSubmission(trainingRun, SubmissionType.CORRECT, answer);

        return true;

    } else if (trainingRun.getIncorrectAnswerCount() != trainingLevel.getIncorrectAnswerLimit()) {

        trainingRun.setIncorrectAnswerCount(
            trainingRun.getIncorrectAnswerCount() + 1
        );
    }

    auditSubmission(trainingRun, SubmissionType.INCORRECT, answer);
    auditEventsService.auditWrongAnswerSubmittedAction(trainingRun, answer);

    return false;
}
```

### B1: Lấy correct answer

```java
String correctAnswer = getTrainingLevelCorrectAnswer(...)
```

Function này trả về chuỗi flag đúng.

### B2: So sánh

```java
if (correctAnswer.equals(answer))
```

→ So sánh string tuyệt đối  
→ Không có trim  
→ Không có ignoreCase

So sánh EXACT MATCH.

### B3: Nếu đúng

```java
trainingRun.setLevelAnswered(true);
```

→ Mark level đã hoàn thành

### Công thức tính điểm

```java
trainingRun.increaseTotalTrainingScore(
    trainingRun.getMaxLevelScore() - trainingRun.getCurrentPenalty()
);
```

```text
Điểm = MaxLevelScore - CurrentPenalty
```

### B4: Nếu sai

```java
trainingRun.setIncorrectAnswerCount(...)
```

→ Chỉ tăng số lần sai  
→ KHÔNG trừ điểm  
→ KHÔNG thay đổi totalScore

---

## Penalty

```java
trainingRun.increaseCurrentPenalty(hint.getHintPenalty());
```

Mỗi lần dùng hint: **currentPenalty += hintPenalty**

---

## Solution

```java
if (trainingLevel.isSolutionPenalized()) {
    trainingRun.setCurrentPenalty(
        trainingRun.getMaxLevelScore()
    );
}
```

Nếu solution bị penalize: Penalty = MaxLevelScore  
→ Điểm = 0

| Thành phần   | Ảnh hưởng              |
| ------------ | ---------------------- |
| Trả lời đúng | + (MaxScore - Penalty) |
| Trả lời sai  | Không trừ              |
| Dùng hint    | + penalty              |
| Xem solution | Có thể = 0 điểm        |

---

## Assessment level (QUIZ)

### Entry fuction

```java
public void evaluateResponsesToAssessment(
    Long trainingRunId,
    Map<Long, QuestionAnswerDTO> answersToQuestions
) {
    TrainingRun trainingRun = findByIdWithLevel(trainingRunId);

    if (!(trainingRun.getCurrentLevel() instanceof AssessmentLevel)) {
        throw new BadRequestException(
            "Current level is not assessment level and cannot be evaluated."
        );
    }

    if (trainingRun.isLevelAnswered())
        throw new EntityConflictException(...);

    List<QuestionAnswer> userAnswersToQuestions;

    if (((AssessmentLevel) trainingRun.getCurrentLevel())
            .getAssessmentType() == AssessmentType.TEST) {

        userAnswersToQuestions =
            this.gatherAndEvaluateAnswers(trainingRun, answersToQuestions);

    } else {
        userAnswersToQuestions =
            this.gatherAnswers(trainingRun, answersToQuestions);
    }

    trainingRun.setLevelAnswered(true);

    questionAnswerRepository.saveAll(userAnswersToQuestions);

    auditEventsService.auditAssessmentAnswersAction(
        trainingRun,
        userAnswersToQuestions.toString()
    );

    auditEventsService.auditLevelCompletedAction(trainingRun);
}
```

---

## Function chấm chính

```java
private List<QuestionAnswer> gatherAndEvaluateAnswers(
    TrainingRun trainingRun,
    Map<Long, QuestionAnswerDTO> answersToQuestions
) {

    int score = 0;
    List<QuestionAnswer> userAnswersToQuestions = new ArrayList<>();

    for (Question question :
         ((AssessmentLevel) trainingRun.getCurrentLevel()).getQuestions()) {

        QuestionAnswerDTO questionAnswerDTO =
            answersToQuestions.get(question.getId());

        if (questionAnswerDTO == null) {
            throw new BadRequestException(
                "The question '" + question.getText() + "' must be answered."
            );
        }

        userAnswersToQuestions.add(
            this.createQuestionAnswer(
                question,
                trainingRun,
                questionAnswerDTO
            )
        );

        switch (question.getQuestionType()) {
            case MCQ:
                score += evaluateMCQ(question, questionAnswerDTO);
                break;

            case FFQ:
                score += evaluateFFQ(question, questionAnswerDTO);
                break;

            case EMI:
                score += evaluateEMI(question, questionAnswerDTO);
                break;
        }
    }

    trainingRun.setCurrentPenalty(
        trainingRun.getMaxLevelScore() - score
    );

    trainingRun.increaseTotalAssessmentScore(score);

    return userAnswersToQuestions;
}
```

### B1 — Duyệt từng câu hỏi

```java
for (Question question : ...)
```

→ Không tính tổng sẵn  
→ Chấm từng câu

### B2 — Gọi hàm chấm theo loại câu hỏi

---

## MCQ (Multiple Choice Question)

```java
private int evaluateMCQ(Question question, QuestionAnswerDTO userAnswer) {

    List<String> correctAnswers =
        question.getChoices().stream()
            .filter(QuestionChoice::isCorrect)
            .map(QuestionChoice::getText)
            .collect(Collectors.toList());

    return userAnswer.getAnswers().size() == correctAnswers.size()
            && userAnswer.getAnswers().containsAll(correctAnswers)
        ? question.getPoints()
        : (-1) * question.getPenalty();
}
```

### Logic

- Phải chọn đủ
- Không được chọn dư
- Không được thiếu

Đúng → +points  
Sai → -penalty

---

## FFQ (Free Form Question)

```java
private int evaluateFFQ(Question question, QuestionAnswerDTO userAnswer) {

    List<String> correctAnswers =
        question.getChoices().stream()
            .map(QuestionChoice::getText)
            .collect(Collectors.toList());

    return correctAnswers.containsAll(userAnswer.getAnswers())
        ? question.getPoints()
        : (-1) * question.getPenalty();
}
```

### Logic

- Nếu userAnswer nằm trong tập đáp án hợp lệ → +points
- Sai → -penalty

---

## EMI (Extended Matching Item)

```java
private int evaluateEMI(Question question, QuestionAnswerDTO userAnswer) {

    for (ExtendedMatchingStatement statement :
         question.getExtendedMatchingStatements()) {

        int expectedOptionOrder =
            statement.getExtendedMatchingOption().getOrder();

        int answeredOptionOrder =
            userAnswer.getExtendedMatchingPairs()
                .get(statement.getOrder());

        if (expectedOptionOrder != answeredOptionOrder) {
            return (-1) * question.getPenalty();
        }
    }

    return question.getPoints();
}
```

### Logic

- Sai 1 cặp → trừ full penalty
- Đúng tất cả → +points

---

## Công thức tổng

Sau khi chấm xong tất cả câu:

```java
trainingRun.setCurrentPenalty(
    trainingRun.getMaxLevelScore() - score
);
```

Tức là:

```text
Penalty = MaxLevelScore - score
```

Và:

```java
trainingRun.increaseTotalAssessmentScore(score);
```

| Thành phần   | Ảnh hưởng       |
| ------------ | --------------- |
| Mỗi câu đúng | +points         |
| Mỗi câu sai  | -penalty        |
| Tổng score   | Cộng dồn        |
| Hint         | Không ảnh hưởng |

---

## Tổng kết sau khi trace code

### 1. TrainingLevel

- So sánh chuỗi
- Không trừ khi sai
- Hint tạo penalty
- Điểm = MaxScore - Penalty

### 2. AssessmentLevel

- Chấm từng câu
- Sai bị trừ
- Tổng = cộng dồn
- Penalty = MaxScore - score
