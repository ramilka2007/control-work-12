import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const getPhotos = createAsyncThunk('photos/get-all', async () => {
    const { data: photos } = await axiosApi.get(`/photos`);
    return photos ?? [];
});

export const getUserPhotos = createAsyncThunk(
    'photos/get-by-id',
    async (id: string) => {
        const { data: userPhotos } = await axiosApi.get(`/photos/user/${id}`);
        return userPhotos ?? [];
    },
);

export const addPhoto = createAsyncThunk(
    'photos/add-new-photo',
    async (newPhoto) => {
        const data = new FormData();
        data.append('title', newPhoto.title);

        if (newPhoto.image === null) {
           return  console.log('Image is required');
        } else {
            data.append('image', newPhoto.image);
        }

        await axiosApi.post('/photos', data);
    },
);

export const deletePhoto = createAsyncThunk(
    'photos/delete-photo',
    async (id: string) => {
        await axiosApi.delete(`/photos/${id}`);
    },
);
