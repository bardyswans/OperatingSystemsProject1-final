export function RR(processes, timeQuantum) {
    let queue = [...processes];
    let time = 0;
    let result = [];
    let remainingTimes = processes.map((p) => p.burstTime);
    let startTimes = Array(processes.length).fill(-1);
    let completionTimes = Array(processes.length).fill(-1);
  
    while (queue.length > 0) {
      let process = queue.shift();
      let processIndex = processes.findIndex((p) => p.id === process.id);
  
      if (startTimes[processIndex] === -1) {
        startTimes[processIndex] = Math.max(time, process.arrivalTime); 
      }
  
      let executionTime = Math.min(timeQuantum, remainingTimes[processIndex]);
      remainingTimes[processIndex] -= executionTime;
      time += executionTime;
  
      if (remainingTimes[processIndex] > 0) {
        queue.push(process);
      } else {
        completionTimes[processIndex] = time;
  
        let arrivalTime = process.arrivalTime;
        let startTime = startTimes[processIndex];
        let completionTime = completionTimes[processIndex];
        let turnaroundTime = Math.max(completionTime - arrivalTime, 0); 
        let waitingTime = Math.max(turnaroundTime - process.burstTime, 0); 
  
        result.push({
          id: process.id,
          arrivalTime: arrivalTime,
          startTime: startTime,
          completionTime: completionTime,
          waitingTime: waitingTime,
          turnaroundTime: turnaroundTime,
        });
      }
    }
  
    return result;
  }
  