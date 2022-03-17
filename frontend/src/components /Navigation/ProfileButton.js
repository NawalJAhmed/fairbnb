import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton() {
  const sessionUser = useSelector((state) => state.session.user);
  const allBookings = useSelector((state) => state.bookings);
  const bookingsArr = Object.values(allBookings);

  const allStories = useSelector((state) => state.stories);
  const storiesArr = Object.values(allStories);

  const userStories = storiesArr.filter(
    (story) => story.authorId === sessionUser.id
  );

  const userBookings = bookingsArr.filter(
    (booking) => booking.userId === sessionUser.id
  );

  const history = useHistory();

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <div id='profile-div'>
      <NavLink className='story-link-nav' to={`/story/new`}>
        Create Listing
      </NavLink>

      <NavLink className='story-link-nav' to={`/user/stories`}>
        My Listings {userStories.length === 0 ? '' : ('(' + userStories.length + ')')}
      </NavLink>

      <NavLink className='story-link-nav' to={`/user/bookings`}>
        My Bookings {userBookings.length === 0 ? '' : ('(' + userBookings.length + ')')}
      </NavLink>


      <button id='logout-btn' onClick={logout}>
        Log Out
      </button>
      <button id='profile-button' onClick={openMenu}>
        {' '}
        {sessionUser.username}
      </button>
      {/* {showMenu && (
        <ul id='profile-dropdown'>
          <li className='prof-list-item'>
            <NavLink className='story-link' to={`/username`}>
              {sessionUser.username}
            </NavLink>
          </li>
          <li className='prof-list-item'>
            <NavLink className='story-link-nav' to={`/story/new`}>
              Create Listing
            </NavLink>
          </li>
          <li className='prof-list-item'>
            <NavLink className='story-link-nav' to={`/user/stories`}>
              My Listings
            </NavLink>
          </li>
          <li className='prof-list-item'>
            <button id='logout-btn' onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )} */}
    </div>
  );
}

export default ProfileButton;
