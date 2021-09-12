export default function TwoUp({ children, className = "" }) {
  return (
    <div className={`flex flex-wrap w-full ${className}`}>
      <div className="w-full md:w-1/2 pr-0 pb-8 md:pr-4">
        {children[0] || null}
      </div>
      <div className="w-full md:w-1/2 pl-0 pb-8 md:pl-4">
        {children[1] || null}
      </div>
    </div>
  );
}
