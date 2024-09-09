import { User } from "../../../utils/GlobalInterface";

export type DiscoveryContextType = {
  searchContent: string;
  searchResultUsers: User[];
  searchForUsers: (searchContent: string) => void;
  updateSearchContent: (content: string) => void;
};
