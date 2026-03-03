import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

function SermonVideos() {
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiGet("/sermons")
      .then((data) => {
        setVideos(data.items || []);
        setMessage("");
      })
      .catch((error) => {
        setVideos([]);
        setMessage(error.message || "Could not load sermon videos.");
      });
  }, []);

  return (
    <section className="card">
      <h2>Sermon Videos</h2>
      {message ? <p className="status status-error">{message}</p> : null}
      {videos.length === 0 ? <p>No sermon videos available.</p> : null}
      <div className="video-grid">
        {videos.map((video) => (
          <article className="video-card" key={video.id}>
            <div className="video-frame">
              <iframe
                src={video.videoUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <h3>{video.title}</h3>
            <p>{video.preacher}</p>
            <small>{video.date}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SermonVideos;
