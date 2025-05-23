export default function Form({
  totalKwh,
  buildingArea,
  targetIKE,
  setBuildingArea,
  setTargetIKE,
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">

      {/* Luas Bangunan */}
      <div>
        <label className="block font-semibold mb-1">Luas Bangunan (m²):</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={buildingArea}
          onChange={(e) => setBuildingArea(Number(e.target.value))}
          min={0}
        />
      </div>

      {/* Target IKE */}
      <div>
        <label className="block font-semibold mb-1">Target IKE (kWh/m²):</label>
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={targetIKE}
          onChange={(e) => setTargetIKE(Number(e.target.value))}
          step="0.01"
          min={0}
        />
      </div>

      {/* Total Konsumsi (readonly view) */}
      <div>
        <label className="block font-semibold mb-1">Total Konsumsi Listrik (kWh):</label>
        <div className="border p-2 rounded w-full bg-gray-100 text-gray-700">
          {Number(totalKwh).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
