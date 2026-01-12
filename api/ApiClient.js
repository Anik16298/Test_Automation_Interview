import { Config } from '../utils/Config';

export class ApiClient {
    constructor(request) {
        this.request = request;
        this.baseURL = Config.apiUrl;
    }

    async submitContactMessage(data) {
        const response = await this.request.post(`${this.baseURL}/messages`, {
            data: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}
