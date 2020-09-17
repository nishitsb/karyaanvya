import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://target-tracker-963de.firebaseio.com/'
})

export default instance
