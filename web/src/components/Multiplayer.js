import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import GameMulti from "./GameMulti";
import JoinRoom from "./JoinRoom";


function Multiplayer() {
    const [socket, setSocket] = useState(null);
    const [playerNum, setPlayerNum] = useState(null);
    const [roomCode, setRoomCode] = useState(null);
    let location = useLocation();

    useEffect(() => {
        setPlayerNum(null)
        setRoomCode(null)
        setSocket(null)

        const s = io()
        s.on('connect', () => {
            console.log(`your id: ${s.id}`)
            setSocket(s);
        })

        s.on('init', (playerNum, roomName) => {
            setRoomCode(roomName);
            setPlayerNum(playerNum);
        })
        return () => s.disconnect();
    }, [location.key]);

    return (
        <>
            {!roomCode && (socket ? <JoinRoom socket={socket} setPlayerNum={setPlayerNum} setRoom={setRoomCode} /> : <p>Loading...</p>)}
            {roomCode && <GameMulti socket={socket} playerNum={playerNum} roomCode={roomCode} gridSize={4} />}
        </>
    )
}

export default Multiplayer;