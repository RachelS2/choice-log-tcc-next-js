export default function Header( {username} : { username: string }) {
  
  return (
    <div className="flexjustify-left items-left">
      <h1 className="text-2xl font-bold text-black">Olá, {username}👋</h1>

      <input
        type="text"
        placeholder="Buscar experiências..."
        className="border rounded-xl px-4 py-2 w-64"
      />
    </div>
  );
}