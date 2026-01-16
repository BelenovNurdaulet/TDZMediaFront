export type RoleCode = "USER" | "ADMIN";
export type SortField =
    | "id"
    | "firstName"
    | "lastName"
    | "surName"
    | "email"
    | "createdAt"
    | "updatedAt";

export type PublicUser = {
    id: number;
    firstName: string;
    lastName: string | null;
    surName: string | null;
    email: string;
    skills: string[];
    role: RoleCode;
    createdAt: string; // date-time
    updatedAt: string; // date-time
};

export type UsersListResponse = {
    items: PublicUser[];
    total: number;
};

export type UsersListQuery = {
    page?: number;
    pageSize?: number;
    sortBy?: SortField;
    sortDir?: "asc" | "desc";
    q?: string;
    role?: string;
    ids?: string;
    createdFrom?: string;
    createdTo?: string;
    updatedFrom?: string;
    updatedTo?: string;
};

export type UpdateUserRequest = Partial<
    Pick<PublicUser, "firstName" | "lastName" | "surName" | "email" | "skills" | "role">
>;
