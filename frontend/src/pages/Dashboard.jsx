export default function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <div>
      <h1>Dashboard</h1>

      {role === "CLIENT" && <h2>Hello I am a CLIENT</h2>}

      {role === "FREELANCER" && <h2>Hello I am a FREELANCER</h2>}
    </div>
  );
}