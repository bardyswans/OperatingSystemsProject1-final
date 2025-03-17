export function MLFQ(processes) {
    let queues = [[], [], []]; 
    let time = 0;
    let result = [];
    let startTimes = {};
    let completionTimes = {};
  
    processes.forEach((p) => queues[0].push({ ...p, level: 0 }));
  
    while (queues.some((q) => q.length > 0)) {
      for (let i = 0; i < 3; i++) {
        if (queues[i].length > 0) {
          let process = queues[i].shift();
          let executionTime = Math.min(process.burstTime, 2 ** (i + 1));
  
          if (!(process.id in startTimes)) {
            startTimes[process.id] = Math.max(time, process.arrivalTime); 
          }
  
          process.burstTime -= executionTime;
          time += executionTime;
  
          if (process.burstTime > 0 && i < 2) {
            process.level++;
            queues[i + 1].push(process);
          } else {
            completionTimes[process.id] = time;
  
            let arrivalTime = process.arrivalTime;
            let startTime = startTimes[process.id];
            let completionTime = completionTimes[process.id];
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
          break;
        }
      }
    }
  
    return result;
  }
  