import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <div className="bg-black py-2">
      <NavigationMenu className="justify-between container">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/docs" className="text-white">
              Documentation
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs" className="text-white">
              Documentation
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs" className="text-white">
              Documentation
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs" className="text-white">
              Documentation
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/docs" className="text-white">
              Documentation
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
