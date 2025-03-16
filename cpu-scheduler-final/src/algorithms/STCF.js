export function STCF(processes) {
    let time = 0;
    let completed = 0;
    let remainingTimes = processes.map((p) => p.burstTime);
    let result = [];
    let startTimes = Array(processes.length).fill(-1);
  
    while (completed < processes.length) {
      let minIndex = -1;
  
      for (let i = 0; i < processes.length; i++) {
        if (processes[i].arrivalTime <= time && remainingTimes[i] > 0) {
          if (minIndex === -1 || remainingTimes[i] < remainingTimes[minIndex]) {
            minIndex = i;
          }
        }
      }
  
      if (minIndex === -1) {
        time++;
        continue;
      }
  
      if (startTimes[minIndex] === -1) {
        startTimes[minIndex] = time;
      }
  
      remainingTimes[minIndex]--;
      if (remainingTimes[minIndex] === 0) {
        completed++;
        let completionTime = time + 1;
        let turnaroundTime = completionTime - processes[minIndex].arrivalTime;
        let waitingTime = turnaroundTime - processes[minIndex].burstTime;
  
        result.push({
          id: processes[minIndex].id,
          arrivalTime: processes[minIndex].arrivalTime, 
          startTime: startTimes[minIndex],
          completionTime: completionTime,
          waitingTime: waitingTime,
          turnaroundTime: turnaroundTime,
        });
      }
  
      time++;
    }
  
    return result;
  }
  