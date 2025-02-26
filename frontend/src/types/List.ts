// Types
export type ListItem = {
    _id: string;
    name: string;
    quantity: number;
    unit: string;
    bought: boolean;
};

export type List = {
    _id: string;
    name: string;
    items: ListItem[];
    owner: string;
    participants: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

