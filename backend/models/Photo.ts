import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Photo = mongoose.model('Photo', PhotoSchema);

export default Photo;