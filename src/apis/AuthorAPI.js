import { api } from "../route/axiosConfig";
import { CURRENT_API_URL } from "../config";
import { AUTHOR_ROUTE } from "../utilis/utiliCommon";

const AuthorAPI = {
  index: async (params) => {
    const data = await api
      .get(`${CURRENT_API_URL}${AUTHOR_ROUTE}`, {
        params: params,
      })
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  },
  show: async (params) => {
    const { id } = params;
    if (id) {
      const data = await api
        .get(`${CURRENT_API_URL}${AUTHOR_ROUTE}/${id}`)
        .then((res) => {
          const { data } = res.data;
          return data;
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    }
  },
  create: async (data) => {
    const result = await api.post(`${CURRENT_API_URL}${AUTHOR_ROUTE}`, data)
    .then((res) => {
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
    return result;
  },
  update: async (data) => {
    const result = await api.put(`${CURRENT_API_URL}${AUTHOR_ROUTE}/${data.id}`, data)
    .then((res) => {
      const { data } = res.data;
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
    return result;
  },
  getDataSelect: async (params) => {
    const data = await api
      .get(`${CURRENT_API_URL}${AUTHOR_ROUTE}/select`, {
        params: params,
      })
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  },

};

export default AuthorAPI;