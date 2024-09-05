import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import NavItem from "./NavItem";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-menu">
          <NavigationMenu>
            <NavigationMenuList className="flex justify-between gap-7 text-sm uppercase text-white">
              <NavItem path="/content-creator" label="content creator" isActive={isActive("/content-creator")} />
              <NavItem path="/followings" label="followings" isActive={isActive("/followings")} />
              <NavItem path="/newest" label="newest" isActive={isActive("/newest")} />
              <NavItem path="/series" label="series" isActive={isActive("/series")} />
              <NavItem path="/editors-choice" label="editors' choice" isActive={isActive("/editors-choice")} />
              <NavItem path="/trending" label="trending" isActive={isActive("/trending")} />
              <NavItem path="/videos" label="video" isActive={isActive("/videos")} />
              <NavItem path="/clip/posts" label="my bookmarks" isActive={isActive("/clip/posts")} />
            </NavigationMenuList>
          </NavigationMenu>

          <Button className={cn("bg-white text-black hover:bg-white")}>
            <SquarePen className="mr-2" />
            <Link to="/publish/post">Create Post</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
