export default function OptimizationSuggestion({ devices, totalKwh, buildingArea, targetIKE }) {
  const currentIKE = totalKwh / buildingArea;
  const targetTotalKwh = targetIKE * buildingArea;

  if (currentIKE <= targetIKE) {
    return (
      <div>
        <h2 className="font-semibold mt-4">Saran Optimasi:</h2>
        <p className="text-green-700">Tidak perlu optimasi. Sudah efisien.</p>
      </div>
    );
  }

  // Hitung konsumsi kWh tiap perangkat
  const deviceConsumptions = devices.map((device) => {
    const kwh = (device.power * device.hoursPerDay * device.daysPerMonth) / 1000;
    return { ...device, kwh };
  });

  // Greedy: urutkan dari konsumsi terbesar
  const sortedDevices = [...deviceConsumptions].sort((a, b) => b.kwh - a.kwh);

  let savedKwh = 0;
  const suggestions = [];

  for (let i = 0; i < sortedDevices.length; i++) {
    const device = sortedDevices[i];
    if (totalKwh - savedKwh <= targetTotalKwh) break;

    const potentialSaved = Math.min(device.kwh * 0.5, totalKwh - targetTotalKwh - savedKwh); // pengurangan 50%
    savedKwh += potentialSaved;

    suggestions.push({
      name: device.name,
      saved: potentialSaved.toFixed(2),
      action: `Kurangi penggunaan ${device.name} hingga 50%`
    });
  }

  return (
    <div>
      <h2 className="font-semibold mt-4">Saran Optimasi (Greedy):</h2>
      {suggestions.length > 0 ? (
        <ul className="list-disc ml-5">
          {suggestions.map((s, i) => (
            <li key={i}>
              {s.action} (Hemat {s.saved} kWh)
            </li>
          ))}
        </ul>
      ) : (
        <p>Tidak ada perangkat yang bisa dioptimasi lebih lanjut.</p>
      )}
    </div>
  );
}
