// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//測試機 本地機參數

export const environment = {
  production: false,
  //domain: 'http://localhost:3000',
  domain: 'http://140.119.19.32:8080',
  baseRoute: {
    buyer: "buyer",
    shop: "shop",
    items: "items",
    tinder: "tinder",
    treemap: "treemap"
  },
  imgBase: "https://cf.shopee.tw/file/",
  myImgURL: "http://140.119.19.32/images/",
  myImgRoute:{
    buyer_profile_pic: "buyer/profile-pic/"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
