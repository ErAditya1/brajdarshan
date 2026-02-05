// models/Place.ts
import mongoose, { Schema, Document } from "mongoose";

const TimingSeasonSchema = new Schema(
    {
        season: {
            type: String,
            required: true, // Summer / Winter
            trim: true,
        },
        validFrom: {
            type: String, // Post-Holi, Post-Diwali
            trim: true,
        },
        rows: {
            type: [String], // free-text rows
            default: [],
        },
    },
    { _id: false }
);

const HowToReachSchema = new Schema(
    {
        byRoad: { type: String, trim: true },
        byRail: { type: String, trim: true },
        byAir: { type: String, trim: true },
        localTransport: { type: String, trim: true },
    },
    { _id: false }
);
const ImportantTipsSchema = {
    type: [String],
    default: [],
};

export interface IPlace extends Document {
    name: string;
    slug: string;
    author?: mongoose.Types.ObjectId;
    type: "Temple" | "Ghat" | "Forest" | "Pilgrimage";
    location: string;

    geo: {
        lat: number;
        lng: number;
    };

    image: {
        imageFileId: string;
        url: string;
    };




    description: string;
    history: string;

    timings: {
        season: string;
        validFrom?: string;
        rows: string[];
    }[];

    importantTips: string[];

    howToReach: {
        byRoad?: string;
        byRail?: string;
        byAir?: string;
        localTransport?: string;
    };

    rating: number;
    reviews: number;

    status: "draft" | "published"|"archived";

    createdAt: Date;
    updatedAt: Date;
}


const PlaceSchema = new Schema<IPlace>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required:true
                },

        type: {
            type: String,
            enum: ["Temple", "Ghat", "Forest", "Pilgrimage"],
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        geo: {
            lat: { type: Number, required: false },
            lng: { type: Number, required: false },
        },

        image: {
            url: {
                type: String,
                required: true
            },
            imageFileId: {
                type: String,
                required: true
            },
        },



        description: {
            type: String,
            required: true,
        },

        history: {
            type: String,

        },

        timings: {
            type: [TimingSeasonSchema],
            default: [],
        },

        importantTips: ImportantTipsSchema,

        howToReach: HowToReachSchema,

        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },

        reviews: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["draft", "published",'archived'],
            default: "draft",
        },
    },
    {
        timestamps: true,
    }
);

PlaceSchema.index({ slug: 1 });
PlaceSchema.index({ type: 1 });
PlaceSchema.index({ status: 1 });
PlaceSchema.index({ location: 1 });

const Place =
    mongoose.models.Place || mongoose.model<IPlace>("Place", PlaceSchema);

export default Place;
