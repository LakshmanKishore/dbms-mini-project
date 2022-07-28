import axios from "axios";

export default axios.create({
  baseURL: "https://mini-server.run-ap-south1.goorm.io/",
  headers: {
    "Content-type": "application/json"
  }
});