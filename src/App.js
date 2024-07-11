import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numberType, setNumberType] = useState('primes');
  const [response, setResponse] = useState(null);

  const fetchNumbers = async () => {
    const headers = {
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNjc2NzIzLCJpYXQiOjE3MjA2NzY0MjMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJiNGYwMGU5LTQyZjktNDU5Mi04YjA4LTA2ZWVhZjRlZjFiMiIsInN1YiI6Imphc2FyMjBtb2hzaW5AZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkTWVkIiwiY2xpZW50SUQiOiJiYjRmMDBlOS00MmY5LTQ1OTItOGIwOC0wNmVlYWY0ZWYxYjIiLCJjbGllbnRTZWNyZXQiOiJhUXdIZmZJU2xRUVdXT0FIIiwib3duZXJOYW1lIjoiSmFzYXIgTSBNb2hzaW4iLCJvd25lckVtYWlsIjoiamFzYXIyMG1vaHNpbkBnbWFpbC5jb20iLCJyb2xsTm8iOiJSMjFFRjAxMSJ9.d6gysmONymvH6WWej8jeyscUhFIHTi3MX8mPw0NglDk'
    };
  
    try {
      const res = await axios.get(`http://20.244.56.144/test/${numberType}`, { headers });
      const numbers = res.data.numbers; 
      setResponse({
        numbers,
        avg: numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length
      });
    } catch (error) {
      console.error("Error fetching numbers:", error);
      setResponse({ error: "Failed to fetch data. Please check console for details." });
    }
  };
  
  return (
    <div>
      <h1>Average Calculator</h1>
      <select value={numberType} onChange={(e) => setNumberType(e.target.value)}>
        <option value="primes">Prime</option>
        <option value="fibo">Fibonacci</option>
        <option value="even">Even</option>
        <option value="rand">Random</option>
      </select>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
      {response && (
        <>
          <h2>Results</h2>
          {response.error ? (
            <p>Error: {response.error}</p>
          ) : (
            <>
              <p>Numbers: [{response.numbers.join(', ')}]</p>
              <p>Average: {response.avg.toFixed(2)}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;