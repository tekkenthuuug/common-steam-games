import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FormElement.css';

import InputsField from '../InputsField/InputsField';

const initialUser = {
  steamid: '',
  name: '',
  profileurl: '',
  avatar: '',
  request: undefined
};

export const FormElement = () => {
  const [users, setUsers] = useState([Object.assign({}, initialUser), Object.assign({}, initialUser)]);

  const addInput = () => {
    if (users.length < 5) {
      const usersClone = [...users];
      usersClone.push({
        ...initialUser
      });
      setUsers(usersClone);
    }
  };

  const removeInput = () => {
    if (users.length > 2) {
      const usersClone = [...users];
      usersClone.pop();
      setUsers(usersClone);
    }
  };

  const fetchUserInfo = (profileURL, id) => {
    fetch('https://common-games-api.herokuapp.com/getSteamInfo', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profileURL
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const usersClone = [...users];
        if (data.steamid) {
          const { steamid, name, profileurl, avatar } = data;
          usersClone[id] = {
            steamid,
            name,
            profileurl,
            avatar
          };
        } else {
          usersClone[id] = { ...initialUser };
          usersClone[id].name = 'Not Found';
        }
        setUsers(usersClone);
      });
  };

  const deleteLastSlash = (url) => {
    return url[url.length - 1] === '/' ? url.slice(0, url.length - 1) : url;
  };

  const isInputValid = (input) => {
    const inputArr = deleteLastSlash(input).split('/');
    return inputArr.length - inputArr.indexOf('id') === 2;
  };

  const getUserIfValid = (event) => {
    const target = event.target;

    const usersClone = [...users];

    if (isInputValid(target.value)) {
      if (target.value === '') {
        usersClone[target.id] = { ...initialUser };
      } else {
        clearTimeout(users[target.id].request);
        usersClone[target.id].request = setTimeout(() => {
          fetchUserInfo(target.value, target.id);
        }, 350);
      }
    } else {
      usersClone[target.id] = { ...initialUser };
      usersClone[target.id].name = 'Not valid input';
    }
    setUsers(usersClone);
  };

  const couldBeFetched = () => {
    return (
      users.reduce((acc, user) => {
        if (user.name !== '') acc++;
        return acc;
      }, 0) >= 2
    );
  };

  return (
    <div className="form-box">
      <InputsField removeInput={removeInput} getUserIfValid={getUserIfValid} users={users} />
      <div className="button-container">
        {users.length >= 5 ? (
          ''
        ) : (
          <button className="add-button" onClick={addInput}>
            <span>+</span>
          </button>
        )}
        <Link
          to={couldBeFetched() ? `/common-games/${users.map((user) => user.steamid)}` : '/'}
          className="fetch-button"
        >
          Fetch games
        </Link>
      </div>
    </div>
  );
};

export default FormElement;
