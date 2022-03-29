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
      .fire('post', `${BACKEND_URL}/addPost`)
      .send(payload)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  function myPost(id, cb) {
    Agent
      .fire('get', `${BACKEND_URL}/myPost/${id}`)
      .query(id)
      .end((err, res) => {
        var error = err || res.error ? ServerError(res) : (res.body && res.body.error) ? ServerError(res) : null;
        if (typeof cb === 'function') return cb(error, res && res.body);
      });
  }
  
  
export default {
    getPost,
    editPost,
    addPost,
    myPost
  }