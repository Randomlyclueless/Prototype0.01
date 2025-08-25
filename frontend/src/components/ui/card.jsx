export const Card = ({ children, className }) => (
  <div className={`rounded-lg border p-4 shadow ${className || ""}`}>
    {children}
  </div>
);
export const CardHeader = ({ children }) => (
  <div className="mb-2">{children}</div>
);
export const CardTitle = ({ children }) => (
  <h2 className="font-bold">{children}</h2>
);
export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);
export const CardContent = ({ children }) => <div>{children}</div>;
