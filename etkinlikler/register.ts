import axios from 'axios'
const adres = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local/register`
const registerUser= async(kullaniciadi: string,email: string,password: string)=>{

    try {
        const response = await axios.post(adres,{
            username:kullaniciadi,
            email:email,
            password:password
        })

        return response.data
    } catch (error) {
        console.log("error",error)
        throw error;
    }
}
export default registerUser