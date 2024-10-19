import { createSlice } from '@reduxjs/toolkit';
import {Photo} from "../../types.ts";
import {addPhoto, deletePhoto, getPhotos, getUserPhotos} from "./photosThunk.ts";

interface photosState {
    photos: Photo[];
    userPhotos: Photo[];
    isLoading: boolean;
    addLoading: boolean;
    deleteLoading: boolean;
    isError: boolean;
}

const initialState: photosState = {
    photos: [],
    userPhotos: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    isError: false,
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPhotos.pending, (state) => {
                state.addLoading = true;
                state.isError = false;
            })
            .addCase(getPhotos.fulfilled, (state, { payload: photos }) => {
                state.addLoading = false;
                state.photos = photos
            })
            .addCase(getPhotos.rejected, (state) => {
                state.addLoading = false;
                state.isError = true;
            });

        builder
            .addCase(getUserPhotos.pending, (state) => {
                state.addLoading = true;
                state.isError = false;
            })
            .addCase(getUserPhotos.fulfilled, (state, { payload: photos }) => {
                state.addLoading = false;
                state.userPhotos = photos;
            })
            .addCase(getUserPhotos.rejected, (state) => {
                state.addLoading = false;
                state.isError = true;
            });

        builder
            .addCase(addPhoto.pending, (state) => {
                state.addLoading = true;
                state.isError = false;
            })
            .addCase(addPhoto.fulfilled, (state) => {
                state.addLoading = false;
                state.isError = false;
            })
            .addCase(addPhoto.rejected, (state) => {
                state.addLoading = false;
                state.isError = true;
            });

        builder
            .addCase(deletePhoto.pending, (state) => {
                state.deleteLoading = true;
                state.isError = false;
            })
            .addCase(deletePhoto.fulfilled, (state) => {
                state.deleteLoading = false;
                state.isError = false;
            })
            .addCase(deletePhoto.rejected, (state) => {
                state.deleteLoading = false;
                state.isError = true;
            });
    },
    selectors: {
        selectPhotos: (state) => state.photos,
        selectUserPhotos: (state) => state.userPhotos,
        selectPhotosIsLoading: (state) => state.isLoading,
        selectPhotosAddLoading: (state) => state.addLoading,
        selectPhotosDeleteLoading: (state) => state.deleteLoading,
    },
});

export const photosReducer = photosSlice.reducer;

export const {
    selectPhotos,
    selectUserPhotos,
    selectPhotosIsLoading,
    selectPhotosAddLoading,
    selectPhotosDeleteLoading
} = photosSlice.selectors;
