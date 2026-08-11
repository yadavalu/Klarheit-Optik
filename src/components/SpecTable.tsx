interface SpecTableProps {
  specs: Record<string, string>;
}

export function SpecTable({ specs }: SpecTableProps) {
  const entries = Object.entries(specs);

  if (entries.length === 0) return null;

  // Format camelCase keys to readable labels
  function formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .replace(/_/g, " ")
      .trim();
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-4 py-3 border-b border-cream-300/50 bg-white/80">
        <h3 className="text-sm font-semibold text-purple-950 tracking-wider uppercase">
          Technical Specifications
        </h3>
      </div>
      <table className="spec-table">
        <tbody>
          {entries.map(([key, value], i) => (
            <tr
              key={key}
              className={i % 2 === 0 ? "bg-white/30" : "bg-transparent"}
            >
              <td>{formatLabel(key)}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
