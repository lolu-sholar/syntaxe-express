import { AppService } from './app.service';
import CountryInfo from './types';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): {
        [key: string]: string;
    };
    getUsers(): Array<{
        [key: string]: string | number | Array<unknown>;
    }>;
    getUsersGithub(): Array<{
        [key: string]: string | number | boolean;
    }>;
    getCountries(): CountryInfo;
    getCountriesStates(): CountryInfo;
    getCountriesStatesCities(): CountryInfo;
}
