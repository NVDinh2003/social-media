import { createContext, useState } from "react";
import { DiscoveryContextType } from "./Modals";
import { User } from "../../../utils/GlobalInterface";
import axios from "axios";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const DiscoveryContext = createContext<DiscoveryContextType | null>(
  null
);

const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchContent, setSearchContent] = useState<string>("");
  const [searchResultUsers, setSearchResultUsers] = useState<User[]>([]);
  const [jwt, getJwt, setJwt] = useLocalStorage("token", "");

  const searchForUsers = async (searchContent: string) => {
    // search for users, wait a second or two to stop typing
    let req = await axios.get(
      `${process.env.REACT_APP_API_URL}/discovery/users`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },

        params: {
          searchTerm: searchContent,
        },
      }
    );

    let body = req.data;
    setSearchResultUsers(body);
    // console.log(body);
  };

  const updateSearchContent = (content: string) => {
    setSearchContent(content);
  };

  return (
    <DiscoveryContext.Provider
      value={{
        searchContent,
        searchResultUsers,
        searchForUsers,
        updateSearchContent,
      }}
    >
      {children}
    </DiscoveryContext.Provider>
  );
};

export default DiscoveryProvider;
