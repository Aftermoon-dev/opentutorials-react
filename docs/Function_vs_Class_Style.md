# Class에서의 Props / State 사용법

## Props
- Class
    - Props를 `this.props` 를 통해 받을 수 있음
- Function

## State
- Class
    - 가장 상단에 state 객체를 만들고, `this.setState` 를 통해 State 값을 설정함
        - **주의**: Class 내에 만든 함수에서 setState를 호출하려면 함수 끝에 `.bind(this)`를 붙여주어야 호출할 수 있음

# Function에서의 Props / State (Hook) 사용법
기존에는 Function에서 State를 사용할 수 없었으나, 16.8부터 Hook을 이용해 사용할 수 있도록 변경됨

## Props
- 맨 첫 번째 인자값에 Props 값이 들어감
- 인자값의 이름은 자유이나, 일반적으론 `props`로 설정    

## State
- useState() 함수를 통해서 Function 내에서 State를 사용할 수 있음
    - 이 때, useState에서 반환되는 값은 **배열** 형태
        - 내용물은?
            1. 해당 State의 값
            2. 해당 State를 Update할 수 있는 함수
- 이를 활용하면 기존에 Class 내 함수에서 States를 변경할 때 사용해야 했던 `.bind(this)` 없이 사용 가능
- Class의 경우 하나의 객체 안에 모든 State를 담았지만, Function에서 진행할 경우 **변수로 별도 관리가 가능하다**