export interface TinderRecommendPool
{
  buyerid: string,
  items: {
    itemid: string,
    labels: {
      labelid: number,
      display_name: string
    }[],
    feLabels: {
      labelid: number,
      display_name: string
    }[]
  }[]
}
