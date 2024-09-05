import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import logo from "@/assets/img/logo_viblo.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, CircleHelp, Grip, Info, List, Pen, PenLine, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import LanguageSwitcher from "@/components/LanguageSwitch";
import AvatarDropdownMenu from "@/components/AvatarDropdownMenu";

export default function MainHeader() {

  return (
    <header className="sticky w-full top-0 z-50 bg-white shadow h-16 py-4 ">
      <div className="flex flex-row items-center justify-between mx-auto max-w-7xl gap-28 container">
        <div className="flex">
          <Link to="/" className="mr-8 block content-center">
            <img src={logo} alt="Viblo" width={62} height={21} />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Bài viết
                </NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Hỏi đáp
                </NavigationMenuLink>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Thảo luận
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex-1">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              className="w-full rounded-r-none focus-visible:rounded-r focus-visible:ring-1 focus-visible:ring-offset-0 leading-none"
            />
            <Button className="absolute rounded-l-none top-0 right-0 rounded-r">
              <Search color="#ffffff" />
            </Button>
          </div>
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none mr-3">
              <div className="relative py-2">
                <div className="-top-1 absolute left-3">
                  <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-400 p-3 text-xs text-white">+99</p>
                </div>
                <Info color="#494141"></Info>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative max-w-[500px] min-w-[240px] px-0">
              <div className="flex items-center justify-between">
                <DropdownMenuLabel>Annoucements</DropdownMenuLabel>
                <Link to="/" className="hover:underline text-xs">
                  <span>Mark all as read</span>
                </Link>
              </div>
              <DropdownMenuSeparator className="m-0 bg-slate-300" />

              <ScrollArea className="h-72">
                <DropdownMenuGroup className="list-item">
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

              </ScrollArea>
              <DropdownMenuSeparator className="m-0 bg-slate-300" />
              <DropdownMenuLabel className="float-right">
                <Link to="/annoucements" className="hover:underline">All annoucements</Link>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none mr-3">
              <div className="relative py-2">
                <div className="-top-1 absolute left-3">
                  <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-400 p-3 text-xs text-white">+99</p>
                </div>
                <Bell color="#494141"></Bell>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative max-w-[500px] min-w-[240px] px-0">
              <div className="flex items-center justify-between">
                <DropdownMenuLabel>Annoucements</DropdownMenuLabel>
                <Link to="/" className="hover:underline text-xs">
                  <span>Mark all as read</span>
                </Link>
              </div>
              <DropdownMenuSeparator className="m-0 bg-slate-300" />

              <ScrollArea className="h-72">
                <DropdownMenuGroup className="list-item">
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="px-6 py-2">
                    <Link to="/">
                      <span className="break-words">
                        Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                      </span>
                      <br />
                      <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

              </ScrollArea>
              <DropdownMenuSeparator className="m-0 bg-slate-300" />
              <DropdownMenuLabel className="flex justify-center">
                <Link to="/annoucements" className="hover:underline">See All</Link>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none mr-3">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="link" className="p-0"><PenLine /></Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto">
                  <p className="text-sm">
                    write
                  </p>
                </HoverCardContent>
              </HoverCard>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Separator />
              <DropdownMenuItem>
                <Pen className="mr-4 h-4 w-4" />
                <span>Write post</span>
              </DropdownMenuItem>
              <Separator />

              <DropdownMenuItem>
                <List className="mr-4 h-4 w-4" />
                <span>New series</span>
              </DropdownMenuItem>
              <Separator />

              <DropdownMenuItem>
                <CircleHelp className="mr-4 h-4 w-4" />
                <span>Ask question</span>
              </DropdownMenuItem>
              <Separator />

            </DropdownMenuContent>
          </DropdownMenu>
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger className=" focus:outline-none mr-7">
              <div className="relative py-1">
                <div className="-top-1 absolute left-2">
                  <p className="flex h-1 items-center justify-center rounded-full bg-red-400 p-2 text-xs text-white">new</p>
                </div>
                <Grip color="#494141" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <ScrollArea className="h-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </ScrollArea>

              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <AvatarDropdownMenu />
        </div>
      </div>
    </header >
  )
}
