import axios from "axios"

const Requestbase = axios.create({
    baseURL : "http://localhost:5000/"
})

export default Requestbase