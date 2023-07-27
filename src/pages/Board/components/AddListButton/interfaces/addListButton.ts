export interface addListButton {
  params: any;
  setBoard: any;
  board: {
    title: string;
    custom?: {
      description?: string;
    };
    users: {
      id: number;
      username: string;
    }[];
    lists: {
      id: number;
      title: string;
      cards: {
        id: number;
        title: string;
        color?: string;
        description?: string;
        custom?: {
          deadline?: string;
        };
        users: number[];
        created_at: number;
      }[];
    }[];
  };
  getData: () => void;
}
