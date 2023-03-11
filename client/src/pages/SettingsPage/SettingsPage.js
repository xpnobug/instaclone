import React, { Fragment } from 'react';
import { NavLink, Switch } from 'react-router-dom';

import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import Card from '../../components/Card/Card';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import MobileHeader from '../../components/Header/MobileHeader/MobileHeader';

const SettingsPage = () => (
  <Fragment>
    <MobileHeader backArrow>
      <h3 className="heading-3">修改资料</h3>
      <div></div>
    </MobileHeader>
    <main className="settings-page grid">
      <Card className="settings-card">
        <ul className="settings-card__sidebar">
          <NavLink
            className="sidebar-link"
            to="/settings/edit"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">修改资料</li>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to="/settings/password"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">修改密码</li>
          </NavLink>
        </ul>
        <article className="settings-page__content">
          <Switch>
            <ProtectedRoute path="/settings/edit">
              <EditProfileForm />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/password">
              <ChangePasswordForm />
            </ProtectedRoute>
          </Switch>
        </article>
      </Card>
    </main>
  </Fragment>
);

export default SettingsPage;
