import { Infractions } from './infractions.model';

export class Travel {
    status: Number;
    user: {
        _id: String;
        name: String;
        email: String;
        imageSrc: String;
        cpf: String;
    }
    store: {
        name: String;
        cnpj: String;
        group: String;
    }
    initialScore: Number;
    actualScore: Number;
    model: String;
    color: String;
    licensePlate: String;
    vin: String;
    startDate: Date;
    endDate: Date;
    startPrice: Number;
    finalPrice: Number;
    initialKm: Number;
    currentKm: Number;
    infractions: Array<Infractions>;

    constructor() {
        this.infractions = new Array<Infractions>();
    }
}