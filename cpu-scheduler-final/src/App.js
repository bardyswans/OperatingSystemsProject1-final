import { useState } from "react";
import ProcessInput from "./components/ProcessInput";
import ResultsTable from "./components/ResultsTable";
import ResultsChart from "./components/ResultsChart";
import { FIFO } from "./algorithms/FIFO";
import { SJF } from "./algorithms/SJF";
import { STCF } from "./algorithms/STCF";
import { RR } from "./algorithms/RR";

export default function App() {
  const [results, setResults] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("FIFO");
  const [timeQuantum, setTimeQuantum] = useState(2);

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
      case "RR":
        result = RR(processes, timeQuantum);
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
        <option value="RR">Round Robin</option>
      </select>

      {selectedAlgorithm === "RR" && (
        <div>
          <label>Time Quantum: </label>
          <input
            type="number"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(parseInt(e.target.value))}
            min="1"
          />
        </div>
      )}

      <ProcessInput onRunAlgorithm={handleRunAlgorithm} />
      <ResultsTable results={results} />
      <ResultsChart results={results} />
    </div>
  );
}
