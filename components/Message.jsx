export default function Message({ children }) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">
      <div className="flex items-center">
        <img src="" alt="" />
        <h2>User</h2>
      </div>
      <div>
        <p>Description</p>
      </div>
      {children}
    </div>
  );
}
