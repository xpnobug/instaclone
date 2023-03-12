import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <main className="not-found-page grid">
    <div
      style={{
        gridColumn: 'center-start / center-end',
        textAlign: 'center',
        padding: '0 2rem',
      }}
    >
      <h1 className="heading-1">404.</h1>
      <h3 className="heading-3 font-medium">
        您所点击的链接可能已断开，或者该页面已被删除.{' '}
        <Link to="/" className="link">
          Go back to ONE.
        </Link>
      </h3>
    </div>
  </main>
);

export default NotFoundPage;
