import axios from "axios";

export const DeleteToCart = async(id: any, jwt: any) => {

    // URL'yi dinamik id'yle oluşturuyoruz.
    const Urls = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts/${id}`;

    try {
        // Silme isteği gönderiyoruz
        const response = await axios.delete(Urls, {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        });
        
        return response.data; // Başarılı yanıtı geri döndürüyoruz
    } catch (error) {
        console.log("error", error); // Hata durumunda hata mesajını yazdırıyoruz
        throw error; // Hata fırlatıyoruz
    }
}