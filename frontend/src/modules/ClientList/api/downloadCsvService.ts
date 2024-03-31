import API_URL from "@/config/api.ts";

export async function downloadCSV() {
  const response = await fetch(`${API_URL}clients/file/`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  });
  if (response.status == 200) {
    const blob = await response.blob();
    const download_url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = download_url;
    link.download = "clients";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
