// Ensures the root container is always 100vw, min 100vh, and centers all children along the y-axis
export default function Container({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-screen max-w-full items-center">
      {children}
    </div>
  );
}
