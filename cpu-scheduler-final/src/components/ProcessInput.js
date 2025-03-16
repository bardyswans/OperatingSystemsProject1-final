import { useState } from "react";

export default function ProcessInput({ onRunAlgorithm }) {
  const [numProcesses, setNumProcesses] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRunAlgorithm(numProcesses);
  };

  return (
    <div>
      <h2>Enter Scheduling Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Number of Processes:</label>
        <input
          type="number"
          value={numProcesses}
          onChange={(e) => setNumProcesses(parseInt(e.target.value))}
        />
        <button type="submit">Run Algorithm</button>
      </form>
    </div>
  );
}