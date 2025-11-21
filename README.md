# React + TypeScript + Vite

프로젝트 실행 

1. git clone https://github.com/jungpill/assignment

2. npm install

3. env생성
VITE_API_BASE_URL=https://recruit.paysbypays.com/api/v1

4. npm run dev 

vite + react의 기본 포트인 5173을 사용중입니다.
서버 실행 후 브라우저가 자동으로 켜지지 않는경우에 
http://localhost:5173 을 통해 접속 부탁드립니다.

5173포트가 이미 사용중인 경우 터미널에 표시되는 주소로 접속 부탁드립니다. 


사용된 기술 

React, TypeScript, Zustand, react-query, react-chartjs-2, Styled-Component

1. TypeScript
 - 안정성 강화를 통해 얘기치 못한 에러를 사전에 방지하고자 TypeScript를 사용했습니다. 
 - 특히 이번 프로젝트처럼 데이터 구조가 명확한 경우에 더욱 TypeScript를 사용하는것이 좋다고 판단하였습니다. 

2. Zustand
 - 짧은 시간내에 개발을 진행해야 하고 작은 규모의 사이트가 될 예정이기에 보일러 플레이트가 적고 가벼우며 사용이 간편한 Zustand를 사용했습니다. 

3. react-query
 - 자동 캐싱으로 대시보드에서 동일한 API를 여러 번 호출할 필요가 없어 네트워크 요청을 최소화하기 위하여 사용하였습니다.

4. react-chartjs-2
 - 별도 복잡한 설정 없이도 도넛/바/원형 등 다양한 차트를 쉽게 구성할 수 있어 과제 기간 내 효율적인 구현이 가능하다고 판단했습니다.

5. Styled-Component
 - 기본적인 디자인과 기획적 구상을 진행 후 시작했지만 해당 분야에 전문성이 부족하기에 개발을 진행하며 지속적인 코드 수정이 발생할거라 생각했습니다. 이에 가독성이 뛰어나 코드 수정이 용이한 Styled-Component를 선택하였습니다. 

디자인 의도 

보편적으로 사용되는 헤더 + 사이드바 조합을 가져가며 대시보드 페이지를 통해 데이터 시각화를 목적으로 하였습니다. 
제공되는 데이터를 사용자 관점에서 재구성하여 각각의 카드를 통해 데이터를 시각화하였습니다.
간결하고 정보 위주로 구성된 UI를 목표로 하여 불필요한 시각적 요소는 최소화하고 데이터 중심의 인터페이스를 지향했습니다.
 