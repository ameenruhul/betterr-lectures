import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Better Classes</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};