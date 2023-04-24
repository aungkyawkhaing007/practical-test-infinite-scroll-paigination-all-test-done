import api from "..";

export const ListOfCard = async (page) => {
  const res = await api.get(`/cards?pageSize=${page}`);

  return res.data;
};


