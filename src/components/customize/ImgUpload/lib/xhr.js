import axios from 'axios';

export default function (url, headers, data, done, uploading, err) {

    axios({
        method: 'post',
        url: url,
        data: data,
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: function (progressEvent) {
            let rate = progressEvent.loaded / progressEvent.total;
            uploading && uploading(rate);
        },
    }).then(res => {
        done && done(res.data);
    }).catch(errInfo => {
        err && err(errInfo);
    })
}