import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { friends } = useSelector((state) => state.user);
  const [friendsList, setFriendsList] = useState([]);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px");

  const getUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };
  useEffect(() => {
    getUser();
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  const getFriendsList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setFriendsList(data);
  };
  useEffect(() => {
    getFriendsList();
  }, [userId, friends]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={userId}
            picturePath={user ? user.picturePath : "info4.jpeg"}
            friends={friendsList}
          />
          <Box m="2rem 0" />
          <FriendListWidget friends={friendsList} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="-2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
