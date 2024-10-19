import React, {useEffect, useState} from 'react';
import { Photo } from '../../types.ts';
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { API_URL } from '../../constants.ts';
import NoImage from '../../assets/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
import { selectUser } from '../../features/users/usersSlice.ts';
import { NavLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import Modal from "../../UI/Modal/Modal.tsx";

interface Props {
    photo: Photo;
    photoDelete: (id: string) => void;
    photoPublish: (id: string) => void;
}

const PhotoCard: React.FC<Props> = ({
                                           photo,
                                           photoDelete,
                                           photoPublish,
                                       }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {}, [dispatch]);
    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <img
                            src={
                                photo.user.avatar
                                    ? API_URL + '/' + photo.user.avatar
                                    : NoImage
                            }
                            alt=""
                            width="50px"
                            height="50px"
                            className="rounded-circle ms-2"
                        />
                    }
                    title={photo.user.displayName}
                    subheader={
                        photo.isPublished ? null : "Photo hasn't published yet."
                    }
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={photo.image ? API_URL + '/' + photo.image : NoImage}
                    alt=""
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {photo.title}
                    </Typography>
                </CardContent>
            {user.role === 'admin' && (
                <div className="mb-3">
                    <LoadingButton
                        className="btn btn-danger me-2"
                        onClick={() => photoDelete(photo._id)}
                    >
                        Delete
                    </LoadingButton>

                    <LoadingButton
                        className="btn btn-primary"
                        onClick={() => photoPublish(photo._id)}
                    >
                        {photo.isPublished ? <>Unpublish</> : <>Publish</>}
                    </LoadingButton>
                </div>
            )}
        </Card>
            <Modal show={showModal} title="Order" onClose={() => setShowModal(false)}>
                <div className="modal-body">
                    <img src={photo.image} alt=""/>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-danger"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </>

    );
};

export default PhotoCard;
