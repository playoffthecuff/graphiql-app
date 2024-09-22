export default function formatMs(ms: number, decimals = 2) {
  if (ms === 0) return '0 ms';
  if (isNaN(ms)) return '';

  const timeUnits = [
    {unit: 'h', value: 3600000},
    {unit: 'm', value: 60000},
    {unit: 's', value: 1000},
    {unit: 'ms', value: 1},
  ];

  for (const {unit, value} of timeUnits) {
    if (ms >= value) {
      const amount = unit === 'ms' ? Math.floor(ms / value) : (ms / value).toFixed(decimals);
      return `${amount} ${unit}`;
    }
  }

  return `${ms} ms`;
}
