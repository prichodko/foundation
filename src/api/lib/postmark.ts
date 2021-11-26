import { ServerClient } from 'postmark'

export const postmark = new ServerClient(process.env.POSTMARK_SERVER_TOKEN!)
