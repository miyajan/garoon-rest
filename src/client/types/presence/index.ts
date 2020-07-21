export type Presence = {
  user: {
    id: string;
    name: string;
    code: string;
  };
  updatedAt: string;
  notes: string;
  status: {
    name: string;
    code: string;
  };
};
