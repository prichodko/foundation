// import mjml2html from 'mjml-core'

// import { postmark } from '../lib/postmark'

// const html = mjml2html(
//   {
//     tagName: 'mjml',
//     children: [
//       {
//         tagName: 'mj-body',
//         attributes: {},
//         children: [
//           {
//             tagName: 'mj-section',
//             attributes: {},
//             children: [
//               {
//                 tagName: 'mj-column',
//                 attributes: {},
//                 children: [{}],
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   { validationLevel: 'strict' }
// )

const sendVerificationEmail = async (email: string, url: string) => {
  console.log(`Verification for ${email}`, url)

  // postmark.sendEmail({
  //   From: 'pavel@workverse.xyz',
  //   To: email,
  //   Subject: `Sign in to Workverse`,
  //   // HtmlBody: html({ url, host, email }),
  //   // TextBody: text({ url, host }),
  //   MessageStream: 'outbound',
  // })
}

export const emails = {
  sendVerificationEmail,
}
