import React, { useState } from 'react';
import LpStakeTabMenu from './LpStakeTabMenu';
import NewStakeComponent from './NewStakeComponent';

function StakePage() {
  const [_token, set_token] = useState<number>(0);

  // Pass _token and set_token as props to LpStakeTabMenu
  return (
    <div>
      <LpStakeTabMenu token={_token} setToken={set_token} />
      <NewStakeComponent token={_token} />
    </div>
  );
}

export default StakePage;
../Header/HeaderComponent