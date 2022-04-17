import { keyframes, style } from '@angular/animations';

export const slideOutLeft = [
  style({transform: 'translate3d(0, 0, 0)'}),
  style({
    visibility: 'hidden',
    transform: 'translate3d(100%, 0, 0)'
  })
];

export const rotateZoomOutLeft = [
  style({transform: ' rotateZ(2deg)', offset: .2}),
  style({transform: ' rotateZ(4deg)', offset: .4}),
  style({transform: ' rotateZ(7deg)', offset: .6}),
  style({transform: ' rotateZ(10deg)', offset: .8}),
  style({transform: ' rotateZ(15deg)', offset: 1})
];

export const rotateZoomOutRight = [
  style({transform: ' rotateZ(20deg)', opacity: 0.2, offset: .2}),
  style({transform: ' rotateZ(25deg)', opacity: 0.1, offset: .4}),
  style({transform: ' rotateZ(30deg)', opacity: 0.0, offset: 1})
]
