import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building, BookOpen, Menu, X, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const user = localStorage.getItem("token");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        interface DecodedToken {
          role: string;
          id: string;
        }
        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "Job seekers", path: "/jobseekers", icon: Briefcase },
    { title: "Companies", path: "/companies", icon: Building },
    { title: "Resources", path: "/resources", icon: BookOpen },
  ];

  return (
    <motion.nav
      className="fixed w-full z-50 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src={logo}
                alt="ThriveConnect Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out"
              >
                <motion.div
                  className="flex items-center space-x-1"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </motion.div>
              </Link>
            ))}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      navigate(
                        userRole === "jobseeker"
                          ? `/jobSeeker-profile-page/${userId}`
                          : `/company-profile-page/${userId}`
                      )
                    }
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/login");
                    }}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ease-in-out"
                >
                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </motion.div>
                </Link>
              ))}
              <div className="mt-4 space-y-2">
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        navigate(
                          userRole === "jobseeker"
                            ? `/jobSeeker-profile-page/${userId}`
                            : `/company-profile-page/${userId}`
                        )
                      }
                    >
                      Profile
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/login">
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
