import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SingleVideo = () => {
  const location = useLocation();
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Handle errors gracefully

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const videoId = queryParams.get('videoId');
    console.log(videoId); // Do 
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/video/${videoId}`);
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false); // Ensure loading state is always cleared
      }
    };

    fetchVideo();
  }, [location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching video: {error.message}</div>;
  }

  return (
    
    <div>
      <h1>Single Video</h1>
      {video && (
        <>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            <video src={`http://localhost:5000/${video.videoPath}`} controls />
        </>
        )}
      <br />
          <Link to="/">Back to Videos</Link>
    </div>
  );
};

export default SingleVideo;
