"use client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "@/app/styles/globals.css";
import Image from "next/image";
import config from "../config/config";

function YoutubeEmbed({ embedId, id, image }) {
  const [showVideo, setShowVideo] = useState(false);

  const onMouseEnterLoadYoutubeVideo = () => {
    setShowVideo(true);
  };

  return (
    <div
      className="video-responsive"
      onMouseEnter={onMouseEnterLoadYoutubeVideo}
    >
      {showVideo ? (
        <iframe
          id={id}
          width="100%"
          height="549"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : (
        <div className="placeholder-image">
          <Image
            src={`${config.ROUTE_BASE}${image}`}
            alt="AMC Introduction Youtube Video"
            width={400}
            height={300}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
