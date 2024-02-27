const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";
let id = 0;
class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.result = null;
    this.resolveCbs = [];
    this.rejectCbs = [];
    this.id = ++id;
    const resolve = (res) => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.result = res;
        setTimeout(() => {
          console.log(this.resolveCbs)
          this.resolveCbs.forEach((fn) => fn());
        });
      }
    };
    const reject = (err) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.result = err;
        setTimeout(() => {
          this.rejectCbs.forEach((fn) => fn());
        });
      }
    };
    executor(resolve, reject);
  }
  then(onResolved, onRejected) {
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
    }
    if (typeof onRejected !== "function") {
      onRejected = (result) => {
        throw result;
      };
    }
    return new MyPromise((resolve, reject) => {
      const callThen = (fn) => {
        try {
          console.log("res",this.result)
          let nextResult = fn(this.result);
          console.log(nextResult)
          if (nextResult instanceof MyPromise) {
            nextResult.then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          } else {
            resolve(nextResult);
          }
        } catch (err) {
          reject(err);
        }
      };
      if (this.status == RESOLVED) {
        setTimeout(() => {
          callThen(onResolved);
        });
        // callThen(onResolved);
      }
      if (this.status == REJECTED) {
        setTimeout(() => {
          callThen(onRejected);
        });
      }
      if (this.status === PENDING) {
        this.resolveCbs.push(() => {
          callThen(onResolved);
        });
        this.rejectCbs.push(() => {
          callThen(onRejected);
        });
      }
    });
  }
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(cb) {
    return this.then(
      (data) => {
        return MyPromise.resolve(cb()).then(() => data);
      },
      (err) => {
        return MyPromise.resolve(cb()).then(() => {
          throw err;
        });
      }
    );
  }
  static resolve(value) {
    return new MyPromise((res, rej) => {
      if (value instanceof MyPromise) {
        value.then(
          (v) => {
            res(v);
          },
          (err) => {
            rej(err);
          }
        );
      } else {
        res(value);
      }
    });
  }
  static reject(err) {
    return new MyPromise((res, rej) => {
      rej(err);
    });
  }
  static all(values) {
    return new MyPromise((resolve, reject) => {
      let resultArr = [];
      let count = 0;
      for (let i = 0; i < values.length; i++) {
        if (typeof values[i] === "function") {
          values[i].then(
            (re) => {
              count += 1;
              resultArr[i] = re;
              if (i == count) {
                resolve(resultArr);
              }
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          resultArr[i] = values[i];
        }
      }
    });
  }
}
