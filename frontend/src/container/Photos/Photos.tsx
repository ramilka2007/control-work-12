import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getUserPhotos} from "../../features/photos/photosThunk.ts";
import {selectUserPhotos} from "../../features/photos/photosSlice.ts";
import PhotoCard from "../../components/PhotoCard/PhotoCard.tsx";
import {useParams} from "react-router-dom";

const Photos = () => {
    const {id} = useParams() as {id: string};
    const dispatch = useAppDispatch();
    const photos = useAppSelector(selectUserPhotos);

    useEffect(() => {
        dispatch(getUserPhotos(id))
    }, [dispatch]);
    return photos && (
        <div className="container">
            {photos.length > 0 ? (
                <>
                    <h3>{photos[0].user.displayName} photos:</h3>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
                        <>
                            {photos.map((photo) => (
                                <PhotoCard key={photo._id + photo.user._id} photo={photo} homePage={false}/>
                            ))}
                        </>
                    </div>
                </>
            ) : <h1 className="text-center">No photos.</h1>}
        </div>
    )
};

export default Photos;