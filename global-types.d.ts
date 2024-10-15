declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    JWT_ACCESS_SECRET_KEY: string;
  }
}
