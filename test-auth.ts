import { sendPhoneOtpAction } from './src/actions/auth';
async function test() {
  const result = await sendPhoneOtpAction("5551000001", "creator");
  console.log("Result:", result);
}
test();
