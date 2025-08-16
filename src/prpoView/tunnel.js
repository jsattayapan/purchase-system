import axios from 'axios';
import {ipAddress, tunitServer} from './../constants';

const getItems = (callback) => {
  makeGetRequest('items', res => callback(res))
}
const getPr = (callback) => {
  makeGetRequest('pr', res => callback(res))
}
const submitPr = (data, callback) => {
  makePostRequest('pr/new', data, res => callback(res))
}

const getPrById = (id, callback) => {
  makePostRequest('pr', {id}, res => callback(res))
}

const editPrItemList = (data, callback) => {
  makePostRequest('pr/editItemList', data, res => callback(res))
}

const cancelPr = (id, callback) => {
  makePostRequest('pr-delete', {id}, res => callback(res))
}


const makePoWithApproveFile = (data, callback) => {
  const formData = new FormData();
  formData.append('poId', data.purchaseId);
  formData.append('vat', data.vat)
  formData.append('total', data.total)
  formData.append('file', data.file);
  makePostRequest('makePoWithApproveFile', formData, res => callback(res))
}

const addExpenseToPurchase = (data, callback) => {
  makePostRequest('addExpenseToPurchase', data, res => callback(res))
}


const updatePurchaseItemVat = (data, callback) => {
  makePostRequest('pr/item/vat/update', data, res => callback(res))
}


const deleteExpense = (data, callback) => {
  makePostRequest('deleteExpense', data, res => callback(res))
}

const addDiscount = (data, callback) => {
  makePostRequest('pr/discount/add', data, res => callback(res))
}

const removeDiscount = (data, callback) => {
  makePostRequest('pr/discount/remove', data, res => callback(res))
}


const updateAllPurchaseItemVat = (data, callback) => {
  makePostRequest('pr/item/all/vat/update', data, res => callback(res))
}


const updatePurchaseIncludeVat = (data, callback) => {
  makePostRequest('pr/includeVat/update', data, res => callback(res))
}

const updatePurchaseStatus = (data, callback) => {
  makePostRequest('pr/status/update', data, res => callback(res))
}

const updatePurchaseSellerId = (data, callback) => {
  makePostRequest('pr/sellerId/update', data, res => callback(res))
}


const updatePurchasePaymentType = (data, callback) => {
  makePostRequest('pr/paymentType/update', data, res => callback(res))
}

const updatePurchaseProperty = (data, callback) => {
  makePostRequest('pr/property/update', data, res => callback(res))
}


const updatePurchaseIssueDate = (data, callback) => {
  makePostRequest('pr/issueDate/update', data, res => callback(res))
}

const updatePurchaseRemark = (data, callback) => {
  makePostRequest('pr/remark/update', data, res => callback(res))
}

const updatePurchaseReference = (data, callback) => {
  makePostRequest('pr/reference/update', data, res => callback(res))
}

const submitNewSeller = (data, callback) => {
  makePostRequest('submitNewSeller', data, res => callback(res))
}

const getSellers = (callback) => {
  makeGetRequest('getSellers', res => callback(res))
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


export default {
  makePoWithApproveFile,
  updatePurchaseRemark,
  updatePurchaseReference,
  updatePurchaseIssueDate,
  updatePurchaseProperty,
  submitNewSeller,
  updatePurchasePaymentType,
  updatePurchaseSellerId,
  getSellers,
  updatePurchaseStatus,
  updatePurchaseIncludeVat,
  updateAllPurchaseItemVat,
  updatePurchaseItemVat,
  getItems, submitPr, getPr, getPrById, editPrItemList, cancelPr, addExpenseToPurchase, deleteExpense, addDiscount, removeDiscount}
