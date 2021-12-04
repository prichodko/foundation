import { ServerClient } from 'postmark'

import { env } from '../config/env'

export const postmark = new ServerClient(env.postmark.token)
