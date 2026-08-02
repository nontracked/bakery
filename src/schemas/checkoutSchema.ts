import * as z from 'zod'

const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, 'The name must contain at least 2 letters')
    .max(30, 'Name too long')
    .regex(nameRegex, 'You can only enter letters'),
  lastName: z
    .string()
    .min(2, 'The last name must contain at least 2 letters')
    .max(30, 'Last name too long')
    .regex(nameRegex, 'You can only enter letters'),
  email: z
    .email('Enter a valid email address'),
  phone: z
    .string()
    .min(4,'Phone number is required')
    .regex(/^[0-9+-]+$/, 'Only numbers and symbols + or -'),
  address: z
    .string()
    .min(1, 'Enter your full shipping address'),
  comment: z
    .string()
    .max(200, 'Comment too long')
    .optional(),
  discount: z
    .string()
    .optional()
})