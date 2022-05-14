import { ImgloadDirective } from './imgload.directive';

describe('ImgloadDirective', () => {
  it('should create an instance', () => {
    let elRefMock = {
      nativeElement: document.createElement('div')
    };
    const directive = new ImgloadDirective(elRefMock);
    expect(directive).toBeTruthy();
  });
});
