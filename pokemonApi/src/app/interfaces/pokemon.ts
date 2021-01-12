export interface IBaseTypes{
    count: number,
    next: string,
    previous: string,
    results: [ ITypes ]    
}

export interface ITypes{
    name: string,
    url: string
}

export interface IBaseHabilitys{
    count: number,
    next: string,
    previous: string,
    results: [ IHability ] 
}

export interface IHability{
    name: string,
    url: string
}

