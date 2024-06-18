import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RoomType, InitialState, MessageFrom, MessageType, UserType } from "../types";
import { AIReplies } from "../constants";
import { login } from "./actions";
const userInfo = localStorage.getItem("dontStoreUserInfoLikeThat");

export const initialState: InitialState = {
	error: false,
	success: false,
	message: "",
	rooms: [],
	loading: false,
	isAuthenticated: Boolean(userInfo),
	user: userInfo ? JSON.parse(userInfo) : undefined,
	currentMessages: undefined,
	currentRoom: undefined,
};

export const reducer = createSlice({
	name: "global",
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("dontStoreUserInfoLikeThat");
			localStorage.removeItem("rooms");
			state.user = undefined;
			state.isAuthenticated = false;
			state.currentRoom = undefined;
			state.rooms = [];
		},
		setCurrentRoom: (state, action: PayloadAction<MessageType>) => {
			const newRoom: RoomType = {
				id: new Date().getTime(),
				title: `Chat on ${new Date().toDateString()}`,
				messages: [action.payload],
			};
			state.currentRoom = newRoom;
		},
		createRoom: (state, action: PayloadAction<RoomType>) => {
			const index = state.rooms.findIndex((room) => room.id === action.payload.id);
			let _rooms: Array<RoomType> = [];
			if (index < 0) {
				_rooms = [...state.rooms, action.payload];
			} else {
				state.rooms[index] = { ...action.payload, id: new Date().getTime() };
				_rooms = [...state.rooms];
			}
			localStorage.setItem("rooms", JSON.stringify(_rooms));
			state.rooms = _rooms;
		},
		getRooms: (state) => {
			const savedRooms = localStorage.getItem("rooms");
			state.rooms = savedRooms ? JSON.parse(savedRooms) : [];
		},
		sendMessage: (state, action: PayloadAction<MessageType>) => {
			const curMsg = state.currentRoom?.messages ?? [];
			state.currentRoom = {
				...state.currentRoom!,
				messages: [...curMsg, action.payload],
			};
		},
		getMessages: (state, action: PayloadAction<number>) => {
			const _rooms = JSON.parse(localStorage.getItem("rooms") ?? "") ?? [];
			const index = _rooms.findIndex((room: RoomType) => room.id === action.payload);
			state.currentRoom = _rooms[index];
		},
		startNewChat: (state) => {
			state.currentRoom = undefined;
			const savedRooms = localStorage.getItem("rooms");
			state.rooms = savedRooms ? JSON.parse(savedRooms) : [];
		},
	},
	extraReducers: (builder) => {
		builder // *********** Login START *********** \\
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				if (action.payload.status !== 400) {
					localStorage.setItem("dontStoreUserInfoLikeThat", JSON.stringify(action.payload));
					state.user = action.payload.data;
					state.isAuthenticated = true;
					state.message = "User Created Succesfully";
				} else {
					state.message = "Something went wrong!";
					state.error = true;
				}
				state.loading = false;
				// *********** Login END *********** \\
			});
	},
});

export const { logout, createRoom, getRooms, sendMessage, getMessages, startNewChat, setCurrentRoom } = reducer.actions;

export default reducer.reducer;
