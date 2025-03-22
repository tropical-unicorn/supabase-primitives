'use server';

import { returnValidationErrors } from 'next-safe-action';
import { z } from 'zod';

import { createClient } from '@/utils/supabase/server';
import { actionClient } from '@/services/safe-action';

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
    },
  );
