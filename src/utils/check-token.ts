import { getRefreshToken } from "@/apis/authentication@";
import { checkExistWindow, parseJwt } from ".";
import httpService from "@/services/http-service";
import { AUTH_URL } from "@/config/url";

async function refresh() {
  const res = await getRefreshToken();
}

export const checkToken = () => {
  let userToken =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}");

  if (userToken) {
    const { exp } = parseJwt(userToken);
    const tokenTimestamp = new Date(exp * 1000); // convert to milliseconds
    const currentTimestamp = new Date(); // current timestamp
    const diffMs = tokenTimestamp.getTime() - currentTimestamp.getTime(); // difference in milliseconds
    const diffMin = Math.round(diffMs / (1000 * 60)); // difference in minutes

    if (diffMin <= 10 && diffMin > 0) {
      refresh();
    } else if (diffMin < 1) {
      window.localStorage.removeItem("userToken");
      window.localStorage.removeItem("userInfo");
      window.localStorage.removeItem("phone_number");
      window.location.href = "/";
    }
  }
};
