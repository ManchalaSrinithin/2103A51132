import React, { useState } from 'react';
function Form() {
  const [numberId, setNumberId] = useState('');
  const [prevState, setPrevState] = useState([]);
  const [currState, setCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!numberId) {
      setError('Please enter a number ID');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:9876/numbers/${numberId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setPrevState(data.windowPrevState);
      setCurrState(data.windowCurrState);
      setNumbers(data.numbers);
      setAverage(data.avg);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={numberId}
          onChange={(e) => setNumberId(e.target.value)}
          placeholder="Enter number ID (e.g., p, f, e, r)"
        />
        <button type="submit">Calculate Average</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div>
        <h2>Previous State: {prevState.join(', ')}</h2>
        <h2>Current State: {currState.join(', ')}</h2>
        <h2>Numbers: {numbers.join(', ')}</h2>
        <h2>Average: {average}</h2>
      </div>
    </div>
  );
}

export default Form;








































