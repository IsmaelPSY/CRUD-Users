import axios from "axios";

const getAllUsers = async ()=>{
    const URL = 'https://users-crud1.herokuapp.com/users/';
    const req = await axios.get(URL);
    return req;    
}
export default getAllUsers;