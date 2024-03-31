import axios from "axios";
import API_URL from "@/config/api.ts";
import AddClientDto from "@/modules/ClientList/types/addClient.dto.ts";
import AddExpenseDto from "@/modules/Client/types/addExpense.dto.ts";
import AddPaymentDto from "@/modules/Client/types/addPayment.dto.ts";

class clientService {
  async getClient(id: number) {
    return axios.get(`${API_URL}clients/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async updateClient(body: AddClientDto, id: number) {
    return axios.patch(`${API_URL}clients/${id}/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getExpenses(id: number) {
    return axios.get(`${API_URL}clients/${id}/expenses/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async deleteExpense(id: number) {
    return axios.delete(`${API_URL}expenses/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async getPayments(id: number) {
    return axios.get(`${API_URL}clients/${id}/payments/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async addExpense(body: AddExpenseDto) {
    return axios.post(`${API_URL}expenses/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async addPayment(body: AddPaymentDto) {
    return axios.post(`${API_URL}payments/`, body, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
  async deletePayment(id: number) {
    return axios.delete(`${API_URL}payments/${id}/`, {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    });
  }
}

export default new clientService();
