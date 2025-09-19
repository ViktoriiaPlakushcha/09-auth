export interface User {
  id: string;
  email: string;
  username?: string;
  photourl?: string;
  createdat: Date;
  updatedat: Date;
}