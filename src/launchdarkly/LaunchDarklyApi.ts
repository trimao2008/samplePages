import { error } from "console";
import { LaunchDarkly } from "./LaunchDarkly";

const baseUrl = 'https://app.launchdarkly.com';
const fetchAllFlagUrl = `${baseUrl}/api/v2/flags/`;

function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again.';
        case 403:
            return 'You do not have permission to view the project(s).';
        default:
            return 'There was an error retrieving the project(s). Please try again.';
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);
        let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMessage);
    }
}

function parseJSON(response: Response) {
    return response.json();
}

function convertToLaunchDarklyModel(items: any): LaunchDarkly {
    return new LaunchDarkly(items);
}

const LaunchDarklyApi = {
    get(projectKey = 'hlex', env = 'sit-1') {
        return fetch(`${fetchAllFlagUrl}${projectKey}?filter=filterEnv:${env}`, {
            headers: {
                'Authorization': 'api-d003c5e8-63f9-4faf-a6f6-46a946720baf'
            }
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(convertToLaunchDarklyModel)
            .catch((error: TypeError) => {
                console.log('log client error ' + error);
                throw new Error(
                    'There was an error retrieving the projects. Please try again.'
                );
            });
    }
}

export { LaunchDarklyApi }