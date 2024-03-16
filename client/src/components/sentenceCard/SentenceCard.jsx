import React from "react";
import "./SentenceCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const SentenceCard = ({ item }) => {
  // console.log(item);
  // const { isLoading, error, data } = useQuery({
  //   queryKey: [item.userId],
  //   queryFn: () =>
  //     newRequest.get(`/users/${item.userId}`).then((res) => {
  //       return res.data;
  //     }),
  // });
  const image1 = "game_photos/სიტუაციები/";
  const image2 = `game_photos/${item.picture}1.jpg`;
  return (
    <div className="sentenceCard">
      {/* <img src={image2} alt="" /> */}
      <div className="data">
        <div className="">{item.sentence}</div>
        {/* <span className="test">aაა̄</span> */}
        <div className="">{item.translation}</div>
      </div>
      <Link to={`/sentence/${item._id}`} className="link">
        edit
      </Link>
    </div>
    // <Link to={`/gig/${item._id}`} className="link">
    //   <div className="gigCard">
    //     <img src={item.cover} alt="" />
    //     <div className="info">
    //       {isLoading ? (
    //         "loading"
    //       ) : error ? (
    //         "Something went wrong!"
    //       ) : (
    //         <div className="user">
    //           <img src={data.img || "/img/noavatar.jpg"} alt="" />
    //           <span>{data.username}</span>
    //         </div>
    //       )}
    //       <span>{item.title}</span>
    //       <p>{item.desc}</p>
    //       <div className="star">
    //         <img src="./img/star.png" alt="" />
    //         <span>
    //           {!isNaN(item.totalStars / item.starNumber) &&
    //             Math.round(item.totalStars / item.starNumber)}
    //         </span>
    //       </div>
    //     </div>
    //     <hr />
    //     <div className="detail">
    //       <img src="./img/heart.png" alt="" />
    //       <div className="price">
    //         <span>STARTING AT</span>
    //         <h2>$ {item.price}</h2>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  );
};

export default SentenceCard;
