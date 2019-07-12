import React from 'react';
import PropTypes from 'prop-types';
import Header from './shared/Header';
import Footer from './shared/Footer';
import Joiner from './shared/Joiner';
import { SLayout } from './styles';

const Layout = ({ haveHead, haveFoot, haveJoin, children }) => (
  <SLayout>
    {haveHead ? <Header /> : ''}
    {children}
    {haveJoin ? <Joiner /> : ''}
    {haveFoot ? <Footer /> : ''}
  </SLayout>
);

Layout.propTypes = {
  haveHead: PropTypes.bool,
  haveFoot: PropTypes.bool,
  haveJoin: PropTypes.bool,
};

Layout.defaultProps = {
  haveHead: true,
  haveFoot: true,
  haveJoin: false,
};

export default Layout;
