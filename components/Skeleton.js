import React from 'react';

const style ={
  display: 'inline-block',
  height: '100%',
  width: '100%',
  background: 'linear-gradient(-90deg, #C1C1C1 0%, #F8F8F8 50%, #C1C1C1 100%)',
  backgroundSize: '400% 400%',
  animation: 'animator 1.2s ease-in-out infinite',

};

export const SkeletonLine = () => {
  return (
    <div style={style}>
      <style jsx>{`
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
