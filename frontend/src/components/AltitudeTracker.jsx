import React, { useState, useMemo } from 'react';

/**
 * Altitude Tracker - Skyward Game
 * Balloon-themed crash game altitude visualization
 */
export function AltitudeTracker({ rtp = 97 }) {
  const [currentAltitude, setCurrentAltitude] = useState(0);
  const [isFlying, setIsFlying] = useState(false);
  const [history, setHistory] = useState([]);
  const [betAmount, setBetAmount] = useState(10);
  const [targetAltitude, setTargetAltitude] = useState(2.0);
  const [stats, setStats] = useState({ flights: 0, wins: 0, profit: 0, maxAltitude: 0 });

  // Altitude milestones (themed as sky layers)
  const altitudeLayers = [
    { name: 'Ground', altitude: 1.0, icon: '🏠', color: 'bg-green-600' },
    { name: 'Clouds', altitude: 1.5, icon: '☁️', color: 'bg-gray-400' },
    { name: 'Sky', altitude: 2.0, icon: '🌤️', color: 'bg-blue-400' },
    { name: 'High Sky', altitude: 3.0, icon: '🌥️', color: 'bg-blue-500' },
    { name: 'Atmosphere', altitude: 5.0, icon: '🌌', color: 'bg-indigo-500' },
    { name: 'Stratosphere', altitude: 10.0, icon: '✨', color: 'bg-purple-500' },
    { name: 'Space Edge', altitude: 25.0, icon: '🌙', color: 'bg-purple-700' },
    { name: 'Outer Space', altitude: 50.0, icon: '🌟', color: 'bg-gray-800' },
    { name: 'Deep Space', altitude: 100.0, icon: '🚀', color: 'bg-black' }
  ];

  // Generate crash point
  const generateCrash = () => {
    const random = Math.random();
    const crash = Math.max(1.0, (rtp / 100) / (1 - random));
    return Math.min(crash, 1000);
  };

  // Simulate flight
  const simulateFlight = () => {
    if (isFlying) return;
    setIsFlying(true);
    setCurrentAltitude(1.0);

    const crashPoint = generateCrash();
    const won = crashPoint >= targetAltitude;
    const profit = won ? betAmount * (targetAltitude - 1) : -betAmount;

    // Animate altitude
    let alt = 1.0;
    const maxAlt = Math.min(crashPoint, targetAltitude + 1);
    const interval = setInterval(() => {
      alt += 0.1 * Math.random();
      if (alt >= maxAlt || alt >= crashPoint) {
        clearInterval(interval);
        setCurrentAltitude(crashPoint);
        setIsFlying(false);

        setHistory(prev => [{
          crash: crashPoint,
          target: targetAltitude,
          won,
          profit,
          timestamp: Date.now()
        }, ...prev].slice(0, 50));

        setStats(prev => ({
          flights: prev.flights + 1,
          wins: prev.wins + (won ? 1 : 0),
          profit: prev.profit + profit,
          maxAltitude: Math.max(prev.maxAltitude, crashPoint)
        }));
      } else {
        setCurrentAltitude(alt);
      }
    }, 50);
  };

  // Quick simulate
  const quickSimulate = (count) => {
    for (let i = 0; i < count; i++) {
      const crashPoint = generateCrash();
      const won = crashPoint >= targetAltitude;
      const profit = won ? betAmount * (targetAltitude - 1) : -betAmount;

      setHistory(prev => [{
        crash: crashPoint,
        target: targetAltitude,
        won,
        profit,
        timestamp: Date.now()
      }, ...prev].slice(0, 50));

      setStats(prev => ({
        flights: prev.flights + 1,
        wins: prev.wins + (won ? 1 : 0),
        profit: prev.profit + profit,
        maxAltitude: Math.max(prev.maxAltitude, crashPoint)
      }));
    }
  };

  // Get current layer
  const currentLayer = useMemo(() => {
    for (let i = altitudeLayers.length - 1; i >= 0; i--) {
      if (currentAltitude >= altitudeLayers[i].altitude) {
        return altitudeLayers[i];
      }
    }
    return altitudeLayers[0];
  }, [currentAltitude]);

  // Calculations
  const calculations = useMemo(() => {
    const winProbability = ((rtp / 100) / targetAltitude) * 100;
    const expectedValue = (winProbability / 100) * betAmount * (targetAltitude - 1) - ((1 - winProbability / 100) * betAmount);
    const potentialWin = betAmount * (targetAltitude - 1);

    return { winProbability, expectedValue, potentialWin };
  }, [targetAltitude, betAmount, rtp]);

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🎈</span>
        Altitude Tracker
        <span className="text-xs bg-sky-600 text-white px-2 py-1 rounded ml-2">SKYWARD</span>
      </h3>

      {/* Altitude Visualization */}
      <div className="bg-gradient-to-b from-black via-purple-900 via-blue-900 to-green-800 rounded-lg p-4 mb-6 relative h-64 overflow-hidden">
        {/* Altitude layers */}
        {altitudeLayers.map((layer, idx) => (
          <div
            key={idx}
            className="absolute left-0 right-0 flex items-center justify-between px-4 text-sm"
            style={{ bottom: `${Math.min((layer.altitude / 100) * 200, 95)}%` }}
          >
            <span className="text-white/50">{layer.icon} {layer.name}</span>
            <span className="text-white/50">{layer.altitude}x</span>
          </div>
        ))}

        {/* Current balloon position */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-4xl transition-all duration-200"
          style={{ bottom: `${Math.min((currentAltitude / 100) * 200, 90)}%` }}
        >
          🎈
        </div>

        {/* Current altitude display */}
        <div className="absolute top-4 left-4 bg-black/50 rounded-lg px-3 py-2">
          <div className="text-xs text-gray-400">Altitude</div>
          <div className="text-2xl font-bold text-yellow-400">{currentAltitude.toFixed(2)}x</div>
          <div className="text-sm text-gray-300">{currentLayer.icon} {currentLayer.name}</div>
        </div>

        {/* Target line */}
        <div
          className="absolute left-0 right-0 border-t-2 border-dashed border-yellow-400"
          style={{ bottom: `${Math.min((targetAltitude / 100) * 200, 95)}%` }}
        >
          <span className="absolute right-2 -top-4 text-xs text-yellow-400">Target: {targetAltitude}x</span>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-gray-400 text-xs mb-1">Bet Amount ($)</label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value) || 1)}
            disabled={isFlying}
            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Target Altitude</label>
          <input
            type="number"
            step="0.1"
            value={targetAltitude}
            onChange={(e) => setTargetAltitude(parseFloat(e.target.value) || 1.1)}
            disabled={isFlying}
            className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
          />
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Win Chance</label>
          <div className={`bg-gray-900 rounded px-3 py-2 font-bold ${
            calculations.winProbability > 50 ? 'text-green-400' : 'text-red-400'
          }`}>
            {calculations.winProbability.toFixed(1)}%
          </div>
        </div>
        <div>
          <label className="block text-gray-400 text-xs mb-1">Potential Win</label>
          <div className="bg-gray-900 rounded px-3 py-2 text-green-400 font-bold">
            +${calculations.potentialWin.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Quick Altitude Presets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {altitudeLayers.slice(1, 7).map((layer, idx) => (
          <button
            key={idx}
            onClick={() => setTargetAltitude(layer.altitude)}
            disabled={isFlying}
            className={`px-3 py-2 rounded-lg text-sm transition-all ${
              targetAltitude === layer.altitude
                ? `${layer.color} text-white ring-2 ring-white`
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {layer.icon} {layer.altitude}x
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={simulateFlight}
          disabled={isFlying}
          className="flex-1 py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-gray-600 text-white rounded-lg font-bold"
        >
          {isFlying ? 'Flying...' : 'LAUNCH BALLOON 🎈'}
        </button>
        <button
          onClick={() => quickSimulate(10)}
          disabled={isFlying}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium"
        >
          10x Quick
        </button>
        <button
          onClick={() => quickSimulate(100)}
          disabled={isFlying}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg font-medium"
        >
          100x Quick
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-400">Total Flights</div>
          <div className="text-2xl font-bold text-white">{stats.flights}</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-400">Win Rate</div>
          <div className={`text-2xl font-bold ${
            stats.flights > 0 && (stats.wins / stats.flights) >= 0.5 ? 'text-green-400' : 'text-red-400'
          }`}>
            {stats.flights > 0 ? ((stats.wins / stats.flights) * 100).toFixed(1) : 0}%
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-400">Highest Altitude</div>
          <div className="text-2xl font-bold text-sky-400">{stats.maxAltitude.toFixed(2)}x</div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-400">Total Profit</div>
          <div className={`text-2xl font-bold ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {stats.profit >= 0 ? '+' : ''}${stats.profit.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Recent History */}
      {history.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <h4 className="text-white font-medium mb-2">Recent Flights</h4>
          <div className="flex flex-wrap gap-2">
            {history.slice(0, 20).map((flight, idx) => {
              const layer = altitudeLayers.find((l, i) =>
                flight.crash >= l.altitude && (!altitudeLayers[i + 1] || flight.crash < altitudeLayers[i + 1].altitude)
              ) || altitudeLayers[0];

              return (
                <div
                  key={idx}
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${
                    flight.won ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}
                  title={`Target: ${flight.target}x, Crashed: ${flight.crash.toFixed(2)}x`}
                >
                  {layer.icon} {flight.crash.toFixed(2)}x
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Skyward Info */}
      <div className="bg-sky-900/30 border border-sky-600/50 rounded-lg p-4">
        <h4 className="text-sky-400 font-bold mb-2">About Skyward</h4>
        <p className="text-gray-300 text-sm">
          Skyward by BGaming is a balloon-themed crash game with the same 97% RTP as Aviator.
          The balloon rises higher (multiplier increases) until it pops. Cash out before it pops to win!
        </p>
        <div className="grid grid-cols-3 gap-4 mt-3 text-center text-sm">
          <div className="bg-gray-800 rounded p-2">
            <div className="text-sky-400 font-bold">97%</div>
            <div className="text-gray-500">RTP</div>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <div className="text-sky-400 font-bold">BGaming</div>
            <div className="text-gray-500">Provider</div>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <div className="text-sky-400 font-bold">🎈</div>
            <div className="text-gray-500">Theme</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AltitudeTracker;
