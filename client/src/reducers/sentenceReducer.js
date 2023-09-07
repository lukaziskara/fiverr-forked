export const SENTENCE_INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  originalSentence: "",
  translation: "",
  images: [],
  uri: "",
  // desc: "",
  // cat: "",
  // cover: "",
  // shortTitle: "",
  // shortDesc: "",
  // deliveryTime: 0,
  // revisionNumber: 0,
  // features: [],
  // price: 0,
};

export const sentenceReducer = (state, action) => {
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

export const WORDS_INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  words: [],
};

export const wordsReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
  }
};
