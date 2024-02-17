import React, { useEffect, useReducer, useState } from "react";
import "./AddVideoData.scss";
import {
  videoDataReducer,
  INITIAL_STATE,
} from "../../reducers/videoDataReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const AddVideoData = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('orange');

  const [state, dispatch] = useReducer(videoDataReducer, INITIAL_STATE);

  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleSubmit = (e) => {
    console.log(e, state);
    e.preventDefault();
    mutation.mutate(state);
    // navigate("/mygigs");
  };
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      // console.log(gig)
      return newRequest.post("/videodatas", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  // const handleUpload = async () => {
  //   setUploading(true);
  //   try {
  //     const cover = await upload(singleFile);

  //     const images = await Promise.all(
  //       [...files].map(async (file) => {
  //         const url = await upload(file);
  //         return url;
  //       })
  //     );
  //     setUploading(false);
  //     dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="add">
      <div className="container">
        <h1>ახალი ვიდეოს მონაცემების დამატება</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">სათაური</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">ვიდეოს Url</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">ენა</label>
            <select
              name="language"
              // value={selectedLanguage} // ...force the select's value to match the state variable...
              onChange={handleChange}
              // onChange={(e) => setSelectedFruit(e.target.value)}
            >
              <option value="english">English</option>
              <option value="español">Español</option>
              <option value="თუშური">თუშური</option>
            </select>
            <label htmlFor="">სუბტიტრები</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">აღწერა</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <div className="tags">
              <label htmlFor="">თეგები</label>
              <form action="" className="add" onSubmit={handleFeature}>
                <input type="text" placeholder="e.g. page design" />
                <button type="submit">add</button>
              </form>
              <div className="addedFeatures">
                {state?.features?.map((f) => (
                  <div className="item">
                    <div key={f}>
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_FEATURE", payload: f })
                        }
                      >
                        {f}
                        <span>X</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleSubmit}>Create</button>
          </div>
          {/* <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option value="design">საჭმელი</option>
              <option value="web">მანქანის ნაწილები</option>
              <option value="animation">სხვა</option>
              <option value="music">Music</option>
            </select> */}
          {/* <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button>
            </div> */}
          {/* <div className="details">
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            
            
            <label htmlFor="">Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AddVideoData;
