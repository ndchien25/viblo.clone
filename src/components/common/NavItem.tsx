import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationMenuItem } from "../ui/navigation-menu";

interface NavItemProps {
  path: string;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ path, label, isActive }) => {
  return (
    <NavigationMenuItem>
      <Link
        to={path}
        className={cn(
          "nav-link",
          isActive ? "text-white active" : "text-slate-500"
        )}
      >
        {label}
      </Link>
    </NavigationMenuItem>
  );
};

export default NavItem;
