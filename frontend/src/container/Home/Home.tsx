import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getPhotos} from "../../features/photos/photosThunk.ts";
import {selectPhotos} from "../../features/photos/photosSlice.ts";
import PhotoCard from "../../components/PhotoCard/PhotoCard.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector(selectPhotos);
    console.log(photos)
    useEffect(() => {
        dispatch(getPhotos())
    }, [])

    return (
        <div className="container">
            {photos.length > 0 ? (
                <>
                    <h3>Photos:</h3>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
                        <>
                            {photos.map((photo) => (
                                <PhotoCard key={photo._id} photo={photo} homePage={true}/>
                            ))}
                        </>
                    </div>
                </>
            ) : <h1 className="text-center">No photos.</h1>}
        </div>
    );
};

export default Home;