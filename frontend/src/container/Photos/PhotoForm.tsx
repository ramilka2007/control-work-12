import React, { useState } from 'react';
import FileInput from '../../UI/FileInput/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { PhotoForm } from '../../types.ts';
import { addPhoto } from '../../features/photos/photosThunk.ts';
import { selectPhotosAddLoading } from '../../features/photos/photosSlice.ts';

const PhotoForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newPhoto, setNewPhoto] = useState<PhotoForm>({
    title: '',
    image: null,
  });
  const addLoading = useAppSelector(selectPhotosAddLoading);

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await dispatch(addPhoto(newPhoto));
    navigate('/');
  };

  const changeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setNewPhoto((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setNewPhoto((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="container">
      <form onSubmit={onFormSubmit} className="w-50 mx-auto">
        <h2 className="text-center my-4">Create new item card</h2>
        <div className="mb-3 mx-auto">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            className="form-control"
            value={newPhoto.title}
            onChange={changeForm}
          />
        </div>
        <Grid item>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <LoadingButton
          type="submit"
          className="btn btn-primary mt-3"
          disabled={newPhoto.image === null || newPhoto.title === ''}
          loading={addLoading}
        >
          Create
        </LoadingButton>
      </form>
    </div>
  );
};

export default PhotoForm;
