import axios from "axios";
import API_URL from "@/config/api.ts";

async function downloadCSV() {
  const response = await axios.get(`${API_URL}clients/file/`, {
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    },
  });

  if (response?.status == 200) {
    const blob = await response.data.blob();
    const download_url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = download_url;
    link.download = "employees";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export default downloadCSV;
