import React from 'react';
import { CrashGameStatsPage } from '../components/GameStats';
import gameConfig from '../config/gameConfig';

/**
 * Statistics Page for Skyward Tracker
 * Uses game-specific statistics component
 */
export default function StatsPage() {
  return (
    <CrashGameStatsPage
      gameId={gameConfig.gameId}
      apiBaseUrl={gameConfig.apiBaseUrl}
    />
  );
}
