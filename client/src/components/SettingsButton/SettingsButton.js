import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { showModal } from '../../redux/modal/modalActions';
import { signOut } from '../../redux/user/userActions';

import Icon from '../Icon/Icon';

const SettingsButton = ({ showModal, signOut }) => {
  const history = useHistory();
  return (
    <Icon
      icon="aperture-outline"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        showModal(
          {
            options: [
              {
                text: '修改密码',
                onClick: () => history.push('/settings/password'),
              },
              {
                text: '退出',
                onClick: () => {
                  signOut();
                  history.push('/');
                },
              },
            ],
          },
          'OptionsDialog/OptionsDialog'
        );
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (props, component) => dispatch(showModal(props, component)),
  signOut: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(SettingsButton);
