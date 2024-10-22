import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../utils/GlobalInterface";
import axios from "axios";
import { getFollowers, getFollowing } from "../../services/UserService";

const baseURL = process.env.REACT_APP_API_URL;

interface UserSliceState {
  loggedIn: User | undefined;
  following: User[];
  followers: User[];
  username: string;
  token: string;
  fromRegister: boolean;
  error: boolean;
}

interface LoginBody {
  username: string;
  password: string;
}

interface VerifyUserBody {
  email: string;
  phone: string;
  username: string;
}
interface followUserBody {
  token: string;
  followee: string;
}

const initialState: UserSliceState = {
  loggedIn: undefined,
  following: [],
  followers: [],
  username: "",
  token: "",
  fromRegister: false,
  error: false,
};

export const verifyUsername = createAsyncThunk(
  "user/username",
  async (body: VerifyUserBody, thunkAPI) => {
    try {
      const req = await axios.post(`${baseURL}/auth/find`, body);
      return req.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getUserByToken = createAsyncThunk(
  "user/get",
  async (token: string, thunkAPI) => {
    try {
      const req = await axios.get(`${baseURL}/users/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = req.data;

      // console.log(user.user);

      const followers = getFollowers(user.username);
      const following = getFollowing(user.username);

      let followingAndFollowers = await Promise.all([followers, following]);

      return {
        loggedIn: user,
        followers: followingAndFollowers[0],
        following: followingAndFollowers[1],
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const followUser = createAsyncThunk(
  "user/follow",
  async (body: followUserBody, thunkAPI) => {
    try {
      const req = await axios.put(
        `${baseURL}/users/follow`,
        {
          followedUser: body.followee,
        },
        {
          headers: {
            Authorization: `Bearer ${body.token}`,
          },
        }
      );

      return req.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (body: LoginBody, thunkAPI) => {
    try {
      const req = await axios.post(`${baseURL}/auth/login`, body);
      const user = req.data;

      // console.log(user.user);

      const followers = getFollowers(user.user.username);
      const following = getFollowing(user.user.username);

      let followingAndFollowers = await Promise.all([followers, following]);

      return {
        loggedIn: user,
        followers: followingAndFollowers[0],
        following: followingAndFollowers[1],
      };
    } catch (e) {
      console.log("login failed");
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (token: string, thunkAPI) => {
    try {
      const req = await axios.get(`${baseURL}/users/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = req.data;

      const followers = getFollowers(user.username);
      const following = getFollowing(user.username);

      let followingAndFollowers = await Promise.all([followers, following]);

      return {
        loggedIn: user,
        followers: followingAndFollowers[0],
        following: followingAndFollowers[1],
        token: token,
      };
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFromRegister(state, action: PayloadAction<boolean>) {
      state = {
        ...state,
        fromRegister: action.payload,
      };

      return state;
    },

    resetUsername(state) {
      state = {
        ...state,
        username: "",
      };

      return state;
    },

    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    //
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state = {
        ...state,
        loggedIn: {
          userId: action.payload.loggedIn.user.userId,
          firstName: action.payload.loggedIn.user.firstName,
          lastName: action.payload.loggedIn.user.lastName,
          email: action.payload.loggedIn.user.email,
          phone: action.payload.loggedIn.user.phone,
          dateOfBirth: action.payload.loggedIn.user.dateOfBirth,
          username: action.payload.loggedIn.user.username,
          bio: action.payload.loggedIn.user.bio,
          nickname: action.payload.loggedIn.user.nickname,
          profilePicture: action.payload.loggedIn.user.profilePicture,
          bannerPicture: action.payload.loggedIn.user.bannerPicture,
          verifiedAccount: action.payload.loggedIn.user.verifiedAccount,
          privateAccount: action.payload.loggedIn.user.privateAccount,
          organization: action.payload.loggedIn.user.organization,
        },
        token: action.payload.loggedIn.token, // JWT token
        followers: action.payload.followers,
        following: action.payload.following,
      };
      return state;
    });

    builder
      .addCase(verifyUsername.fulfilled, (state, action) => {
        state = {
          ...state,
          username: action.payload,
        };
        return state;
      })
      .addCase(verifyUsername.pending, (state, action) => {
        state = {
          ...state,
          error: false,
        };
        return state;
      })
      .addCase(verifyUsername.rejected, (state, action) => {
        state = {
          ...state,
          error: true,
        };
        return state;
      });

    builder
      .addCase(loginUser.pending, (state, action) => {
        state = {
          ...state,
          error: false,
        };
        return state;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state = {
          ...state,
          error: true,
        };
        return state;
      });

    builder
      .addCase(getUserByToken.fulfilled, (state, action) => {
        state = {
          ...state,
          loggedIn: action.payload.loggedIn,
          username: action.payload.loggedIn.username,
          followers: action.payload.followers,
          following: action.payload.following,
        };

        return state;
      })
      .addCase(getUserByToken.pending, (state, action) => {
        state = {
          ...state,
          error: false,
        };
        return state;
      })
      .addCase(getUserByToken.rejected, (state, action) => {
        state = {
          ...state,
          error: true,
        };
        return state;
      });

    // follow user
    builder
      .addCase(followUser.pending, (state, action) => {
        state = {
          ...state,
          error: false,
        };
        return state;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state = {
          ...state,
          following: action.payload,
        };
        return state;
      })
      .addCase(followUser.rejected, (state, action) => {
        state = {
          ...state,
          error: true,
        };
        return state;
      });

    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state = {
        ...state,
        loggedIn: action.payload.loggedIn,
        token: action.payload.token,
        followers: action.payload.followers,
        following: action.payload.following,
      };
      return state;
    });
    //
  },
});

export const { setFromRegister, resetUsername, setToken } = UserSlice.actions;

export default UserSlice.reducer;
