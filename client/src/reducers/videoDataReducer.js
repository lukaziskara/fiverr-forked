export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  shortTitle: "",
  desc: [],
  shortDesc: "",
  images: [],
  features: [],
  // cat: "",
  // cover: "",
  // deliveryTime: 0,
  // revisionNumber: 0,
  // price: 0,
};

export const videoDataReducer = (state, action) => {
  // console.log(state,action)
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    default:
      return state;
  }
};
