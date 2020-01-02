import React from 'react'
import { List } from 'semantic-ui-react'

const GamesHistory = function() {
  return (
    <List divided relaxed>
      <List.Item>
        <List.Content>
          <List.Header>Semantic-Org/Semantic-UI</List.Header>
          <List.Description>Updated 10 mins ago</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Semantic-Org/Semantic-UI-Docs</List.Header>
          <List.Description>Updated 22 mins ago</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header>Semantic-Org/Semantic-UI-Meteor</List.Header>
          <List.Description>Updated 34 mins ago</List.Description>
        </List.Content>
      </List.Item>
    </List>
  )
}

export default GamesHistory
