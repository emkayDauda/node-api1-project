import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Button, Card, Heading, Content } from "react-bulma-components";
import Friend from "./User";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";


export default function FriendsList({setFriendForm, history, setId}) {
  const [friends, setFriends] = useState([]);

  const deleteFriend = id => {
    axios
      .delete(`http://localhost:3001/api/users/${id}`)
      .then(res => {
        console.log(res.data);
        const remainingFriends = friends.filter(friend => friend.id !== res.data.data.id)
        setFriends(remainingFriends);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users")
      .then(res => {
        console.log(res.data);
        setFriends(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <StyledDiv>
      {friends.map(friend => (
        <NavLink key={friend.id} to="/friends/:id">
          <Friend history={history} setId={setId} setFriendForm={setFriendForm} onDelete={deleteFriend} friend={friend} />
        </NavLink>
      ))}
      <StyledCard>
        <Heading>New Friend?</Heading>
        <Content>Click to add</Content>
        <div>
          <NavLink to="/new-friend">
            <Button color="primary">Add</Button>
          </NavLink>
          {/* <Button color='danger' >Delete</Button> */}
        </div>
      </StyledCard>
    </StyledDiv>
  );
}

const StyledCard = styled(Card)`
  width: 25rem;
  margin-left: 5rem;
  border-radius: 0.4rem;
  margin-top: 1.5rem;
  padding-bottom: 1rem;

  div {
    display: flex;
    justify-content: space-evenly;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;


  /* <Route key={friend.id} path='/friends/:id' render={props => {
    return <Friend friend={friend}/>
}} /> */
