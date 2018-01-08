import React from 'react';
import { List, Image, Grid } from 'semantic-ui-react'

//todo bug: sometimes, we receive duplicate tweets
export default ({tweets}) => (
  <List divided size='big' relaxed='very' verticalAlign='middle'>
    {tweets.map(({id, ...tweet}) => <Tweet key={id} {...tweet}/>)}
  </List>
)

//note: defined in the same file as TweetsList because it's only used by TweetsList. defined as a separate component
//rather than inside TweetsList because it does not depend on on any TweetsList state
const Tweet = ({timestamp, text, username, avatar, location}) => (
  <List.Item>
    <List.Content>
      <Grid>
        <Grid.Column width={1} verticalAlign='middle'>
          <Image src={avatar} circular />
        </Grid.Column>
        <Grid.Column width={15}>
          <List.Header>{username}</List.Header>
          <List.Description>{text}</List.Description>
        </Grid.Column>
      </Grid>
    </List.Content>
  </List.Item>
)