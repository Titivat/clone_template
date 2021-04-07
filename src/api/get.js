import {API_PATH_NAME} from "./apiPath"
const axios = require('axios');

export default function get( path, data){
    try {
        let response = axios({
            method: 'get',
            url: `${API_PATH_NAME}${path}`,
            data: data,
        });
        return response;
    } catch (err) {
        return err
    }
}