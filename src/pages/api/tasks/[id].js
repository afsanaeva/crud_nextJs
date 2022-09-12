import Task from "../../../model/Task";
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
        const tasks = await Task.findById(id);
        if (!task) return res.status(404).json({ msg: "Video doesn't Exists" });
        await runMiddleware(req, res, morgan);
        return res.status(200).json(task);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
    case "POST":
      try {
        const newTask = new Task(body);
        const savedTask = await newTask.save();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(savedTask);
      } catch (err) {
        return res.status(400).json({ msg: err.message });
      }
  }
};
