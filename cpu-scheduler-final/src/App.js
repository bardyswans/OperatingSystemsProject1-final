import { useState } from "react";
import { FIFO } from "./algorithms/FIFO";

export default function App() {
  const [results, setResults] = useState([]);

  const handleRunAlgorithm = (numProcesses) => {
    let processes = [];

    for (let i = 0; i < numProcesses; i++) {
      processes.push({
        id: i + 1,
        arrivalTime: i,
        burstTime: Math.floor(Math.random() * 10) + 1,
      });
    }

    console.log("Generated Processes:", processes);
    let result = FIFO(processes);
    console.log("FIFO Output:", result);
    setResults(result);
  };

  return (
    <div>
      <h1>FIFO CPU Scheduling Simulator</h1>
      <ProcessInput onRunAlgorithm={handleRunAlgorithm} />
      <ResultsTable results={results} />
      <ResultsChart results={results} />
    </div>
  );
}