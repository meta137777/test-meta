import { AUTH_URL } from "@/config/url";

export async function getRefreshToken(): Promise<any> {
  const data = await fetch(`${AUTH_URL}/Auth/Refresh`, {
    method: "get",
    headers: {
      Authorization: JSON.parse(
        String(localStorage.getItem("userToken")) ?? "{}"
      ) as string,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (data) {
    localStorage.setItem("userToken", JSON.stringify(data?.Authorization));
  }

  return data;
}
