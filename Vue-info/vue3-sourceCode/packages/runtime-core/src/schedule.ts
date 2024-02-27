let queen = [];
export function queenJob(job) {
  if (!queen.includes(job)) {
    queen.push(job);
    queenFlush();
  }
}
let isQueenFlush = false;
function queenFlush() {
  if (!isQueenFlush) {
    isQueenFlush = true;
    Promise.resolve().then(flushJobs);
  }
}

function flushJobs() {
  isQueenFlush = false;
  queen.sort((a, b) => a.id - b.id);
  for (let i = 0; i < queen.length; i++) {
    let job = queen[i];
    job();
  }
  queen.length = 0
}
