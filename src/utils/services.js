import axios from 'axios';


const fetchService = async (url) => {
    const fetchedResponse = await axios.get(url)
    if(fetchedResponse.status === 200){
        return fetchedResponse.data
    }
}


export {fetchService}