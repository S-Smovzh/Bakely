export const imageClasses = {
  main: {
    horizontal: (screenWidth) => {
      switch (true) {
        case screenWidth > 1399:
          return { width: 600, height: 350 };
        case screenWidth > 1199 && screenWidth <= 1399:
          return { width: 520, height: 310 };
        case screenWidth > 991 && screenWidth <= 1199 :
          return { width: 780, height: 300 };
        case screenWidth > 768 && screenWidth <= 991 :
          return { width: 600, height: 240 };
        case screenWidth > 480 && screenWidth <= 768:
          return { width: 420, height: 240 };
        case screenWidth > 320 && screenWidth <= 480:
          return { width: 310, height: 200 };
        case screenWidth <= 320:
          return { width: 300, height: 170 };
        default:
          return { width: 300, height: 170 };
      }
    },
    vertical: (screenWidth) => {
      switch (true) {
        case screenWidth > 1399:
          return { width: 375, height: 710 };
        case screenWidth > 1199 && screenWidth <= 1399:
          return { width: 300, height: 630 };
        case screenWidth > 991 && screenWidth <= 1199 :
          return { width: 380, height: 610 };
        case screenWidth > 768 && screenWidth <= 991 :
          return { width: 290, height: 400 };
        case screenWidth > 480 && screenWidth <= 768:
          return { width: 200, height: 410 };
        case screenWidth > 320 && screenWidth <= 480:
          return { width: 145, height: 310 };
        case screenWidth <= 320:
          return { width: 140, height: 280 };
        default:
          return { width: 140, height: 280 };
      }
    }
  },
  listImage: (screenWidth) => {
    switch (true) {
      case screenWidth > 1399:
        return { width: 400, height: 400 };
      case screenWidth > 1199 && screenWidth <= 1399:
        return { width: 360, height: 360 };
      case screenWidth > 991 && screenWidth <= 1199 :
        return { width: 320, height: 320 };
      case screenWidth > 768 && screenWidth <= 991 :
        return { width: 300, height: 300 };
      case screenWidth > 480 && screenWidth <= 768:
        return { width: 270, height: 270 };
      case screenWidth > 320 && screenWidth <= 480:
        return { width: 250, height: 250 };
      case screenWidth <= 320:
        return { width: 220, height: 220 };
      default:
        return { width: 220, height: 220 };
    }
  },
  similarProduct: (screenWidth) => {
    switch (true) {
      case screenWidth > 1399:
        return { width: 250, height: 250 };
      case screenWidth > 1199 && screenWidth <= 1399:
        return { width: 230, height: 230 };
      case screenWidth > 991 && screenWidth <= 1199 :
        return { width: 200, height: 200 };
      case screenWidth > 768 && screenWidth <= 991 :
        return { width: 180, height: 180 };
      case screenWidth > 480 && screenWidth <= 768:
        return { width: 180, height: 180 };
      case screenWidth > 320 && screenWidth <= 480:
        return { width: 140, height: 140 };
      case screenWidth <= 320:
        return { width: 135, height: 135 };
      default:
        return { width: 135, height: 135 };
    }
  },
  news: (screenWidth) => {
    switch (true) {
      case screenWidth > 680:
        return { width: 260, height: 400 };
      case screenWidth <= 680:
        return { width: 270, height: 140 };
      default:
        return { width: 'auto', height: 140 };
    }
  },
  pressRelease: (screenWidth) => {
    switch (true) {
      case screenWidth >= 1200:
        return { width: 'auto', height: 400 };
      case screenWidth > 991 && screenWidth <= 1199:
        return { width: 'auto', height: 400 };
      case screenWidth > 768 && screenWidth <= 991 :
        return { width: 'auto', height: 300 };
      case screenWidth > 480 && screenWidth <= 768:
        return { width: 'auto', height: 250 };
      case screenWidth > 320 && screenWidth <= 480:
        return { width: 'auto', height: 200 };
      case screenWidth <= 320:
        return { width: 'auto', height: 150 };
      default:
        return { width: 'auto', height: 150 };
    }
  }
};
