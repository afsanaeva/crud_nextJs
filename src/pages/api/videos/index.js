import Video from "../../../model/Video";
import { dbConnect, runMiddleware } from "../../../utils/index";
import Morgan from "morgan";

dbConnect();

export default async (req,res) => {
    const{method,body} = req;
    const morgan = Morgan("dev");

    switch(method){
        case "GET":
            try {
                const videos = await Video.find();
                await runMiddleware(req,res,morgan);
                return res.status(200).json(videos);
            }catch(err){
                return res.status(400).json({msg:err.message});
            }
    case "POST":
        try{
            const newVideo =new Video(body);
            const savedVideo =await newVideo.save();
            await runMiddleware(req,res,morgan);
            return res.status(200).json(savedVideo); 
        } catch(err){
            return res.status(400).json({msg: err.message}); 
        }
        default:
            return  res.status(404).json({ msg: "This method doesn't exists"});
    }
};