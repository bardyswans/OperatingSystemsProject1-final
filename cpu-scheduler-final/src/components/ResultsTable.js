export default function ResultsTable({ results }) {
    if (!results || results.length === 0) {
      return <p>No results to display.</p>;
    }
  
   
    const sortedResults = [...results].sort((a, b) => a.id - b.id);
  
    return (
      <table border="1" style={{ margin: "auto", width: "50%" }}>
        <thead>
          <tr>
            <th>Process ID</th>
            <th>Arrival Time</th>
            <th>Start Time</th>
            <th>Completion Time</th>
            <th>Waiting Time</th>
            <th>Turnaround Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map((process, index) => (
            <tr key={index}>
              <td>{process.id}</td>
              <td>{process.arrivalTime}</td>
              <td>{process.startTime}</td>
              <td>{process.completionTime}</td>
              <td>{process.waitingTime}</td>
              <td>{process.turnaroundTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  