export type AuthContextType = {
  authUser: any|null;
  setAuthUser: React.Dispatch<React.SetStateAction<any | null>>;
};