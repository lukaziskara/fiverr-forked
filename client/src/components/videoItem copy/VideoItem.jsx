import { Link } from "react-router-dom";
import "./VideoItem.scss";
export default function VideoItem(props) {
  const { title, videoUrl, id } = props.item;
  console.log(props);
  return (
    <Link to={`/videos/${id}`} className="link">
      <div className="video-item">
        <h1>{title}</h1>
      </div>
    </Link>
  );
}
