import { Schema, model,models } from "mongoose";

const VideoSchema =new Schema(
    {
        title:{
            type:String,
            require:[true, "The video title is required"],
            unique: true,
            trim:true,
            maxlength:[40, "title cannot be greater than 40 characters"],

        },
        
        link:{
            type:String,
            require:[true, "The video link is required"],
            trim:true,
            maxlength:[350, "link cannot be greater than 40 characters"],

        },
        
    },
    {
        timestamps:true,
        versionKey:false
    }
);
export default models.Video || model("Video",VideoSchema);