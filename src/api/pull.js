import {API_PATH_NAME} from "./apiPath"
const axios = require('axios');

export default function post( path, data){
    try {
        let response = axios({
            method: 'put',
            url: `${API_PATH_NAME}${path}`,
            data: data,
            headers: {
                'Content-Type': data.type,
                'x-amz-acl': 'private',
            }
        });
        console.log("I am not in error");
        return response;
    } catch (err) {
        console.log("I am in error");
        return err
    }
}