export type RoleItem = {
    id: number;
    code: string;
    name: string;
};

export type InfoResponse = {
    roles: RoleItem[];
};
