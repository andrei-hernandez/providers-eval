import { v4 as uuidv4 } from "uuid";

export const saveProvider = async (providerName: string) => {
  const newProviderObject = {
    name: providerName,
    id: uuidv4(),
  };
};
