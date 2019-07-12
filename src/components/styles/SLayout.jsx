import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;
const Positioner = styled.div``;

export const SLayout = ({ children }) => (
  <Container>
    <Positioner>{children}</Positioner>
  </Container>
);
