//接口
export interface PersenInter{
    id:string,
    name:string,
    x?:string,//可有可无
}

//自定义类型
export type Persons = PersenInter[];