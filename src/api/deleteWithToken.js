import {API_PATH_NAME} from "./apiPath"
const axios = require('axios');

export default function deleteWithToken( path , token){
    try {
        let response = axios({
            method: 'delete',
            url: `${API_PATH_NAME}${path}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (err) {
        return err
    }
}