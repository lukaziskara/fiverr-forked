// import { Outlet, Link } from "react-router-dom";
// import "./Videos.scss";
// // import Header from "../components/Header";
// // import Footer from "../components/Footer";
// import transcripts from "../../data/scriptsData/videoTranscripts.json";
// import VideoItem from "../../components/videoItem/VideoItem";

// export default function Videos() {
//   console.log(transcripts);
//   return (
//     <div className="container">
//       <div className="videos">
//         {transcripts.map((item) => (
//           <div className="">
//             <VideoItem item={item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import "./MyVideos.scss";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyVideoDatas() {
  const currentUser = getCurrentUser();
  console.log(currentUser);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    refetchOnWindowFocus: false,
    queryFn: () =>
      newRequest.get(`/videodatas?userId=${currentUser._id}`).then((res) => {
        console.log(res.data);
        return res.data;
      }),
  });
  console.log(data);

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/videodatas/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            {currentUser.isSeller && (
              <Link to="/addvideodata">
                <button>ახალი ვიდეოს მონაცემების დამატება</button>
              </Link>
            )}
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig) => (
              <tr key={gig._id}>
                <td>
                  <img className="image" src={gig.cover} alt="" />
                </td>
                <td>
                  <Link to={`/video/${gig._id}`}>{gig.title}</Link>
                </td>
                <td>{gig.price}</td>
                <td>{gig.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="./img/delete.png"
                    alt=""
                    onClick={() => handleDelete(gig._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default MyVideoDatas;
