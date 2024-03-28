"use server";

import { MESSAGES } from "@/config/constants";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

export const getToken = async () => {
    const streamApiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
    const streamApiSecret = process.env.STREAM_API_SECRET

    if(!streamApiKey || !streamApiSecret) {
        throw new Error(MESSAGES.FAILURE.NO_STREAM_API_SECRETS)
    }

    const user = await currentUser();
    if(!user) {
        throw new Error(MESSAGES.FAILURE.INVALID_CLERK_USER)
    }
    
    console.log('Generating token for user :', user.id);
    const streamClient = new StreamClient(streamApiKey, streamApiSecret);

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(user.id, expirationTime, issuedAt);
    console.log('Successfully generated token :', token);
    
    return token;
}