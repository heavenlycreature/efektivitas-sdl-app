export default function BuildingAreaInput({ value, onChange }) {
  return (
    <div>
      <label className="block font-semibold">Luas Bangunan (m²):</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
