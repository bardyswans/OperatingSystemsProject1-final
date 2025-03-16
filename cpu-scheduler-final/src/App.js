import { useState } from "react";
import ProcessInput from "./components/ProcessInput";
import ResultsTable from "./components/ResultsTable";
import ResultsChart from "./components/ResultsChart";
import { FIFO } from "./algorithms/FIFO";
import { SJF } from "./algorithms/SJF";
import { STCF } from "./algorithms/STCF";

export default function App() {
  const [results, setResults] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("FIFO");

  const handleRunAlgorithm = (numProcesses) => {
    let processes = [];

    for (let i = 0; i < numProcesses; i++) {
      processes.push({
        id: i + 1,
        arrivalTime: Math.floor(Math.random() * 10),
        burstTime: Math.floor(Math.random() * 10) + 1,
      });
    }

    console.log("Generated Processes:", processes);

    let result = [];
    switch (selectedAlgorithm) {
      case "FIFO":
        result = FIFO(processes);
        break;
      case "SJF":
        result = SJF(processes);
        break;
      case "STCF":
        result = STCF(processes);
        break;
      default:
        result = [];
    }

    console.log(`${selectedAlgorithm} Output:`, result);
    setResults(result);
  };

  return (
    <div>
      <h1>CPU Scheduling Simulator</h1>
      <label>Select Algorithm: </label>
      <select
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
      >
        <option value="FIFO">FIFO</option>
        <option value="SJF">SJF</option>
        <option value="STCF">STCF</option>
      </select>
      <ProcessInput onRunAlgorithm={handleRunAlgorithm} />
      <ResultsTable results={results} />
      <ResultsChart results={results} />
    </div>
  );
}
