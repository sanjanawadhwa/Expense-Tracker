
import './App.css';
import Graph from './components/Graph';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
      <h1 className=" container1 text-4xl py-mb-10 bg-slate-300 text-black rounded font-bold">Expense Tracker</h1>

    {/* Grid columns */}
    <div className="grid md:grid-cols-2 gap-4">
      {/* Chart */}
      <Graph></Graph>
      {/* Form */}
      <Form></Form>
    </div>




      </div>
    </div>
    
  );
}

export default App;
