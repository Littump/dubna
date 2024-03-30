export default interface AddClientDto {
  name: string;
  phone: string;
  birthday?: string;
  connection_address: string;
  client_type: "individual" | "legal";
  status: "connecting" | "active" | "blocked" | "annulled" | "stopped";
}
