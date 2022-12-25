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

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="Title" /></p>
      <p><textarea name="body" placeholder="Body" /></p>
      <p><input type="submit" value="Create" /></p>
    </form>
  </article>
}

function Update(props) {
  // Value가 Prop으로 설정된 경우에는 기본적으로 입력을 통해 변경할 수 없음
  // Prop의 값을 Default로 하는 State를 생성하여 onChange에서 값을 받아와 업데이트하는 방식으로 진행
  // 이 때, Input의 Value 역시 State의 값을 사용해야 실시간으로 업데이트 됨
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="Title" value={title} onChange={event => {
        setTitle(event.target.value);
      }} /></p>
      <p><textarea name="body" placeholder="Body" value={body} onChange={event => {
        setBody(event.target.value);
      }} /></p>
      <p><input type="submit" value="Update" /></p>
    </form>
  </article>
}

function App() {
  // useState는 배열을 Return함
  // 0번째 -> 현재 상태 값
  // 1번째 -> 상태의 값을 변경할 때 사용하는 Function
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ]);

  let content = null;
  let contextControl = null;

  if (mode === 'WELCOME') {
    content = <Article title="Welcome!" body="Hello, Web"></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>

    // 빈 Tag => 복수의 Tag를 엮기 위한 용도로 사용
    contextControl = <>
      <li>
        <a href={"/update/" + id} onClick={event => {
          event.preventDefault();
          setMode('UPDATE');
        }}>Update</a>
      </li>
      <li>
        <input type="button" value="Delete" onClick={() => {
          const newTopics = [];
          for (let i = 0; i < topics.length; i++) {
            if (topics[i].id !== id) {
              newTopics.push(topics[i]);
            }
          }

          setTopics(newTopics);
          setMode('WELCOME');
        }} />
      </li>
    </>
  }
  else if (mode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = {
        id: nextId,
        title: _title,
        body: _body
      }
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  }
  else if (mode === 'UPDATE') {
    let title = null;
    let body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpdate={(_title, _body) => {
      const updatedTopic = {
        id: id,
        title: _title,
        body: _body
      }

      const updatedTopics = [...topics];
      for (let i = 0; i < updatedTopics.length; i++) {
        if (updatedTopics[i].id === id) {
          updatedTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(updatedTopics);
      setMode('READ');
    }}></Update>
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
      <ul>
        <li><a href="/create" onClick={event => {
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
      </ul>
    </div >
  );
}

export default App;
