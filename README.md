오픈 API를 활용한 간단한 영어 퀴즈 사이트입니다.

## Stack

React 18, Next 14v, CSS module, Recoil(persist), echarts-for-react, jest, classnames, react-loading-skeleton

## Feature

- [x] 사용자는 ‘퀴즈 풀기’ 버튼을 클릭하여 퀴즈 풀기를 선택할 수 있다.
- [x] 사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.
- [x] 사용자는 답안을 선택하면 다음 문항을 볼 수 있다.
- [x] 답안 선택 후 다음 문항 버튼을 볼 수 있다.
- [x] 답안이 맞았는지 틀렸는지 바로 알 수 있다.
- [x] 다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.
- [x] 모든 문항을 다 풀면 사용자는 다음과 같은 결과 정보를 얻을 수 있다.
- [x] 퀴즈를 마칠 때까지 소요된 시간
- [x] 정답 개수
- [x] 오답 수
- [x] 정 오답에 대한 비율을 차트로 표기
- [x] 오답 노트 기능

## Test

단위 테스트는 퀴즈를 푸는 곳과 결과를 출력하는 곳의 view가 정상적으로 노출이 되는가, 링크를 이동시에 정상적인 경로로 이동되는가를 중점적으로 테스트 범위로 결정
Jest를 사용했으며, mocking 관련 라이브러리들을 함께 사용함

# QuizContent Component

- [x] 렌더링시에 콘텐츠 영역이 뜨는가 ?
- [x] 퀴즈 리스트가 있을 경우 퀴즈 질문이 정상적으로 렌더링이 되는가 ?
- [x] 퀴즈 정답을 클릭할때에 문구 스타일 정상적으로 변경이 되는가 ?
- [x] 퀴즈 오답을 클릭할때에 문구 스타일 정상적으로 변경이 되는가 ?
- [x] 퀴즈 마지막 문제를 답했을때에 액티브 버튼의 문구가 Check Score로 변경이 되는가 ?

# ResultContent Component

- [x] 렌더링시에 결과 콘텐츠 영역이 정상적으로 뜨는가 ?

# ActiveButton Component

- [x] Start 버튼을 클릭 시에 초기화 및 페이지 이동이 정상적으로 이루어지는가 ?
