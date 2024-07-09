import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    pointer-events: all;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    pointer-events: none;
  }
`;

export const bouncOutDown = keyframes`
20% {
  transform: translate3d(0, 10px, 0) scaleY(0.985);
}
40%,
45% {
  opacity: 1;
  transform: translate3d(0, -20px, 0) scaleY(0.9);
}
to {
  opacity: 0;
  transform: translate3d(0, 2000px, 0) scaleY(3);
}
`;

export const bounceInUp = keyframes`
from,
60%,
75%,
90%,
to {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}
from {
  opacity: 0;
  transform: translate3d(0, 3000px, 0) scaleY(5);
}
60% {
  opacity: 1;
  transform: translate3d(0, -20px, 0) scaleY(0.9);
}
75% {
  transform: translate3d(0, 10px, 0) scaleY(0.95);
}
90% {
  transform: translate3d(0, -5px, 0) scaleY(0.985);
}
to {
  transform: translate3d(0, 0, 0);
}
`;

export const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const strike = keyframes`
  0%   { width : 0; }
  100% { width: 100%; }
`;
export const strikeBack = keyframes`
  0%   { width : 100%; }
  100% { width: 0; }
`;

export const shake = keyframes`
  2%, 18% {
        transform: translate3d(-4px, 0, 0);
    }
  4%, 16% {
      transform: translate3d(4px, 0, 0);
  }
  6%, 10%, 14% {
      transform: translate3d(-4px, 0, 0);
  }
  8%, 12% {
      transform: translate3d(4px, 0, 0);
  }
  18.1% {
      transform: translate3d(0px, 0, 0);
  }
`;
