import mongoose, { models } from "mongoose";

export const VIDEO_DIMENTIONS ={
    width: 1080,
    height: 1920 
}

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    contrls?: boolean;
    transformation?:{
        width: number;
        height: number;
    }
    author: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;

}

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },
    contrls: {
        type: Boolean,
        default: true
    },
    transformation: {
        height:{
            type: Number,
            default: VIDEO_DIMENTIONS.height,
        },
        width:{
            type: Number,
            default: VIDEO_DIMENTIONS.width,
        },
        quality: {
            type: Number,
            default: 75,
            min: 10,
            max: 100
        }
    },
    
    author:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Video = models?.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;