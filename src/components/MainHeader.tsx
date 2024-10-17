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
import { Bell, CircleHelp, Grip, Info, List, Loader2, LogIn, Pen, PenLine, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import LanguageSwitcher from "@/components/LanguageSwitch";
import AvatarDropdownMenu from "@/components/AvatarDropdownMenu";
import { authAtom, titleNewAtom, userAtom } from "@/atoms/authAtoms";
import { useAtom } from "jotai";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotificationService } from "@/services/NotificationService";
import { useEffect, useState } from "react";
import { Notification } from "@/models/Notification";
import NotificationsList from "./notification/ListNoti";

export default function MainHeader() {
  const [auth,] = useAtom(authAtom);
  const [user,] = useAtom(userAtom);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [titleNew, setTitleNew] = useAtom(titleNewAtom)
  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['GetNotification'],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => getNotificationService(pageParam, 3),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    enabled: auth,
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsWindowFocused(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isWindowFocused && newNotificationsCount > 0) {
      if (!titleNew.includes(`(${newNotificationsCount})`)) {
        setTitleNew(`${titleNew} (${newNotificationsCount})`);
      }
    }
  }, [isWindowFocused, newNotificationsCount, setTitleNew, titleNew]);

  useEffect(() => {
    if (data) {
      setNotifications(data.pages.flatMap(page => page.notifications));
    }
  }, [data]);

  const totalRows = data?.pages[0]?.total || 0;

  useEffect(() => {
    if (user) {
      const channel = window.Echo.private(`App.Models.User.${user.id}`);

      const handleNotification = (notification: Notification) => {
        setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        if (!isWindowFocused) {
          setNewNotificationsCount((prevCount) => prevCount + 1);
        }
      };

      channel.notification(handleNotification);
      return (() => {
        channel.stopListening('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', handleNotification);
        window.Echo.leave(`App.Models.User.${user?.id}`)
      })
    }
  }, [isWindowFocused, user]);

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
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Link to="/newest">
                    Bài viết
                  </Link>
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
              className="w-full"
            />
            <Button className="absolute rounded-l-none top-0 right-0">
              <Search color="#ffffff" />
            </Button>
          </div>
        </div>
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-3">
              <div className="relative py-2">
                <div className="-top-1 absolute left-3">
                  <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-400 p-3 text-xs text-white">+99</p>
                </div>
                <Info color="#494141"></Info>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative max-w-[500px] min-w-[240px] px-0">
              <div className="flex items-center justify-between">
                <DropdownMenuLabel>Thông tin</DropdownMenuLabel>
                {auth &&
                  <Link to="/" className="hover:underline text-xs">
                    <span>Mark all as read</span>
                  </Link>
                }

              </div>
              <DropdownMenuSeparator className="m-0 bg-slate-300" />

              <ScrollArea className="h-72">
                <DropdownMenuGroup className="list-item">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <DropdownMenuItem key={index} className="px-6 py-2">
                      <Link to="/">
                        <span className="break-words">
                          Chính thức công bố Thể lệ chi tiết Wrire &amp; Inspire Blogathon - Sự kiện tìm kiếm những Trendsetters trên Viblo
                        </span>
                        <br />
                        <small className="font-extralight">Aug 21st, 8:00 p.m.</small>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

              </ScrollArea>
              <DropdownMenuSeparator className="m-0 bg-slate-300" />
              <DropdownMenuLabel className="float-right">
                <Link to="/annoucements" className="hover:underline">Tất cả thông tin</Link>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          {auth &&
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none mr-3">
                  <div className="relative py-2">
                    <div className="-top-1 absolute left-3">
                      <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-400 p-3 text-xs text-white">{totalRows > 99 ? "+99" : totalRows}</p>
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
                      {isLoading ? (
                        <div className="px-6 py-2 text-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </div>
                      ) : isError ? (
                        <div className="px-6 py-2 text-center text-red-500">
                          {error.message || "Failed to load notifications."}
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="px-6 py-2 text-center text-gray-500">
                          No notifications found.
                        </div>
                      ) : (
                        <NotificationsList notifications={notifications} />
                      )}

                    </DropdownMenuGroup>

                  </ScrollArea>
                  <DropdownMenuSeparator className="m-0 bg-slate-300" />
                  <DropdownMenuLabel className="flex justify-between items-center">
                    {!isLoading && hasNextPage && (
                      <Button
                        variant="link"
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className="p-0 h-0"
                      >
                        {isFetchingNextPage ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          "Load More"
                        )}
                      </Button>
                    )}
                    <Link to="/annoucements" className="hover:underline">See All</Link>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none mr-3">
                  <HoverCard>
                    <HoverCardTrigger>
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
                    <Link to="/publish/post" className="flex">
                      <Pen className="mr-4 h-4 w-4" />
                      <span>Write post</span>
                    </Link>
                  </DropdownMenuItem>
                  <Separator />

                  <DropdownMenuItem>
                    <Link to="/publish/series" className="flex">
                      <List className="mr-4 h-4 w-4" />
                      <span>New series</span>
                    </Link>
                  </DropdownMenuItem>
                  <Separator />

                  <DropdownMenuItem>
                    <CircleHelp className="mr-4 h-4 w-4" />
                    <span>Ask question</span>
                  </DropdownMenuItem>
                  <Separator />

                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none mr-7">
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
          {auth && <AvatarDropdownMenu user={user} />}
          {!auth &&
            <Button variant={'ghost'} className="bg-white hover:bg-white text-blue-400 hover:text-blue-300">
              <Link to="/login" className="flex">
                <LogIn size={20} />
                <span className="ml-2">Đăng nhập/đăng ký</span>
              </Link>
            </Button>
          }
        </div>
      </div>
    </header >
  )
}
