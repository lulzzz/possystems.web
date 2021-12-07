import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const Footer = () => {
  return (
    <footer className="container-fluid footer-basic">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexGrow: 0.5 }}>
          <img
            className="img-thumbnail"
            src="/css/ignytek.png"
            width="100"
            style={{ backgroundColor: '#fff' }}
          />
          <p>Copyright ©Ignytek All rights reserved.</p>
        </div>

        <div style={{ flexGrow: 2 }}>
          <p style={{ fontSize: 15, fontWeight: 'bold' }}>Ignytek </p>
          <div>
            <div>
              <RoomIcon style={{ verticalAlign: 'middle' }} />
              Dhaka, Bangladesh
            </div>
            <div style={{ marginTop: 5 }}>
              <PhoneIcon style={{ verticalAlign: 'middle' }} />
              (880)1759501239 &nbsp; &nbsp;
              <EmailIcon style={{ verticalAlign: 'middle' }} />
              ignytek@gmail.com
            </div>
          </div>
        </div>

        <div style={{ flexGrow: 0.5, textAlign: 'center' }}>
          <div>
            <a style={styles.a} href="#">
              {' '}
              Terms{' '}
            </a>
            <a style={styles.a} href="#">
              {' '}
              FAQ{' '}
            </a>
            <a style={styles.a} href="#">
              {' '}
              Help{' '}
            </a>
          </div>
          <div className="footer-icons">
            <a href="https://www.facebook.com/">
              <FacebookIcon
                style={{ color: 'RoyalBlue', backgroundColor: '#fff' }}
              />
            </a>
            <a href="https://twitter.com/home">
              <TwitterIcon
                style={{ color: 'DeepSkyBlue', backgroundColor: '#fff' }}
              />
            </a>
            <a href="https://www.linkedin.com/">
              <LinkedInIcon
                style={{ color: 'DodgerBlue', backgroundColor: '#fff' }}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  a: {
    textAlign: 'right',
    margin: 2,
  },
};

export default Footer;
