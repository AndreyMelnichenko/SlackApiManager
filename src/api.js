const axios = require('axios');
const qs = require('querystring');
const FormData = require('form-data');
const apiUrl = 'https://slack.com/api';

const callAPIMethod = async (method, payload) => {
    let data = Object.assign(
        { 
            token: process.env.SLACK_ACCESS_TOKEN,
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        }, 
        payload
    );
    let result = await axios.post(`${apiUrl}/${method}`, qs.stringify(data));
    return result.data;
}

const callGitLab = async () => {
    var data = new FormData();
    data.append('ref', 'main');
    data.append('variables[TAG]', '@ping');
    data.append('variables[TR]', 'false');
    data.append('token', 'TOKEN-HERE');

    var config = {
    method: 'post',
    url: 'https://gitlab.com/api/v4/projects/29126991/trigger/pipeline',
    headers: { 
        ...data.getHeaders()
    },
    data : data
    };

    let result
    try {
        result = await axios(config)
    } catch (error) {
        console.log(a);
        result.data = "Sorry, I've got an error. Can't run CI Job"
    }
    return result.data;

}

module.exports = {
    callAPIMethod, callGitLab
}