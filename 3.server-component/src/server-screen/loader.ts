import { isValidServerCode } from "./guards";
import { ServerCodes } from "./type";

export const loadServerScreenCodes = async (screenId: string): Promise<ServerCodes[]> => {
    const data = await fetch(`/${screenId}.json`)
        .then<ServerCodes[]>(response => response.json())
        .catch(error => {
            console.error('Error loading server screen codes:', error);
            return [];
        });

    const sanitizedData = data.filter(isValidServerCode);

    return sanitizedData
}