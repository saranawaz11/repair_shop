import { createSafeActionClient, DEFAULT_SERVER_ERROR_MESSAGE } from "next-safe-action";
import { z } from "zod/v4";
import * as Sentry from '@sentry/nextjs'

export const actionClient = createSafeActionClient({

    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        });
    },
    // Can also be an async function.
    handleServerError(e, utils) {
        // You can access these properties inside the `utils` object.
        const { clientInput, metadata } = utils;
        Sentry.captureException(e, (scope) => {
            scope.clear()
            scope.setContext('serverError', {message: e.message})
            scope.setContext('metadata', {actionName: metadata?.actionName})
            scope.setContext('clientInput', {clientInput})
            return scope
        })
        console.error("Action error:", e.message);
        if(e.constructor.name === 'DatabaseError'){
            return 'Database eroor. data is not saved.'
        }
        return DEFAULT_SERVER_ERROR_MESSAGE;
        // return e.message;
    },
});