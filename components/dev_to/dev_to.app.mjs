import axios from "@pipedream/platform";

export default {
  type: "app",
  app: "dev_to",
  methods: {
    _getBaseUrl() {
      return "https://dev.to/api";
    },
    _getHeaders() {
      return {
        "Content-Type": "application/json",
        "api-key": `${this.$auth.api_key}`,
      };
    },
    _getAxiosParams(opts = {}) {
      const res = {
        ...opts,
        url: this._getBaseUrl() + opts.path,
        headers: this._getHeaders(),
      };
      return res;
    },
    async _makeRequest(opts) {
      return axios(this._getAxiosParams(opts));
    },
    getArticles({ params }) {
      return this._makeRequest({
        path: "/api/articles",
        params,
      });
    },
    getMyArticles({ params }) {
      return this._makeRequest({
        path: "/articles/me/published",
        params,
      });
    },
  },
};