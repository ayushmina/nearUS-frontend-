import Agent from "./superAgent";
import config from '../config/configg';
import { ServerError } from '../utils/helpers';
const BACKEND_URL = config.BACKEND_URL;

function getPost(payload, cb) {
    Agent
      .fire('get', `${BACKEND_URL}/getPost`)
      .query(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function editPost(payload, id, cb) {
    Agent
      .fire('post', `${BACKEND_URL}/editPost/${id}`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function addPost(payload,cb) {
    Agent
      .fire('post', `${BACKEND_URL}/users/postJob`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function myPost(cb) {
    Agent
      .fire('get', `${BACKEND_URL}/users//ownJob`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function Search(payload,cb) {
    Agent
      .fire('get', `${BACKEND_URL}/users/searchJobs/${payload}`)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  
  
export default {
    getPost,
    editPost,
    addPost,
    myPost,
    Search
  }