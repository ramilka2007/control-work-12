import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getPhotos} from "../../features/photos/photosThunk.ts";
import {selectPhotos, selectPhotosIsLoading} from "../../features/photos/photosSlice.ts";
import PhotoCard from "../../components/PhotoCard/PhotoCard.tsx";
import Spinner from "../../UI/Spinner/Spinner.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector(selectPhotos);
    const isLoading = useAppSelector(selectPhotosIsLoading)
    useEffect(() => {
        dispatch(getPhotos())
    }, [dispatch])

    return (
        <div className="container">
            {isLoading ? <div className="d-flex justify-content-center"><Spinner /></div> : <>{photos.length > 0 ? (
                <>
                    <h3>Photos:</h3>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gap-5">
                        <>
                            {photos.map((photo) => (
                                <PhotoCard key={photo._id} photo={photo}/>
                            ))}
                        </>
                    </div>
                </>
            ) : <h1 className="text-center">No photos.</h1>}</>}
        </div>
    );
};

export default Home;