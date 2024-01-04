import { Outlet, Link } from "react-router-dom";
import "./MyVideos.scss";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
import transcripts from "../../data/scriptsData/videoTranscripts.json";
import VideoItem from "../../components/videoItem/VideoItem";

export default function MyVideos() {
  console.log(transcripts);
  return (
    <div className="container">
      <div className="videos">
        {transcripts.map((item) => (
          <div className="">
            <VideoItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
