type Props = {
  values: number[];
  height?: number;
  width?: number;
  className?: string;
};

export default function Sparkline({ values, height = 24, width = 80, className = "" }: Props) {
  if (values.length === 0) return null;
  const max = Math.max(1, ...values);
  const stepX = width / Math.max(1, values.length - 1);
  const points = values
    .map((v, i) => `${(i * stepX).toFixed(1)},${(height - (v / max) * height).toFixed(1)}`)
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`text-accent ${className}`}
      role="img"
      aria-label={`Last 7 days: ${values.join(", ")}`}
    >
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" points={points} />
      {values.map((v, i) => (
        <circle
          key={i}
          cx={(i * stepX).toFixed(1)}
          cy={(height - (v / max) * height).toFixed(1)}
          r={1.5}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
