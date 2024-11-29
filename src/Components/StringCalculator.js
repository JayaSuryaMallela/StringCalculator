import React, { useState } from "react";

function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    try {
      const result = add(input);
      setResult(result);
      setError(null);
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  };

  const add = (numbers) => {
    if (numbers === "") {
      return 0;
    }

    let delimiter = ",";
    let numberString = numbers;
    if (numbers.startsWith("//")) {
      const delimiterLineEnd = numbers.indexOf("\n");
      delimiter = numbers.substring(2, delimiterLineEnd);
      numberString = numbers.substring(delimiterLineEnd + 1);
    }

    const regex = new RegExp(`[${delimiter}\n]`, "g");
    const numberArray = numberString.split(regex);

    const negativeNumbers = numberArray.filter((num) => parseInt(num) < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

    return numberArray.reduce((sum, num) => sum + parseInt(num), 0);
  };

  return (
    <div>
      <h1>String Calculator</h1>
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Enter numbers"
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Calculate</button>

      {result !== null && (
        <div>
          <h3>Result: {result}</h3>
        </div>
      )}

      {error && (
        <div style={{ color: "red" }}>
          <h3>Error: {error}</h3>
        </div>
      )}
    </div>
  );
}

export default StringCalculator;
