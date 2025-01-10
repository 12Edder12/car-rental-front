export interface Flight {
    Id: number;
    Origin: string;              
    Destination: string;         
    FlightDate: string;         
    Status: FlightStatus;       
}

export enum FlightStatus {
    ACTIVE = 'Activo',
    IN_COURSE = 'En curso',
    COMPLETED = 'Completado',
    CANCELED = 'Cancelado'
}