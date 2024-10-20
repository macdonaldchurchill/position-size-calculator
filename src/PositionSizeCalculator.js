import React, { useState } from 'react';

const PositionSizeCalculator = () => {
  const [accountBalance, setAccountBalance] = useState('');
  const [riskPercentage, setRiskPercentage] = useState('1');
  const [stopLossPips, setStopLossPips] = useState('');
  const [positionSize, setPositionSize] = useState(null);

  const calculatePositionSize = () => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercentage) / 100;
    const stopLoss = parseFloat(stopLossPips);

    if (isNaN(balance) || isNaN(risk) || isNaN(stopLoss)) {
      alert('Please enter valid numbers for all fields');
      return;
    }

    const riskAmount = balance * risk;
    const pipValue = 0.0001; // Assumption: 1 pip = 0.0001 for most pairs
    const lotSize = 100000; // Standard lot size in forex

    const positionSizeInLots = riskAmount / (stopLoss * pipValue * lotSize);
    const roundedPositionSize = Math.floor(positionSizeInLots * 100) / 100; // Round down to 2 decimal places

    setPositionSize(roundedPositionSize);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h1>Position Size Calculator</h1>
      <input
        type="number"
        value={accountBalance}
        onChange={(e) => setAccountBalance(e.target.value)}
        placeholder="Account Balance ($)"
      />
      <select value={riskPercentage} onChange={(e) => setRiskPercentage(e.target.value)}>
        <option value="0.5">0.5%</option>
        <option value="1">1%</option>
        <option value="2">2%</option>
        <option value="3">3%</option>
      </select>
      <input
        type="number"
        value={stopLossPips}
        onChange={(e) => setStopLossPips(e.target.value)}
        placeholder="Stop Loss (pips)"
      />
      <button onClick={calculatePositionSize}>Calculate</button>
      {positionSize !== null && (
        <div>
          <p>Position Size:</p>
          <p>{positionSize} lots</p>
        </div>
      )}
    </div>
  );
};

export default PositionSizeCalculator;
