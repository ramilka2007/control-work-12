import express from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import { imagesUpload } from '../multer';
import permit from '../middleware/permit';
import Photo from "../models/Photo";

const photosReducer = express.Router();

photosReducer.get('/', async (req, res, next) => {
    try {
        const userCocktails = req.query.user;
        let cocktail;

        if (userCocktails) {
            cocktail = await Photo.find({ user: userCocktails }).populate('user');
        } else {
            cocktail = await Photo.find().populate('user');
        }
        return res.send(cocktail);
    } catch (error) {
        return next(error);
    }
});

photosReducer.get('/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            res.status(400).send({ error: 'Id params must be in url' });
        }

        const photo = await Photo.findById(req.params.id);
        return res.send(photo);
    } catch (e) {
        return next(e);
    }
});

photosReducer.post(
    '/',
    auth,
    imagesUpload.single('image'),
    async (req: RequestWithUser, res, next) => {
        try {
            if (!req.body.title) {
                res.status(400).send({ error: 'Title is required' });
            }

            if (!req.file) {
                res.status(400).send({ error: 'File is required' });
            }
            const photoData = {
                user: req.user,
                name: req.body.title,
                image: req.file ? req.file.filename : null,
            };

            const photo = new Photo(photoData);
            await photo.save();
            return res.send(photo);
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }

            return next(error);
        }
    },
);

photosReducer.patch(
    '/:id/togglePublished',
    auth,
    permit('admin'),
    async (req: RequestWithUser, res, next) => {
        try {
            if (!req.params.id) {
                res.status(400).send({ error: 'Id items params must be in url' });
            }

            const photo = await Photo.findById(req.params.id);

            if (photo) {
                if (photo.isPublished === true) {
                    await Photo.findByIdAndUpdate(req.params.id, {
                        isPublished: false,
                    });
                } else {
                    await Photo.findByIdAndUpdate(req.params.id, {
                        isPublished: true,
                    });
                }
            }

            return res.send('Item was success updated');
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }

            return next(error);
        }
    },
);

photosReducer.delete(
    '/:id',
    auth,
    async (req: RequestWithUser, res, next) => {
        try {
            if (!req.params.id) {
                res.status(400).send({ error: 'Id items params must be in url' });
            }

            const photo = await Photo.findById(req.params.id);

            if (photo) {
                await Photo.findByIdAndDelete(req.params.id);
                return res.send('Item was success deleted');
            }

            return res.send('Item was not deleted');
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                return res.status(400).send(error);
            }

            return next(error);
        }
    },
);

export default photosReducer;
