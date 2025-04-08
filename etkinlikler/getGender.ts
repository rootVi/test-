import { Gender } from "@/constans/type"
import axios from "axios"

const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/genders?populate*`

export const getGender = async():Promise<Gender[]>=>{
    const res = await axios.get<{ data: Gender[] }>(Urls); 
  return res.data.data; 


}
