import axios from "axios";
import API_URL from "@/config/api.ts";
import AddClientDto from "@/modules/ClientList/types/addClient.dto.ts";

class clientListService {
  async getClients() {
    return axios.get(`${API_URL}clients/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async addClient(body: AddClientDto) {
    return axios.post(
      `${API_URL}clients/`,
      { ...body, status: "active" },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      },
    );
  }
  async deleteClient(id: number) {
    return axios.delete(`${API_URL}clients/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new clientListService();
