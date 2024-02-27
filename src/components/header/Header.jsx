import React from 'react';
import { Card, Thumbnail, Avatar, InlineError } from '@shopify/polaris';

import "./header.css";
import logo from "../../assets/StoreSwitcher.png";

const Header = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: "#fff"
    }}>
      <div>
        <img
            src={logo}
            alt='store switcher'
        />
      </div>
        <div style={{ marginRight: '24px' }}>
          <p style={{
            display: 'inline-block',
            width: '32px',
            height: '32px',
            backgroundColor: "#FFC96B",
            textAlign: 'center',
            lineHeight: "30px",
            borderRadius: '100%',
            border: '2px',
            marginRight: '8px'
          }}>
              XA
          </p>
            <span>Xquenda Andrew</span>
        </div>
    </div>
  );
};

export default Header;