import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../components/ChatRoom";

async function getRoomId(slug: string) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/rooms/room/${slug}`
    );
    // console.log( "this is response "  , response)
    return response.data.roomId;
  } catch {
    return null;
  }
}



export default async function ChatRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const roomId = await getRoomId(slug);

  if (!roomId) {
    return <div>Room not found</div>;
  }



  
  return (
    <div>
      <h2>Room: {slug}</h2>

      <ChatRoom
        id={roomId}
      
      />
    </div>
  );
}