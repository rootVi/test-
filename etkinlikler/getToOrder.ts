import axios from "axios";

export const getToOrder = async(userId:any, jwt:any)=>{
    const urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/orders?filters[userId][$eq]=${userId}&populate[OrderItemList][populate][product][populate][images][fields][0]=url`

try {
    const response = await axios.get(urls,{
        headers:{
            Authorization:'Bearer ' + jwt
        }
    })

const data = response.data.data;
const orderList = data.map((item:any)=>({
    id:item?.id,
subtotal:item.subtotal,
paymentText:item.paymentText,
orderItemList:item.OrderItemList,
createdAt:item.createdAt,

}))
return orderList;
} 

catch (error) {
    console.log("error",error)
    throw error;
}

}