import { Spin } from 'antd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { loadingState } from 'recoils/loadingState'
import './style.less'

const LoadingOverlay = ({ isSuspense }) => {
  const appLoading = useRecoilValue(loadingState)
  return (
    (appLoading > 0 || isSuspense) &&
    <div className='loading-overlay'>
      <Spin size={'large'} />
    </div>
  );
}

export default LoadingOverlay;