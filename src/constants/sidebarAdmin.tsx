import { Home, User } from "lucide-react";

export const sidebarItem = [
  {
    label: 'MAIN',
    items: [
      {
        icon: <Home className="mr-2" />,
        label: 'Dashboard',
        active: ['dashboard'],
        links: [
          {title: 'Thống kế chung', to: '/admin/dashboard/index'}
        ]
      }
    ]
  },
  {
    label: 'FUNCTION',
    items: [
      {
        icon: <User className="mr-2" />,
        label: 'User',
        active: ['user'],
        links: [
          {title: 'QL Nhóm thành viên', to: '/admin/user/catalogue'},
          {title: 'QL thành viên', to: '/admin/user/index'}
        ]
      }
    ]
  }
]