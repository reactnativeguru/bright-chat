import { Logging } from '@google-cloud/logging';

const logging = new Logging();
const log = logging.log('chatbot-errors');

export const logError = async (message: string, error: any) => {
  const metadata = {
    resource: { type: 'global' },
  };
  const entry = log.entry(metadata, { message, error });
  await log.write(entry);
  // store in database
};
