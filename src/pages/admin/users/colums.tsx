import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/table/DataTableColumnHeader"
import { User } from "@/models/User"
import { Switch } from "@/components/ui/switch"
export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 20,
    enableResizing: false,
    footer: props => props.column.id
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    filterFn: 'includesString'
  },
  {
    accessorKey: "display_name",
    header: "Display Name",
  },
  {
    accessorKey: "role_id",
    header: "Role",
    cell: ({ row }) => {
      const roleId = row.getValue("role_id")
      const role = roleId === 1 ? "Admin" : roleId === 2 ? "Moderator" : "User"
      return <div>{role}</div>
    },
    footer: props => props.column.id
  },
  {
    accessorKey: "total_view",
    header: () => <div>Total Views</div>,
    cell: ({ row }) => {
      const totalViews = parseFloat(row.getValue("total_view"))
      return <div className="font-medium">{totalViews}</div>
    },
    footer: props => props.column.id
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: () => {
      return (
        <Switch className="" id="airplane-mode" />
      )
    },
    size: 10,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(user.id))}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableSorting: false,
    enableHiding: false,
    size: 20,
    enableResizing: false,
    footer: props => props.column.id
  },
]