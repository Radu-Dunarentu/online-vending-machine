import React from 'react';

export const SkeletonLine = ({width, height}) => {
  return (
    <div>
      <style jsx>{`
      display: inline-block;
      height: ${height ? height : '100%'};
      width: ${width ? width : '100%'};
      background: linear-gradient(-90deg, #C1C1C1 0%, #F8F8F8 50%, #C1C1C1 100%);
      background-size: 400% 400%;
      animation: pulse 1.2s ease-in-out infinite;
        @keyframes animator {
          0% {
            background-position: 0% 0%;
        }
          100% {
          background-position: -135% 0%;
        }
        }
        `}</style>
    </div>
  );
}
 ;
