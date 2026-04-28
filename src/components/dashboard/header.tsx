export default function Header( {username} : { username: string }) {
  
  return (
    <div className="flex justify-left items-left">
      <h1 className="text-2xl font-bold text-blue-600">Olá, {username}👋</h1>
    </div>
  );
}