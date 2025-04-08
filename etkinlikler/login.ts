import axios from 'axios'
const adres = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/local`
const loginUser= async(email: string,password: string)=>{

    try {
        const response = await axios.post(adres,{
            identifier:email,
            password:password
        })

        return response.data
    } catch (error) {
        console.log("error",error)
        throw error;
    }
}
export default loginUser