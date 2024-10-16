import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the signaling server

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [roomId, setRoomId] = useState('');
  const [inCall, setInCall] = useState(false);

  const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  };

  useEffect(() => {
    // Listen for signaling events
    socket.on('connect', () => {
      console.log('Connected to signaling server:', socket.id);
    });

    socket.on('offer', async (offer) => {
      if (!peerConnection.current) return;
      peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit('answer', roomId, answer);
    });

    socket.on('ice-candidate', (candidate) => {
      if (!peerConnection.current) return;
      peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('answer', (answer) => {
      if (!peerConnection.current) return;
      peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    return () => {
      // Cleanup listeners on component unmount
      socket.off('connect');
      socket.off('offer');
      socket.off('ice-candidate');
      socket.off('answer');
    };
  }, [roomId]);

  const startCall = async () => {
    setInCall(true);
    peerConnection.current = new RTCPeerConnection(configuration);

    // Capture both video and audio
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    // Display local video and audio stream
    localVideoRef.current.srcObject = localStream;

    // Add all tracks (audio and video) from local stream to the peer connection
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    // Set up event listener to handle receiving tracks from the remote peer
    peerConnection.current.ontrack = (event) => {
      const [remoteStream] = event.streams;

      // Ensure both audio and video are received correctly
      remoteVideoRef.current.srcObject = remoteStream;
    };

    // Handle ICE candidates for NAT traversal
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', roomId, event.candidate);
      }
    };

    // Create and send an offer to the other peer
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit('offer', roomId, offer);
  };

  const joinRoom = () => {
    socket.emit('join-room', roomId);
  };

  return (
    <div>
      <h2>Video Call</h2>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <button onClick={startCall} disabled={inCall}>Start Call</button>

      <div style={{ display: 'flex' }}>
        <div>
          <h3>Local Stream</h3>
          <video ref={localVideoRef} autoPlay playsInline ></video>
        </div>
        <div>
          <h3>Remote Stream</h3>
          <video ref={remoteVideoRef} autoPlay playsInline controls></video> {/* Added controls */}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
