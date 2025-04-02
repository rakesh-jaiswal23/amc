import BenefitsClient from "./banefitsClient";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import config from "../config/config";

export default async function Benefits() {
  let benefitData = [];

  try {
    const res = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_BENEFITS}${LOGIN_TYPE.EMPLOYER}`
    );
    if (res.ok) {
      benefitData = await res.json();
    } else {
      console.error("Error fetching benefit data:", res.statusText);
    }
  } catch (error) {
    console.error("Error fetching benefit data:", error);
  }

  return <BenefitsClient initialData={benefitData} />;
}
