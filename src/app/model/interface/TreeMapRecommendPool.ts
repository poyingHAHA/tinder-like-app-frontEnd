import { Label } from "./Partial";

export interface TreeMapRecommendPool
{
  buyerid: string,
  itemid: string,
  name: string,
  labels: Label[],
  feLabels: Label[],
  score: number
}
