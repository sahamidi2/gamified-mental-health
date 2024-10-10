import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { NavLink } from 'react-router-dom';

function Help() {
  return (
    <div className="profile-body">
    <div className="flex-container-profile">
    <div className="profile-card">
      <h2 className="about-help">About & Help</h2>
      <Accordion className="accordion">
      <Accordion.Item eventKey="0">
        <Accordion.Header>How to use happy paws Tutorial</Accordion.Header>
        <Accordion.Body>
        <iframe src="https://scribehow.com/embed/happy_paws_Tutorial__wBc8cfDKTCus5-qYQP5YBQ" width="100%" height="640" allowfullscreen frameborder="0"></iframe>
        <br></br>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Disclaimer</Accordion.Header>
        <Accordion.Body>
        Our website and all content displayed on this website are not to be perceived as or relied upon 
        in any way as medical advice or mental health advice. The information provided through our 
        website or content is not intended to be a substitute for professional medical advice, 
        diagnosis or treatment that can be provided by a licensed or 
        registered health care professional. Do not disregard professional medical advice or delay 
        seeking professional advice because of information you have read on this website, its content, or 
        received from us. We are not providing health care, medical or therapy services or attempting to 
        diagnose, treat, prevent or cure in any manner whatsoever any physical ailment, or 
        any mental or emotional issue, disease or condition. We are not giving medical, 
        psychological, or religious advice whatsoever. We do not have the qualifications, licenses, or 
        certifications to provide medical or mental health advice.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>About the Creators of happy paws</Accordion.Header>
        <Accordion.Body>
        happy paws was created by a group of 5 students at the University of Washington for their senior capstone project.
        Passionate about mental health and wellness, they decided to create happy paws as a fun resource to encourage
        Gen Z individuals to prioritize their mental wellbeing. 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <NavLink className="back-link" to="/profile"><p className="back-help">← Back</p></NavLink>
    </div>
    </div>
    </div>
  );
}

export default Help;