import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { Repository } from '../../models/repository.interface';
import { Readme } from '../../models/readme.interface';
export declare class GithubService {
    private configService;
    private http;
    constructor(configService: ConfigService, http: HttpService);
    getProfileReadme(): Observable<Readme>;
    getRepositories(): Observable<Repository[]>;
}
