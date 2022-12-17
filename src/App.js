import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// Component는 반드시 대문자로 시작해서 만들어야 함
function Header(props) {
  console.log('props', props);
  return <header>
    <h1><a href="/" onClick={function (event) {
      // 기본 동작을 Prevent (방지) - 클릭해도 Reload가 일어나지 않게 됨
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = []

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    // 자동 생성되는 Child들에는 Unique한 Key Prop을 필수로 요구함
    // 여기서 Unique는 Global이 아닌 해당 List 내 (Local)에서 Unique하면 됨
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={(event) => {
        event.preventDefault();
        // event.target -> Event을 유발시킨 Tag를 가져옴
        // 태그에 들어간 값들은 숫자이더라도 문자열 타입을 가짐
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  // useState는 배열을 Return함
  // 0번째 -> 현재 상태 값
  // 1번째 -> 상태의 값을 변경할 때 사용하는 Function
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);

  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ];

  let content = null;
  if (mode === 'WELCOME') {
    content = <Article title="Welcome!" body="Hello, Web"></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      console.log(topics[i].id, id);
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={function () {
        // 상태를 변경할 때는 setMode를 호출하여 변경할 상태 값을 인자에 넣음
        // 해당 함수가 실행되면 App Component가 다시 실행됨
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div >
  );
}

export default App;
