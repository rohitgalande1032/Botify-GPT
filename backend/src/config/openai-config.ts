import { Configuration, OpenAIApi} from "openai";

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPENAI_ORAGANIZATION_ID,
  });
  return new OpenAIApi(config);
};

// import { Configuration, OpenAIApi } from "openai";

// const config = new Configuration({
//   apiKey: process.env.OPEN_AI_SECRET,
//   organization: process.env.OPENAI_ORAGANIZATION_ID,
// });

// export const openai = new OpenAIApi(config);
