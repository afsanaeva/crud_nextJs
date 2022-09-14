import Video from "../../../model/Video";
import { dbConnect, runMiddleware } from "../../../utils/index";
import Morgan from "morgan";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;
  const morgan = Morgan("dev");

  switch (method) {
    case "GET":
      try {
        const video = await Video.findById(id);
        if (!video) return res.status(404).json({ msg: "Video doesn't Exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(video);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }

      case "DELETE":
        try {
          const deletedVideo = await Video.findByIdAndDelete(id);
          if(!deletedVideo)
          return res.status(400).json({ msg: "Video doesn't exists"});
          await runMiddleware(req, res, morgan);
          return res.status(200).json();
        } catch (err) {
          return res.status(400).json({ msg: err.message });
        }

        case "PUT":
          try {
            const updatedVideo = await Video.findByIdAndUpdate(id, body,{
              new:true,
              runValidators:true,
            });
            if(!updatedVideo)
            return  res.status(404).json({ msg: "Video doesn't exists"});
            return res.status(200).json(updatedVideo);
          } catch (err) {
            return res.status(400).json({ msg: err.message });
          }
          default:
            return  res.status(404).json({ msg: "This method doesn't exists"});
  }
};
