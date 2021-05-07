import {API_PATH_NAME} from "./apiPath"
const axios = require('axios');

export default async function postToken( path, data , token ){
    try {
        let response = await axios({
            method: 'post',
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