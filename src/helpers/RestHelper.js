import axios from "axios";

class RestServices {
  axiosInstance = null;
  currToken = null;

  /**
   * @param {string} baseURL
   */
  constructor(baseURL) {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({});
    }

    this.axiosInstance.interceptors.request.use(
      (req) => {
        // Do something before request is sent
        if (this.currToken) {
          req.headers.common.Token = this.currToken;
        } else {
          // "Invalid Token , please login to get a valid token";
          // return Promise.reject(
          //   new Error('Authorization error: The request did not go through')
          // );
        }
        req.headers.common["Content-Type"] = "application/json";
        return req;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }

  /**
   * @param {object} params contains http/https and ip and port
   */
  getURLPrefix({ protocol, host, port }) {
    return `${protocol}://${host}:${port}/`;
  }

  /**
   * @param {string} token
   */
  setToken(token) {
    this.currToken = token;
  }
  /**
   * @param {string} url
   */
  getRequest(url) {
    return this.axiosInstance.get(url);
  }
  /**
   * @param {string} url
   * @param {any} data
   */
  postRequest(url, data) {
    return this.axiosInstance.post(url, data);
  }
  /**
   * @param {string} url
   * @param {any} data
   */
  putRequest(url, data) {
    return this.axiosInstance.put(url, data);
  }
  /**
   * @param {string} url
   */
  deleteRequest(url, data) {
    return this.axiosInstance.delete(url, {
      data: data,
    });
  }
}

let instance = null;

if (!instance) {
  instance = new RestServices();
}

export default instance;
