export interface Flight {
    id: number;
    origin: string;              
    destination: string;         
    flightDate: string;         
    status: FlightStatus;       
}

export enum FlightStatus {
    ACTIVE = 'ACTIVE',
    IN_COURSE = 'IN_COURSE',
    COMPLETED = 'COMPLETED',
    CANCELED = 'CANCELED'
}