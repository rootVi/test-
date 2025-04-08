import axios from "axios";


export const gettoCart = async(userId:any, jwt:any)=>{
    const urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts?filters[userId][$eq]=${userId}&populate[products][populate][images][fields][0]=url`

try {
    const response = await axios.get(urls,{
        headers:{
            Authorization:'Bearer ' + jwt
        }
    })

const data = response.data.data;
const cartItemList = data.map((item:any)=>({

name:item?.products[0]?.name,
quantity: item?.quantity,
amount: item?.amount,
id:item?.documentId,
color:item?.color,
size:item?.size,
product:item?.products[0]?.id,
images:item?.products[0]?.images[0]?.url



}))
return cartItemList;
} 

catch (error) {
    console.log("error",error)
    throw error;
}

}