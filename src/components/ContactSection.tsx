import React from "react";
import { IconButton } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const ContactSection: React.FC = () => {
  const handleLinkedInClick = () => {
    window.location.href = "https://www.linkedin.com/in/pedro-freidinger";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:pedrotersetti3@gmail.com";
  };

  return (
    <>
      <p>Reach me out:</p>
      <div>
        <IconButton onClick={handleLinkedInClick}>
          <LinkedInIcon style={{ color: 'white', fontSize: '2.5rem' }} />
        </IconButton>
        <IconButton onClick={handleEmailClick}>
          <EmailIcon style={{ color: 'white', fontSize: '2.5rem'  }} />
        </IconButton>
      </div>
    </>
  );
};

export default ContactSection;
