export interface LikeItem
{
  name: string;
  itemid: string;
}

export interface BuyerFollow
{
  buyerid: string;
  profilePic: string;
}

export interface ShopFollow
{
  shopid: string;
}

export interface TinderItem
{
  itemid: string,
  name: string,
  labels: Label[],
  feLabels: Label[]
}

export interface Label
{
  labelid: number,
  display_name: string
}

export interface TinderUser
{
  userid: string
}

export interface variation
{
  name: string,
  options: string[],
  images: string[],
}

export interface rating
{
  rating_star: number,
  rating_count: number[],
}
