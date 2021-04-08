import {API_PATH_NAME} from "./apiPath"
const axios = require('axios');

export default function getNoData( path ){
    try {
        let response = axios({
            method: 'get',
            url: `${API_PATH_NAME}${path}`,
        });
        return response;
    } catch (err) {
        return err
    }
}