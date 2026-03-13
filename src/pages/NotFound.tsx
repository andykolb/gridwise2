import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <p className="text-sm text-muted-foreground">
          No page found at <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
