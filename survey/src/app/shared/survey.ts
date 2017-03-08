export class Survey {
    csrfToken: string;
    survey: {
        id: number;
        update: Date;
        start: Date;
        end: Date;
        name: string;
    };
}