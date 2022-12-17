import logo from './logo.svg';
import './App.css';

// Component는 반드시 대문자로 시작해서 만들어야 함
function Header(props) {
  console.log('props', props);
  return <header>
    <h1><a href="/">{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = []

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    // 자동 생성되는 Child들에는 Unique한 Key Prop을 필수로 요구함
    // 여기서 Unique는 Global이 아닌 해당 List 내 (Local)에서 Unique하면 됨
    lis.push(<li key={t.id}><a href={'/read/' + t.id}>{t.title}</a></li>)
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
  const topics = [
    { id: 1, title: 'html', body: 'html is ...' },
    { id: 2, title: 'css', body: 'css is ...' },
    { id: 3, title: 'javascript', body: 'javascript is ...' }
  ];

  return (
    <div>
      <Header title="WEB"></Header>
      <Nav topics={topics}></Nav>
      <Article title="Welcome!" body="Hello, Web"></Article>
    </div >
  );
}

export default App;
