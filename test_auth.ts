import { getSessionAction } from './src/actions/auth';

async function run() {
    try {
        const session = await getSessionAction();
        console.log("Session:", session);
    } catch (e) {
        console.error("Error getting session:", e);
    }
}
run();
