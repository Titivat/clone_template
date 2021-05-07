const axios = require('axios');

export default async function putToDigitalOcean( path, data){
    try {
        let response = await axios({
            method: 'put',
            url: `${path}`,
            data: data,
            headers: {
                'Content-Type': data.type,
                //'x-amz-acl': 'public-read',
                'x-amz-acl': 'private',
            }
        });
        return response;
    } catch (err) {
        return err
    }
}