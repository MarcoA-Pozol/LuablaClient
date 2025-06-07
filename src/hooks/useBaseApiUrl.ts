export const useBaseApiUrl = (endpoint:string) => {
    const baseApiUrl = "http://localhost:8600/api";
    const completeEndpoint = `${baseApiUrl}${endpoint}`;

    return completeEndpoint;
}