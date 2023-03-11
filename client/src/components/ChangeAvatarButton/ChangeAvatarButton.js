import React, { Fragment, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  changeAvatarStart,
  removeAvatarStart,
} from '../../redux/user/userActions';
import {
  selectCurrentUser,
  selectToken,
  selectFetchingAvatar,
  selectError,
} from '../../redux/user/userSelectors';
import { showModal } from '../../redux/modal/modalActions';
import { showAlert } from '../../redux/alert/alertActions';

const ChangeAvatarButton = ({
  children,
  changeAvatarStart,
  removeAvatarStart,
  currentUser: { avatar },
  showModal,
  showAlert,
  token,
  error,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (error) {
      showAlert(error);
    }
  }, [error, showAlert]);

  const handleClick = (event) => {
    if (avatar) {
      event.preventDefault();
      return showModal(
        {
          options: [
            {
              text: '上传头像',
              className: 'color-blue font-bold',
              onClick: () => {
                inputRef.current.click();
              },
            },
            {
              warning: true,
              text: '删除当前头像',
              onClick: () => {
                changeAvatar(null, true);
              },
            },
          ],
        },
        'OptionsDialog/OptionsDialog'
      );
    }
    inputRef.current.click();
  };

  const changeAvatar = async (event, remove) => {
    remove
      ? await removeAvatarStart(token)
      : await changeAvatarStart(event.target.files[0], token);
    if (!error) showAlert('头像更新。');
  };

  return (
    <Fragment>
      <label
        className="color-blue font-bold heading-4"
        style={{ cursor: 'pointer', position: 'relative' }}
        onClick={(event) => handleClick(event)}
      >
        <Fragment>{children ? children : '上传头像'}</Fragment>
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={(event) => changeAvatar(event)}
      />
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changeAvatarStart: (image, authToken) =>
    dispatch(changeAvatarStart(image, authToken)),
  removeAvatarStart: (authToken) => dispatch(removeAvatarStart(authToken)),
  showModal: (props, component) => dispatch(showModal(props, component)),
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
  fetchingAvatar: selectFetchingAvatar,
  error: selectError,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeAvatarButton);
