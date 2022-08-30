import {Tile} from "./tile.interface";

export interface Tag extends Tile {
  description?:string;
  createDate?: string;
  lastUpdate?: string;
  createdBy?: string;
}
