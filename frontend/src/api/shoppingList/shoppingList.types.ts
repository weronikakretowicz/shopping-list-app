export type ItemPayload = {
  name: string;
  quantity?: number;
  unit?: string;
};

export type AddListPayload = {
  name: string;
  items: ItemPayload[];
};
