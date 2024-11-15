import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import axios from "axios";
import { Nothing } from "../../components/Nothing/Nothing";
import { convertCount } from "../post/utils/PostUtils";
import StarsSVG from "../../components/SVGs/StarsSVG";

export const TopUser: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const default_pfp = process.env.REACT_APP_PFP;
  const [results, setResults] = useState<any[]>([]);

  const fetchTop5Users = async () => {
    try {
      let req = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/get-top-5-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(req.data);

      setResults(req.data);
    } catch (e) {
      console.log("Issue loading posts: ", e);
    }
  };

  useEffect(() => {
    if (token) fetchTop5Users();
  }, [token]);
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
      <div className="bg-gray-100 py-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800">Top 5 Users</h2>
      </div>
      <ul className="divide-y divide-gray-200">
        {results.length > 0 ? (
          results.map((r: any, index: number) => (
            <li key={r.user.userId} className="flex items-center py-4 px-6">
              <span className="text-gray-700 text-lg font-medium mr-4">
                {index + 1}.
              </span>
              <img
                className="w-12 h-12 rounded-full object-cover mr-4"
                src={
                  r.user.profileUser?.profilePicture?.imageURL ?? default_pfp
                }
                alt="User avatar"
              />
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {r.user.nickname}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {convertCount(r.totalPosts)} Posts
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-600 text-base mr-2">
                    {convertCount(r.totalStars)}
                  </p>
                  <StarsSVG
                    height={16}
                    width={16}
                    color={"rgb(248, 184, 78)"}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <Nothing />
        )}
      </ul>
    </div>
  );
};
