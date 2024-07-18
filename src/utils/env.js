import dotenv from 'dotenv';
dotenv.config();
export function env(name, defaultValue) {
  const value = process.env[name];
  // console.log(`Loading env variable: ${name}=${value}`);
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing: process. env['${name}']`);
}
