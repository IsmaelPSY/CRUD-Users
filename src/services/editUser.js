import axios from "axios"

const editUser = async (id,user) => {
    const URL = `https://users-crud1.herokuapp.com/users/${id}/`
    const req = await axios.put(URL,user)
    return req
}
export default editUser