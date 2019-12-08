import React from 'react';
import { MiniProgress } from 'ant-design-pro/lib/Charts';

const TimeLine = ({segments}) => (
  <div >
      <MiniProgress target={segment} targetLabel={}/>
  </div>
);

export default TimeLine;
