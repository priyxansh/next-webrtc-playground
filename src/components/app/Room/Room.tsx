"use client";

import { Button } from "@/components/ui/button";
import { useSocket } from "@/providers/SocketProvider";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
// import { peerConnection } from "@/utils/peer";

type RoomProps = {};

const Room = ({}: RoomProps) => {
  const { socket } = useSocket();

  const [myStream, setMyStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [remoteSocketId, setRemoteSocketId] = useState<string>();

  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>(
    () => {
      const rtcpeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: ["stun:stun.l.google.com:19302"],
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "webrtc@live.com",
            credential: "muazkh",
          },
        ],
      });

      return rtcpeerConnection;
    }
  );

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        setMyStream(stream);
      });
  }, []);

  const handleUserJoined = async ({
    userId,
    socketId,
  }: {
    userId: string;
    socketId: string;
  }) => {
    setRemoteSocketId(socketId);

    console.log("user joined", userId);
  };

  const handleOffer = async ({
    offer,
    from,
  }: {
    offer: RTCSessionDescriptionInit;
    from: string;
  }) => {
    setRemoteSocketId(from);

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    console.log({ answer, offer, peerConnection });

    socket.emit("answer", {
      answer,
      to: from,
    });
  };

  const handleAnswer = async (data: {
    answer: RTCSessionDescriptionInit;
    from: string;
  }) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setMyStream(stream);

    const { answer, from } = data;

    await peerConnection.setRemoteDescription(answer);

    console.log({ answer, from });

    const tracks = stream?.getTracks();
    // console.log({ tracks, myStream });

    for (const track of tracks!) {
      peerConnection.addTrack(track, stream);
    }
  };

  const handleSocketNegotiationNeeded = async (data: {
    offer: RTCSessionDescriptionInit;
    from: string;
  }) => {
    const { offer, from } = data;

    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit("negotiation-done", {
      answer,
      to: from,
    });
  };

  const handleNegotiationDone = async (data: {
    answer: RTCSessionDescriptionInit;
    from: string;
  }) => {
    const { answer, from } = data;

    await peerConnection.setRemoteDescription(answer);
  };

  useEffect(() => {
    socket.on("user-joined", handleUserJoined);
    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("negotiation-needed", handleSocketNegotiationNeeded);
    socket.on("negotiation-done", handleNegotiationDone);

    return () => {
      socket.off("user-joined", handleUserJoined);
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("negotiation-needed", handleSocketNegotiationNeeded);
      socket.off("negotiation-done", handleNegotiationDone);
    };
  }, [socket]);

  console.log(myStream);

  const handleTrackEvent = (event: RTCTrackEvent) => {
    console.log("track event", event);

    setRemoteStream(event.streams[0]);
  };

  const handleNegotiationNeeded = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit("negotiation-needed", {
      offer,
      to: remoteSocketId,
    });
  };

  useEffect(() => {
    peerConnection.addEventListener("track", handleTrackEvent);
    peerConnection.addEventListener(
      "negotiationneeded",
      handleNegotiationNeeded
    );

    return () => {
      peerConnection.removeEventListener("track", handleTrackEvent);
      peerConnection.removeEventListener(
        "negotiationneeded",
        handleNegotiationNeeded
      );
    };
  }, []);

  const handleStartCall = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit("offer", {
      offer,
      to: remoteSocketId,
    });
  };

  const sendStream = async () => {
    const tracks = myStream?.getTracks();
    // console.log({ tracks, myStream });

    for (const track of tracks!) {
      peerConnection.addTrack(track, myStream!);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Button onClick={() => handleStartCall()}>Start Call</Button>
        <p>Users: {remoteSocketId}</p>
        {myStream ? <Button onClick={sendStream}>Send stream</Button> : null}
        {myStream ? (
          <ReactPlayer
            url={myStream}
            playing
            muted
            width="100%"
            height="auto"
          />
        ) : null}

        {remoteStream ? (
          <div className="test">
            <ReactPlayer
              url={remoteStream}
              playing
              width="100%"
              height="auto"
            />
          </div>
        ) : (
          <span>No remote stream yet</span>
        )}
      </div>
    </div>
  );
};

export default Room;
