import React, { useEffect, useRef, useState } from "react";
import "./Sentences.scss";
import SentenceCard from "../../components/sentenceCard/SentenceCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Sentences() {
  // const [sort, setSort] = useState("sales");
  // const [open, setOpen] = useState(false);
  // const minRef = useRef();
  // const maxRef = useRef();

  // const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["sentences"],
    queryFn: () =>
      newRequest
        .get(
          // `/gigs`
          `/sentences`
        )
        .then((res) => {
          return res.data;
        }),
  });
  // console.log(data);

  // const reSort = (type) => {
  //   setSort(type);
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   refetch();
  // }, [sort]);

  // const apply = () => {
  //   refetch();
  // };

  return (
    <div className=""></div>
    // <div className="gigs">
    //   <div className="container">
    //     <div className="cards">
    //       {isLoading
    //         ? "loading"
    //         : error
    //         ? "Something went wrong!"
    //         : data.map((gig) => <SentenceCard key={gig._id} item={gig} />)}
    //     </div>
    // {/* {data.map((gig) => (
    //   <SentenceCard key={gig._id} item={gig} />
    // ))} */}

    //     {/* <span className="breadcrumbs">Liverr Graphics & Design</span>
    //     <h1>AI Artists</h1>
    //     <p>
    //       Explore the boundaries of art and technology with Liverr's AI artists
    //     </p>
    //     <div className="menu">
    //       <div className="left">
    //         <span>Budget</span>
    //         <input ref={minRef} type="number" placeholder="min" />
    //         <input ref={maxRef} type="number" placeholder="max" />
    //         <button onClick={apply}>Apply</button>
    //       </div>
    //       <div className="right">
    //         <span className="sortBy">Sort by</span>
    //         <span className="sortType">
    //           {sort === "sales" ? "Best Selling" : "Newest"}
    //         </span>
    //         <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
    //         {open && (
    //           <div className="rightMenu">
    //             {sort === "sales" ? (
    //               <span onClick={() => reSort("createdAt")}>Newest</span>
    //             ) : (
    //               <span onClick={() => reSort("sales")}>Best Selling</span>
    //             )}
    //             <span onClick={() => reSort("sales")}>Popular</span>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div className="cards">
    //       {isLoading
    //         ? "loading"
    //         : error
    //         ? "Something went wrong!"
    //         : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
    //     </div> */}
    //   </div>
    // </div>
  );
}

export default Sentences;
