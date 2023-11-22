export interface Flight {
    flight_date: string;
    flight_status: string;
    departure: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string;
        gate: string;
        delay: number;
        scheduled: string;
        estimated: string;
        actual: string;
        estimated_runway: string;
        actual_runway: string;
    };
    arrival: {
        airport: string;
        timezone: string;
        iata: string;
        icao: string;
        terminal: string;
        gate: string;
        baggage: string;
        delay: number;
        scheduled: string;
        estimated: string;
        actual: string;
        estimated_runway: string;
        actual_runway: string;
    };
    airline: {
        name: string;
        iata: string;
        icao: string;
    };
    flight: {
        number: string;
        iata: string;
        icao: string;
        codeshared: string;
    }

}