import 'dotenv/config';

export default {
  expo: {
    name: "HorseEvent",
    slug: "HorseEvent",
    version: "1.0.0",
    orientation: "portrait",
    extra: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
};
