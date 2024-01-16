
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clickURL, setClickURL] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5000/videos");
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("clickURL", clickURL);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      console.log(data);

      // Clear the form fields
      setTitle("");
      setDescription("");
      setClickURL("");
      setFile(null);

      // Fetch the updated list of videos
      fetchVideos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Video Upload</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Click URL"
        value={clickURL}
        onChange={(e) => setClickURL(e.target.value)}
      />
      <br />
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload Video</button>

      <h2>Uploaded Videos</h2>
      {videos?.map((video) => (
        <div key={video._id}>
            <Link to={`/video/?videoId=${video.id}`}>
          <h3>Video: {video.title} </h3>
          <video preload="metadata" style={{heigth:150,width:150}} 
          src={`http://localhost:5000/${video.videoPath}#t=0.1`} >

          </video>
          <br />View Video</Link>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default VideoList;
