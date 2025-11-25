// utils/emailRetry.ts
export const sendEmailWithRetry = async (
  sendFn: () => Promise<void>,
  retries = 3,
  delayMs = 2000
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sendFn();
      return; // success, exit
    } catch (error: any) {
      console.warn(`Email attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) throw error; // give up after last attempt
      await new Promise(res => setTimeout(res, delayMs)); // wait before retry
    }
  }
};
