import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "./data-table";
import { userColumns } from "@/pages/admin/users/colums";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllUserService, UserResponse } from "@/services/UserService";
import { useState } from "react";
import { PaginationState } from "@/models/Pagination";
import { User } from "@/models/User";

export const UserPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, error, isLoading } = useQuery<UserResponse, Error>({
    queryKey: ['GetAllUser', pagination],
    queryFn: () => getAllUserService(pagination.pageIndex + 1, pagination.pageSize),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Hiển thị danh sách người dùng</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mx-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error.message}</div>
          ) : (
            <DataTable<User, string>
              userColumns={userColumns}
              data={data?.data || []}
              rowCount={data?.meta.total || 0}
              last_page={data?.meta.last_page || 0}
              pagination={pagination}
              setPagination={(updater) => {
                setPagination((prevState) => {
                  const newPagination = typeof updater === 'function' ? updater(prevState) : updater;
                  return {
                    ...newPagination,
                    pageIndex: newPagination.pageIndex, // Keep zero-based pagination here for the table
                  };
                });
              }}
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* You can add footer content here if needed */}
      </CardFooter>
    </Card>
  );
};
