import axios from "axios";

export async function createNotification(title:string, description:string, category:string) {
    await axios.post('http://localhost:8600/api/social/notifications', {title, description, category}, {headers:{"Content-Type":"application/json"}, withCredentials:true});
}