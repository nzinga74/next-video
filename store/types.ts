export type ReducerState = {
  data: {
    id: string;
    title: number;
    url: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    qtdReactions: number;
    user: {
      id: string;
      username: string;
      email: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
};
