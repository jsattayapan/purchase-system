import axios from 'axios';
import {ipAddress, tunitServer} from './constants';

const getItems = (callback) => {
  makeGetRequest('items', res => callback(res))
}
const submitPr = (data, callback) => {
  makePostRequest('pr/new', data, res => callback(res))
}

function makePostRequest(route, data, callback){
  axios.post(`${ipAddress}/${route}`, data).then(res => {
     callback(res.data)
  }).catch(e => {
    console.log(e);
    callback({status: false, msg: 'ไม่สามารถเชื่อมต่อ Server ได้'})
  })
}

function makeGetRequest(route, callback){
  axios.get(`${ipAddress}/${route}`).then(res => {
     callback(res.data)
  }).catch(e => {
    console.log(e);
    callback({status: false, msg: 'ไม่สามารถเชื่อมต่อ Server ได้'})
  })
}


export default {getItems, submitPr}
