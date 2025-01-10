export interface FlightPrice {
    id: number;
    flightId: number;            
    class: FlightClass;          
    seats: number;               
    total: number;               
}

export enum FlightClass {
    FIRST = 'FIRST',
    BUSINESS = 'BUSINESS',
    ECONOMIC = 'ECONOMIC'
}