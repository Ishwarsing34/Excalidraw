import axios from "axios"
import { BACKEND_URL } from "../config"


async function  getChats(roomId : string){

    const response =  await axios.get(`${BACKEND_URL}/room/chats/${roomId}`);

    return response.data.messages;
}


export async function chatRoom({id} : {
    id : string
})
{


      const messages = await getChats(id);

       


     
}