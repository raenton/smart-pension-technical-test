import './App.css';
import axios from 'axios';

async function test() {
  const resp = await axios.get('/api');
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
