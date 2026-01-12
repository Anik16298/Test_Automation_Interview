export class Logger {
    static log(message) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] INFO: ${message}`);
    }

    static error(message, err) {
        const timestamp = new Date().toISOString();
        console.error(`[${timestamp}] ERROR: ${message}`, err || '');
    }
}
