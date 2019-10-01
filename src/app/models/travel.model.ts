import { Infractions } from './infractions.model';

export class Travel {
    status: number;
    user: {
        _id: string;
        name: string;
        email: string;
        imageSrc: string;
        cpf: string;
    }
    store: {
        name: string;
        cnpj: string;
        group: string;
    }
    initialScore: number;
    actualScore: number;
    model: string;
    color: string;
    licensePlate: string;
    vin: string;
    startDate: Date;
    endDate: Date;
    startPrice: number;
    finalPrice: number;
    initialKm: number;
    currentKm: number;
    infractions: Array<Infractions>;

    constructor() {
        this.infractions = new Array<Infractions>();
    }
}