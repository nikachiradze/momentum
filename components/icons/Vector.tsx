interface VectorProps {
  color?: string;
  className?: string;
}

export default function Vector({
  color = "#6C757D",
  className = "",
}: VectorProps) {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.3327 1L4.99935 8.33333L1.66602 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
