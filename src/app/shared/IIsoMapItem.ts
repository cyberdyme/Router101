/**
 * Created by girishthanki on 29/03/2017.
 */

export interface IPathInfo
{
  Id: string,
  Data: string
}

export interface  IIsoMapItem {
  Name : string,
  Code : string,
  PathFiles: string[],
  Paths: IPathInfo[]
}
