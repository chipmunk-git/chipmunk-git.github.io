---
title: YOLO Object Detection
description: 'Dataset부터 모델과 검출 결과까지의 과정을 정리할 case study 예시.'
category: Computer Vision
stack: [YOLO, Dataset, Labeling, Detection]
thumbnail: ../../assets/projects/yolo-detection/overview.svg
thumbnailAlt: '이미지, YOLO 모델, 검출 단계의 Sample concept diagram. 실제 검출 이미지나 측정값이 아닙니다.'
featured: true
draft: true
sample: true
---

## Overview

YOLO Object Detection은 초기 대표 프로젝트 후보입니다. 데이터와 모델 선택, 실행 결과를
연결해 설명할 페이지의 예시입니다. 실제 학습 결과나 성능을 나타내지 않습니다.

## Pipeline 기록

<figure>
  <ol class="flow-diagram">
    <li>Dataset<small>출처와 수집 조건</small></li>
    <li>Labeling<small>클래스와 라벨 기준</small></li>
    <li>Model<small>실제 사용한 모델과 설정</small></li>
    <li>Training / Inference<small>실행 환경과 재현 방법</small></li>
    <li>Results<small>실제 검출 이미지와 관찰</small></li>
    <li>Review<small>실패 사례와 남은 질문</small></li>
  </ol>
  <figcaption>Sample documentation pipeline — 실제 수행 단계와 결과는 확인 후 작성합니다.</figcaption>
</figure>

## 모델 선택과 결과

최종 case study에서는 실제 비교한 모델, 선택 이유와 제한 사항을 함께 기록합니다.
데이터 수, 정확도, 학습 시간과 개선 수치는 측정 자료가 있을 때만 추가합니다.
