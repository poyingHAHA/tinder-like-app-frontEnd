export interface Rating
{
  itemid: string,
  shopid: string,
  sp_itemid: number,
  sp_shopid: number,
  ratings:{
    itemid: string,
    shopid: string,
    sp_shopid: number,
    sp_itemid: number,
    sp_orderid: number,
    sp_buyerid: number,
    comment: string,
    buyerPic: string,
    ctime: number,
    images: string[]
  }[],
}
