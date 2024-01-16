const NodeLocalstorage = require('node-localstorage').LocalStorage;
const localStorage = new NodeLocalstorage('./scratch');
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("video"), (req, res) => {
  try {
    const { title, description, clickURL } = req.body;
    const videoPath = req.file.path;

    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    const newVideo = {
      id: Date.now(),
      title,
      description,
      clickURL,
      videoPath,
    };
    videos.push(newVideo);
    localStorage.setItem("videos", JSON.stringify(videos));

    res.status(200).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/videos", (req, res) => {
  console.log("Getting the videos");
  try {
    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    const mapVideos = 
    videos.map((video)=>{
      video.videoPath = video.videoPath.replace('public\\','');
      return video;
    })
  
    res.status(200).json(mapVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.get("/video/:videoId", async (req, res) => {
  console.log("Getting a single video");
  console.log(req.params);
  try {
    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    const { videoId } = req.params;

    const video = videos.find((video) => video.id == videoId);

    if (!video) {
     
      res.status(404).json({ message: "Video not found" });
    } else {
      video.videoPath = video.videoPath.replace('public\\','');
      res.json(video);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
