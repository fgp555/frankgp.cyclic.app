const renderMovieCards = require("./renderCards.js");
const axios = require("axios");

// var url = "https://students-api.2.us-1.fl0.io/movies";
var url = "https://api.1rodemayo.com/movies";

// $.get(url, (data, status) => {
//   renderMovieCards(data);
//   console.log(status);
// });

const fetchData = async () => {
  const response = await axios.get(url);
  console.log(response.data);
  renderMovieCards(response.data);
};

fetchData();
