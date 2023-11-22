import { api } from "../route/axiosConfig";
import { CURRENT_API_URL } from "../config";
import { BOOK_INF_API_ROUTE } from "../utilis/utiliCommon";

const BookInfoAPI = {
  index: async (params) => {
    const data = await api
      .get(`${CURRENT_API_URL}${BOOK_INF_API_ROUTE}`, {
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
      console.log('show id', id);
      const data = await api
        .get(`${CURRENT_API_URL}${BOOK_INF_API_ROUTE}/${id}`)
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
    const result = await api.post(`${CURRENT_API_URL}${BOOK_INF_API_ROUTE}`, data)
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
    const result = await api.put(`${CURRENT_API_URL}${BOOK_INF_API_ROUTE}/${data.id}`, data)
      .then((res) => {
        const { data } = res.data;
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return result;
  }

};

export default BookInfoAPI;