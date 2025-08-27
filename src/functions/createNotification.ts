import axios from "axios";
import { useBaseApiUrl } from "../hooks/useBaseApiUrl";

export async function createNotification(title:string, description:string, category:string) {
    await axios.post(useBaseApiUrl('/social/notifications'), {title, description, category}, {headers:{"Content-Type":"application/json"}, withCredentials:true});
}