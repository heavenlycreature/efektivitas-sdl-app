import { useState } from 'react';

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

export default function DeviceListManager({ devices, setDevices }) {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState('');
  const [daysPerMonth, setDaysPerMonth] = useState('');

  const addDevice = () => {
    if (!name || power <= 0 || hoursPerDay <= 0 || daysPerMonth <= 0) return;
    const newDevice = {
      id: uuidv4(),
      name,
      power: Number(power),
      hoursPerDay: Number(hoursPerDay),
      daysPerMonth: Number(daysPerMonth),
    };
    setDevices([...devices, newDevice]);
    setName('');
    setPower('');
    setHoursPerDay('');
    setDaysPerMonth('');
  };

  const removeDevice = (id) => {
    setDevices(devices.filter((device) => device.id !== id));
  };

  return (
    <div>
      <h2 className="font-semibold text-lg mb-2">Daftar Perangkat</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <input placeholder="Nama" className="border p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Daya (Watt)" type="number" className="border p-2 rounded" value={power} onChange={(e) => setPower(e.target.value)} />
        <input placeholder="Jam/Hari" type="number" className="border p-2 rounded" value={hoursPerDay} onChange={(e) => setHoursPerDay(e.target.value)} />
        <input placeholder="Hari/Bulan" type="number" className="border p-2 rounded" value={daysPerMonth} onChange={(e) => setDaysPerMonth(e.target.value)} />
      </div>
      <button type='button' onClick={addDevice} className="text-white cursor-pointer bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded mb-4">Tambah Perangkat</button>

      {devices.length > 0 && (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100 text-slate-800">
              <th className="p-2 border">Nama</th>
              <th className="p-2 border">Daya (W)</th>
              <th className="p-2 border">Jam/Hari</th>
              <th className="p-2 border">Hari/Bulan</th>
              <th className="p-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id}>
                <td className="p-2 border">{device.name}</td>
                <td className="p-2 border">{device.power}</td>
                <td className="p-2 border">{device.hoursPerDay}</td>
                <td className="p-2 border">{device.daysPerMonth}</td>
                <td className="p-2 border">
                  <button onClick={() => removeDevice(device.id)} className="text-white cursor-pointer bg-red-500 hover:bg-red-700 px-4 py-2 rounded mb-4">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
