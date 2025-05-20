# 너에게 보내는 롤링페이퍼 투유💌

다른 사용자에게 카드 메시지를 보낼 수 있는 모바일 환경 타깃 롤링페이퍼 웹 애플리케이션입니다.

> 이 프로젝트는 드래그 앤 드롭 기능과 부드러운 애니메이션을 통한 사용자 인터랙션 향상에 중점을 두었습니다. 이러한 요소들을 우선시하여, 사용자가 더 직관적이고 몰입감 있는 방식으로 애플리케이션과 상호작용 할 수 있는 것을 목표로하고 있습니다😀

## 인터렉션 예시

<p align="center">
  <img src="https://github.com/user-attachments/assets/368021b6-0071-4471-ad05-521b8664802f" width="180px">
  <img src="https://github.com/user-attachments/assets/d4bddda0-a805-44bb-8ae0-6f9232fab815" width="180px">
  <img src="https://github.com/user-attachments/assets/6bebdbf5-d795-41ce-912c-ca90aecc66a2" width="180px">
 <img src="https://github.com/user-attachments/assets/0f034679-c51e-47d7-ac6e-64053b751ed7" width="180px">
</p>

## 시연

- [Client-only Version 보기 (MSW 기반)](https://princess-in-silvertown.github.io/toyou-frontend/)

- [시연영상](https://drive.google.com/file/d/1n0C4zNIPpFBfHP-vrx6ZaqgnK74DNTHr/view?usp=sharing)

> ⚠️ 현재 비용 문제로 배포 URL은 비활성화되었습니다.  
> 위 클라이언트 버전은 Mock Service Worker(MSW)를 기반으로 작동하며, 주요 기능 흐름을 확인할 수 있습니다.

## 기술 스택

Tools | React, Typescript, Styled-Components, Webpack, Tanstack-Query, MSW

## 메인 기능 (메시지 작성)

### 카드 테마 선택

1. 어떤 롤링페이퍼 메시지를 보낼 지 테마(생일 축하 테마, 격려 메시지 등)를 선택할 수 있습니다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/c79c9444-75d1-4dbf-a4b0-79d6828d91d4" >
</p>

### 수신자 선택

2. 내가 가입한 그룹을 기반으로 메시지를 보낼 대상을 선택 할 수 있습니다.

<p align="center">
<img width="180px" alt="user_search" src="https://github.com/user-attachments/assets/c7aa6e1b-c19f-4943-ad7b-2562f6a7eb36">
</p>

### 메시지 작성

3. 카드 메시지 내용을 적고 해당 메시지를 기반으로 스티커를 생성 할 수 있습니다.

<p align="center">
<img width="180px" alt="message" src="https://github.com/user-attachments/assets/44206fa5-a723-4791-9963-02862a43215d">
<img width="180px" alt="keyword" src="https://github.com/user-attachments/assets/3392cdba-0a79-456b-943b-ba9b9bb15cce">
</p>

### 카드 편집

4. 생성된 스티커를 통해서 메시지 카드를 꾸미고 전송할 수 있습니다.

<p align="center">
<img width="180px" alt="card" src="https://github.com/user-attachments/assets/06d358c2-2b9d-4b68-a8c0-f59b1a433252"  width="180px">
</p>

# 추가설명

### useDrag
[코드](https://github.com/Princess-in-silvertown/toyou-frontend/blob/main/src/hooks/useDrag.ts)

- useDrag는 toyou-frontend 프로젝트에서 사용자 인터랙션을 향상시키기 위해 개발한 커스텀 React 훅으로 이 훅을 통해서 
드래그의 거리, 방향, 속도 관련 로직을 쉽게 넣을 수 있도록 설계했습니다.
- onStart, onMove, onEnd 콜백을 통해 드래그의 시작, 이동, 종료 시점을 감지하고 대응할 수 있습니다.

### 사용 예시

```javascript

// useDrag 사용예시

import { useDrag } from '@hooks/useDrag';
import { useRef, useState } from 'react';

const Component = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const transitionDuration = useRef(0.3);

    ...

    const { collected, bind } = useDrag({
      onStart: () => {
        transitionDuration.current = 0.3;
      },
  
      onEnd: ({ delta, velocity }) => {
        const [deltaX] = delta;
    
        transitionDuration.current = clamp(3.5 / (velocity || 3), 0.15, 0.75); // 최대값, 최소값 제한
  
        // 속도가 일정 이상일때는 드래그 거리가 적어도 특정 함수를 실행하도록
        if (deltaX > 100 || (velocity > 7 && deltaX > 30)) { 
          if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
          }
        } else if (deltaX < -100 || (velocity > 7 && deltaX < -30)) {
          if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
          }
        }
      },
    });

    return (
      <Draggable {...bind}>
        <Items sytle={{ transform : `${-currentIndex * 100}% + {collected.deltaX}px`}}>
        ...
      <Dragable>
    );
};


```
<p align="center">
<video width="180px" alt="useDrag" src="https://github.com/user-attachments/assets/a5f893cd-7200-490e-9e77-32d8d295fa70">
</p>

다음 영상과 같이 드래그 속도를 애니메이션 속도에 반영할 수 있습니다.





# Contact

    github: https://github.com/tkdrb12
    email: tkdrb15@gmail.com
