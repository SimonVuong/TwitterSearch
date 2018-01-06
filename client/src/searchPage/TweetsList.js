import React from 'react';
import { List, Image, Grid } from 'semantic-ui-react'

export default ({tweets}) => (
  <List divided size='big' relaxed='very'
  verticalAllign='middle'>
    {tweets.map(({id, ...tweet}) => <Tweet key={id} {...tweet}/>)}
  </List>
)

const Tweet = ({timestamp, text, username, avatar, location}) => (
  <List.Item>
    <List.Content>
      <Grid columns={2}>
        <Grid.Column width={1}>
          <Image src={avatar} />
        </Grid.Column>
        <Grid.Column width={15}>
          <List.Header>{username}</List.Header>
          <List.Description>{text}</List.Description>
        </Grid.Column>
      </Grid>
    </List.Content>
  </List.Item>
)