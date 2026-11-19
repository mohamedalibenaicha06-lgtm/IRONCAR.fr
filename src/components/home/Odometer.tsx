/** Chiffres qui défilent comme un compteur mécanique jusqu'à la valeur réelle. */
export function Odometer({ value, digits = 2 }: { value: number; digits?: number }) {
  const str = String(value).padStart(digits, "0");
  return (
    <span className="odo" aria-label={String(value)}>
      {[...str].map((d, i) => (
        <span key={i} className="odo-col" aria-hidden style={{ ["--v" as string]: d, ["--i" as string]: i }}>
          {Array.from({ length: 10 }, (_, k) => <span key={k}>{k}</span>)}
        </span>
      ))}
    </span>
  );
}
