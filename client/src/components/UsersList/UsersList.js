import React, { useEffect, useReducer, useRef } from 'react';

import {
  retrieveUserFollowing,
  retrieveUserFollowers,
} from '../../services/profileService';

import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';

import { usersListReducer, INITIAL_STATE } from './usersListReducer';

import UserCard from '../UserCard/UserCard';
import UsersListSkeleton from './UsersListSkeleton/UsersListSkeleton';
import Icon from '../Icon/Icon';
import FollowButton from '../Button/FollowButton/FollowButton';

const UsersList = ({
  userId,
  token,
  followingCount,
  followersCount,
  following,
}) => {
  const [state, dispatch] = useReducer(usersListReducer, INITIAL_STATE);
  const componentRef = useRef();

  useScrollPositionThrottled(async ({ atBottom }) => {
    const count = followingCount ? followingCount : followersCount;
    if (
      atBottom &&
      state.data.length < count &&
      !state.fetching &&
      !state.fetchingAdditional
    ) {
      try {
        dispatch({ type: 'FETCH_ADDITIONAL_START' });
        const response = following
          ? await retrieveUserFollowing(userId, state.data.length, token)
          : await retrieveUserFollowers(userId, state.data.length, token);
        dispatch({ type: 'ADD_USERS', payload: response });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', payload: err });
      }
    }
  }, componentRef.current);

  const stateRef = useRef(state.data).current;
  const followingRef = useRef(following).current;

  useEffect(() => {
    (async function () {
      try {
        dispatch({ type: 'FETCH_START' });
        const response = followingRef
          ? await retrieveUserFollowing(
              userId,
              stateRef ? stateRef.length : 0,
              token
            )
          : await retrieveUserFollowers(
              userId,
              stateRef ? stateRef.length : 0,
              token
            );
        dispatch({ type: 'FETCH_SUCCESS', payload: response });
      } catch (err) {
        dispatch({ type: 'FETCH_FAILURE', payload: err });
      }
    })();
  }, [userId, token, stateRef, followingRef]);

  return (
    <section
      className="following-overview"
      ref={componentRef}
      style={{ overflowY: 'auto' }}
    >
      {!followersCount && !followingCount ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <Icon
            style={{ margin: '0 auto' }}
            className="icon--larger"
            icon="person-add-outline"
          />
          <h2 className="heading-2 font-thin">
            {following
              ? '用户关注的人'
              : '关注用户的人'}
          </h2>
          <h4 className="heading-4 font-medium">
            {following
              ? "一旦用户关注了某个人，你就会在这里看到他们。."
              : "一旦有人关注了用户，你会在这里看到他们"}
          </h4>
        </div>
      ) : state.fetching ? (
        <UsersListSkeleton />
      ) : (
        state.data.map((user, idx) => (
          <UserCard
            key={idx}
            avatar={user.avatar}
            username={user.username}
            subText={user.fullName}
            userId={user._id}
            following={user.isFollowing}
          >
            <FollowButton
              userId={user._id}
              following={user.isFollowing}
              username={user.username}
              avatar={user.avatar}
            />
          </UserCard>
        ))
      )}
      {state.fetchingAdditional && <UsersListSkeleton />}
    </section>
  );
};

export default UsersList;
