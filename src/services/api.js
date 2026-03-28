import axios from 'axios';
const API_URL = "http://localhost:5000/api/auth";
const login = async ({ email, password }) => {
  
  //returns :
  /*
  
  username
  password
  and token especially.

  upon giving
{}email, password}

  */
  
try {
const response = axios.post(API_URL+"/login", {email,password}).then( (res) => {

    console.log(res);

  })

  userData = response.data;

} catch(error) {
  console.log(error);
}
}; //redundan, no use check adminApi.js

export default { login };
