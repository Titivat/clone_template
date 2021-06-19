import {API_PATH_NAME} from "./apiPath"
const axios = require('axios');

export default async function putWIthToken( path, data , token ){
    try {
        let response = await axios({
            method: 'put',
            url: `${API_PATH_NAME}${path}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (err) {
        return err
    }
}