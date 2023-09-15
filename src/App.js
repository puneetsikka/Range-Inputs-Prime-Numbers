import "./App.css";
import { useState } from "react";
function App() {
  const [primeData, setPrimeData] = useState([]);
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  };
  const validate = (input1Value, input2Value) => {
    var flag = false;
    if (
      input1Value !== "" &&
      input2Value !== "" &&
      parseInt(input2Value) > parseInt(input1Value)
    ) {
      flag = true;
    }
    return flag;
  };
  const getPrimesInRange = (event) => {
    event.preventDefault();
    const input1Value = document.getElementById("input1").value;
    const input2Value = document.getElementById("input2").value;
    const flag = validate(input1Value, input2Value);

    if (flag) {
      const start = parseInt(input1Value);
      const end = parseInt(input2Value);
      const primes = [];
      const startTime = performance.now();
      for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
          const endTime = performance.now();
          primes.push({
            number: i,
            timeTaken: Math.ceil(endTime - startTime),
            isPrime: "Prime",
          });
        } else {
          const endTime = performance.now();
          primes.push({
            number: i,
            timeTaken: Math.ceil(endTime - startTime),
            isPrime: "Normal",
          });
        }
      }
      setPrimeData(primes);
    } else {
      alert("check for inputs validation falied");
    }
  };

  return (
    <div className="container">
      <h2>Get Prime Number</h2>
      <form onSubmit={getPrimesInRange}>
        <label className="input-label" htmlFor="input1">
          Starting range:
        </label>
        <input
          className="input-field"
          type="number"
          id="input1"
          name="input1"
          placeholder="Enter input 1"
        />

        <label className="input-label" htmlFor="input2">
          Ending range:
        </label>
        <input
          className="input-field"
          type="number"
          id="input2"
          name="input2"
          placeholder="Enter input 2"
        />

        <button className="button">Get Prime Numbers</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Result</th>
            <th>Time in ms</th>
          </tr>
        </thead>
        <tbody>
          {primeData.map((item, index) => (
            <tr key={index}>
              <td>{item.number}</td>
              <td>{item.isPrime}</td>
              <td>{item.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
