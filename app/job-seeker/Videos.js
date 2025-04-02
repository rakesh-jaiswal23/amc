import VideosClient from "./VideosClient";
import config from "@/app/config/config";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";

export default async function Videos({ role = 1 }) {
  let videoData = [];

  try {
    const res = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_VIDEOS}${role}`
    );
    if (res.ok) {
      videoData = await res.json();
    } else {
      console.error("Error fetching video data:", res.statusText);
    }
  } catch (error) {
    console.error("Error fetching video data:", error);
  }

  return <VideosClient role={role} initialData={videoData} />;
}
