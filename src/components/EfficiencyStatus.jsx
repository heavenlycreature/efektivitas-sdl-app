export default function EfficiencyStatus({ ike, targetIKE }) {
  const status = ike <= targetIKE ? 'Efisien' : 'Belum Efisien';
  const color = ike <= targetIKE ? 'text-green-600' : 'text-red-600';

  return (
    <div>
      <h2 className="font-semibold">Status Efisiensi:</h2>
      <p className={`text-xl font-bold ${color}`}>{status}</p>
    </div>
  );
}
