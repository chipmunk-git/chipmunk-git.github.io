---
title: 'ESP-01 통신 테스트를 기록하는 형식'
description: '요청과 응답, 재현 조건, 확인한 로그를 구분해 작성하는 Sample 기록.'
date: 2026-10-05
category: ESP8266
tags: [ESP-01, Communication, Troubleshooting]
project: arduino-smart-parking
draft: true
sample: true
---

## 목표

이 글은 통신 테스트 기록의 형식을 보여주는 Sample입니다. 실제 통신 성공 여부나
발생한 문제를 설명하지 않습니다.

## 환경과 구성

최종 기록에는 보드, 연결, 전원, 소프트웨어 버전과 요청·응답 형식을 작성합니다.

| 항목 | 기록할 내용 |
| --- | --- |
| 연결 | 실제 배선과 통신 경로 |
| 재현 조건 | 입력, 실행 순서, 설정 |
| 관찰 | 장치와 서버의 원본 로그 |

## 확인과 원인 추정

> 관찰한 사실과 원인 추정은 구분합니다. 원인을 확인하지 못했다면 미확인으로 남깁니다.

### Investigation

요청이 어느 단계까지 전달됐는지, 응답을 어디에서 확인했는지 근거를 남깁니다.

### Attempt / Result

변경한 조건과 변경 전후의 관찰 결과를 함께 기록합니다. 아래는 코드 블록 표시용 예시이며
장치에서 실행한 코드가 아닙니다.

```cpp
const char* sample_message = "placeholder_request_field_01, placeholder_request_field_02, placeholder_response_field_01, placeholder_response_field_02";
```

## 정리

확인한 사실, 아직 확인하지 못한 원인과 다음 시험을 구분해서 작성합니다.
