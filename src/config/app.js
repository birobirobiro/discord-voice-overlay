import { env } from '../../.env.js';

export const appConfig = {
  discord: {
    token: env.discord_token,
    user_id: env.discord_user_id,
  },
};
