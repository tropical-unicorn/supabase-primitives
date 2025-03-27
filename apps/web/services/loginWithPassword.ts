'use server';

import { returnValidationErrors } from 'next-safe-action';
import { z } from 'zod';

import { actionClient } from '@/services/safe-action';
import { createClient } from '@/utils/supabase/server';

const schema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginWithPasswordAction = actionClient
  .schema(schema)
  .metadata({
    actionName: 'Login with password',
    description: 'Login with password',
  })
  .action(
    async ({ parsedInput: { email, password } }) => {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return returnValidationErrors(schema, {
          _errors: ['User not authenticated', error.message],
        });
      }

      return data;
    },
    {
      onError: async (error) => {
        console.error(error);
      },
      onSuccess: async (data) => {
        // Sanitize sensitive data before logging
        const sanitizedData = {
          ...data,
          user: data?.data?.user
            ? {
                ...data.data.user,
                email: '[REDACTED]',
              }
            : null,
          session: data?.data?.session
            ? {
                ...data.data.session,
                user: {
                  ...data.data.session.user,
                  email: '[REDACTED]',
                },
              }
            : null,
        };
        console.log('Authentication successful:', sanitizedData);
      },
    }
  );
