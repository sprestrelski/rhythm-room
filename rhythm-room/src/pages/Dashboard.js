import React from "react";
import YouTube from "react-youtube";
import Modal from "react-modal";
import { Container, Button} from 'react-bootstrap';

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Render function for Prismic headless CMS pages
function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  let videoCode;
  if (videoUrl) {
    try{
      videoCode = videoUrl.split("v=")[1].split("&")[0];
      console.log("videoURL: " + videoCode);
    }
    catch (error){
      videoCode = videoUrl;
      console.log("ur BAD");
    }
    
  }

  const checkElapsedTime = (e) => {
    console.log(e.target.playerInfo.playerState);
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  return (
    <div>
      <Container>
        <div>
          <h1>Dashboard</h1>
          <div></div>
        </div>
        <div>
        <label htmlFor="songURL">Enter Song URL: </label>
        <input id="songURL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        
          <div>
            <YouTube
              videoId={videoCode}
              containerClassName="embed embed-youtube"
              onStateChange={(e) => checkElapsedTime(e)}
              opts={opts}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
