export function formatTime(seconds: number): string {
  const roundedSeconds = Math.floor(seconds);
  if (roundedSeconds >= 60) {
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;
    return remainingSeconds > 0
      ? `${minutes} minutes ${remainingSeconds} seconds`
      : `${minutes} minutes`;
  }
  return `${roundedSeconds} seconds`;
}
