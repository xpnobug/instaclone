import React from 'react';

import Divider from '../../Divider/Divider';
import Icon from '../../Icon/Icon';

const FeedBottom = () => (
  <div className="feed__bottom">
    <Divider>
      <Icon
        icon="checkmark-circle-outline"
        className="feed__bottom-icon icon--larger"
      />
    </Divider>
    <h2 className="heading-2">已经到底了</h2>
    <h3 className="heading-3 color-grey">
      关注更多人可以看到更多作品。
    </h3>
  </div>
);

export default FeedBottom;
