import React from 'react';
import { Photo } from '../../types.ts';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
} from '@mui/material';
import { useAppSelector } from '../../app/hooks.ts';
import { API_URL } from '../../constants.ts';
import NoImage from '../../assets/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
import { selectUser } from '../../features/users/usersSlice.ts';
import DeleteButtonPopUp from "../../UI/DeleteButtonPopUp/DeleteButtonPopUp.tsx";
import ModalToShow from "../../UI/ModalToShow/ModalToShow.tsx";
import {NavLink} from "react-router-dom";

interface Props {
    photo: Photo;
    userId?: string;
}

const PhotoCard: React.FC<Props> = ({
                                        photo,
    userId
                                    }) => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <Card sx={{maxWidth: 400}}>
                <CardHeader
                    avatar={photo.user.googleAccount ? <img
                            src={
                                photo.user.avatar
                            }
                            alt=""
                            width="50px"
                            height="50px"
                            className="rounded-circle ms-2"
                        /> :
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
                    title={<NavLink to={`/photos/user/${photo.user._id}`} className="text-dark">
                        <h4>{photo.user.displayName}</h4></NavLink>}
                />
                <ModalToShow title={photo.title} image={photo.image}/>
                <CardContent>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {photo.title}
                    </Typography>
                </CardContent>
                <div className="mb-3">
                    {user.role === 'admin' || user._id === photo.user._id && (<DeleteButtonPopUp photoId={photo._id} userId={userId}/>)}

                </div>
            </Card>
        </>

    );
};

export default PhotoCard;
