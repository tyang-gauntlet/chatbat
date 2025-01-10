import { useMutation, useQuery } from 'convex/react';
import { useCallback, useMemo, useState } from 'react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

// Types
type Status = 'success' | 'error' | 'settled' | 'pending' | null;
type BaseOptions = {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
};

// Channel Types
type CreateChannelRequest = {
    name: string;
    description?: string;
    members: Id<'users'>[];
};

type UpdateChannelRequest = {
    id: Id<'channels'>;
    name?: string;
    description?: string;
    members?: Id<'users'>[];
};

// Message Types
type SendMessageRequest = {
    channelId?: Id<'channels'>;
    recipientId?: Id<'users'>;
    content: string;
    fileUrl?: string;
    fileType?: string;
    parentId?: Id<'messages'>;
};

type UpdateMessageRequest = {
    id: Id<'messages'>;
    content: string;
};

// Reaction Types
type AddReactionRequest = {
    messageId: Id<'messages'>;
    emoji: string;
};

// UserStatus Types
type UpdateUserStatusRequest = {
    status: string;
    customStatus?: string;
};

// Base Hook Factory
const createMutationHook = <TRequest, TResponse>(
    mutation: any,
    options?: BaseOptions
) => {
    const [data, setData] = useState<TResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<Status>(null);

    const isPending = useMemo(() => status === 'pending', [status]);
    const isSuccess = useMemo(() => status === 'success', [status]);
    const isError = useMemo(() => status === 'error', [status]);
    const isSettled = useMemo(() => status === 'settled', [status]);

    const mutationFn = useMutation(mutation);

    const mutate = useCallback(
        async (values: TRequest, mutateOptions?: BaseOptions) => {
            try {
                setData(null);
                setError(null);
                setStatus('pending');

                const response = await mutationFn(values);
                setData(response);
                setStatus('success');
                mutateOptions?.onSuccess?.(response);
                options?.onSuccess?.(response);

                return response;
            } catch (error) {
                setError(error as Error);
                setStatus('error');
                mutateOptions?.onError?.(error as Error);
                options?.onError?.(error as Error);

                if (!options?.throwError) throw error;
            } finally {
                setStatus('settled');
                mutateOptions?.onSettled?.();
                options?.onSettled?.();
            }
        },
        [mutationFn, options]
    );

    return {
        mutate,
        data,
        error,
        isPending,
        isError,
        isSuccess,
        isSettled,
    };
};

// Channel Hooks
export const useCreateChannel = (options?: BaseOptions) =>
    createMutationHook<CreateChannelRequest, Id<'channels'>>(api.channels.create, options);

export const useUpdateChannel = (options?: BaseOptions) =>
    createMutationHook<UpdateChannelRequest, Id<'channels'>>(api.channels.update, options);

export const useRemoveChannel = (options?: BaseOptions) =>
    createMutationHook<{ id: Id<'channels'> }, Id<'channels'>>(api.channels.remove, options);

export const useGetChannels = () => {
    const query = useQuery(api.channels.list);
    const isLoading = query === undefined;
    return { data: query, isLoading };
};

export const useGetChannelById = (id: Id<'channels'>) => {
    const query = useQuery(api.channels.getById, { id });
    const isLoading = query === undefined;
    return { data: query, isLoading };
};

// Message Hooks
export const useSendMessage = (options?: BaseOptions) =>
    createMutationHook<SendMessageRequest, Id<'messages'>>(api.messages.send, options);

export const useGetChannelMessages = (channelId: Id<'channels'>) => {
    const query = useQuery(api.messages.listChannelMessages, { channelId });
    const isLoading = query === undefined;
    return { data: query, isLoading };
};

export const useGetDirectMessages = (recipientId: Id<'users'>) => {
    const query = useQuery(api.messages.listDirectMessages, { recipientId });
    const isLoading = query === undefined;
    return { data: query, isLoading };
};

// Reaction Hooks
export const useAddReaction = (options?: BaseOptions) =>
    createMutationHook<AddReactionRequest, Id<'reactions'>>(api.reactions.add, options);

export const useGetMessageReactions = (messageId: Id<'messages'>) => {
    const query = useQuery(api.reactions.list, { messageId });
    const isLoading = query === undefined;
    return { data: query, isLoading };
};

// UserStatus Hooks
export const useUpdateUserStatus = (options?: BaseOptions) =>
    createMutationHook<UpdateUserStatusRequest, Id<'userStatus'>>(api.userStatus.update, options);

export const useGetUserStatus = (userId: Id<'users'>) => {
    const query = useQuery(api.userStatus.get, { userId });
    const isLoading = query === undefined;
    return { data: query, isLoading };
}; 