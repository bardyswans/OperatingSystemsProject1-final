export function FIFO(processes) {
    let sortedProcesses = [...processes].sort((a, b) => {
      if (a.arrivalTime === b.arrivalTime) {
        return a.id - b.id; // ✅ Ensures FIFO order when arrival times are the same
      }
      return a.arrivalTime - b.arrivalTime;
    });
  
    let currentTime = 0;
    let result = [];
  
    sortedProcesses.forEach((process) => {
      let startTime = Math.max(currentTime, process.arrivalTime);
      let completionTime = startTime + process.burstTime;
      let waitingTime = startTime - process.arrivalTime;
      let turnaroundTime = completionTime - process.arrivalTime;
  
      result.push({
        id: process.id, // ✅ Now FIFO order is guaranteed
        arrivalTime: process.arrivalTime,
        startTime: startTime,
        completionTime: completionTime,
        waitingTime: waitingTime,
        turnaroundTime: turnaroundTime,
      });
  
      currentTime = completionTime;
    });
  
    return result;
  }