import React from 'react';
import { Header, Icon } from 'semantic-ui-react'

export default ({text, icon}) => (
  <Header as='h1' textAlign='center'>
    <Icon name={icon} />
    <Header.Content>
      {text}
    </Header.Content>
  </Header>
)