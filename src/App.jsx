import React, { useState } from 'react';
import DeviceListManager from './components/DeviceListManager';
import OptimizationSuggestion from './components/OptimizationSuggestion';
import Form from './components/Form';

export default function App() {
  const [buildingArea, setBuildingArea] = useState(0);
  const [targetIKE, setTargetIKE] = useState(3.4);
  const [devices, setDevices] = useState([]);

  const totalKwh = devices.reduce((total, device) => {
    return total + (device.power * device.hoursPerDay * device.daysPerMonth) / 1000;
  }, 0);

  const currentIKE =
    buildingArea > 0 ? (totalKwh / parseFloat(buildingArea)).toFixed(2) : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Simulasi Efektivitas Daya Listrik</h1>

      <Form
        totalKwh={totalKwh.toFixed(2)}
        buildingArea={buildingArea}
        targetIKE={targetIKE}
        setBuildingArea={setBuildingArea}
        setTargetIKE={setTargetIKE}
      />

      <DeviceListManager devices={devices} setDevices={setDevices} />

      <div className="bg-slate-500 p-4 rounded shadow-md">
        <p className="text-lg text-slate-200 font-semibold">
          IKE Saat Ini: <span className="text-sky-300">{currentIKE} kWh/m²</span>
        </p>
        <p className="text-lg text-slate-200">
          Status Efisiensi:{' '}
          {currentIKE <= targetIKE ? (
            <span className="text-green-300 font-semibold">Efisien</span>
          ) : (
            <span className="text-red-600 font-semibold">Belum Efisien</span>
          )}
        </p>
      </div>

      <OptimizationSuggestion
        devices={devices}
        totalKwh={totalKwh}
        buildingArea={buildingArea}
        targetIKE={targetIKE}
      />
    </div>
  );
}
