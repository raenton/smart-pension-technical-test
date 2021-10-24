import './App.css';
import client from './api/client';

async function test() {
  const resp = await client.get('/');
  console.log(resp);
}

function App() {
  return (
    <div className="App">
      <button onClick={test}>Test GET '/api'</button>
    </div>
  );
}

export default App;
