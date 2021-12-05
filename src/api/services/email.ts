import mjml2html from 'mjml'

import { postmark } from '../lib/postmark'

// type Tag<type extends string> = {
//   tagName: type
//   attributes: {}
//   children: Tag[]
// }

// type Mjml = {
//   type: 'mjml'
//   attributes: {}
//   children: [
//     {
//       tagName: 'mj-head'
//     },
//     {
//       tagName: 'mj-body'
//       attributes: {}
//       children: Array<
//         | Tag<'mj-accordion'>
//         | Tag<'mj-button'>
//         | Tag<'mj-carousel'>
//         | Tag<'mj-column'>
//         | Tag<'mj-divider'>
//         | Tag<'mj-group'>
//         | Tag<'mj-hero'>
//         | Tag<'mj-image'>
//         | Tag<'mj-navbar'>
//         | Tag<'mj-raw'>
//         | Tag<'mj-section'>
//         | Tag<'mj-social'>
//         | Tag<'mj-spacer'>
//         | Tag<'mj-table'>
//         | Tag<'mj-text'>
//         | Tag<'mj-wrapper'>
//       >
//     }
//   ]
// }

// const mjml: Mjml = {
//   type: 'mjml',
//   children: [
//     { tagName: 'mj-head' },
//     { tagName: 'mj-body', children: [{ tagName: '' }] },
//   ],
// }

// const tag = {
//   tagName: 'mjml',
//   attributes: {},
//   children: [
//     {
//       tagName: 'mjml-head',
//       attributes: {},
//       children: [],
//     },
//     {
//       tagName: 'mjml-body',
//       attributes: {},
//       children: [],
//     },
//   ],
// }

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

const createVerificationEmail = (url: string) => {
  return mjml2html({
    tagName: 'mjml',
    children: [
      {
        tagName: 'mj-head',
        children: [
          {
            tagName: 'mj-attributes',
            children: [{ tagName: 'mj-all', attributes: { padding: '0px' } }],
            attributes: {},
          },
        ],
        attributes: {},
      },
      {
        tagName: 'mj-body',
        attributes: {
          'background-color': '#ffffff',
        },
        children: [
          {
            tagName: 'mj-wrapper',
            attributes: {
              'background-color': '#fff',
              'border-radius': '8px',
              padding: '40px 30px 45px',
            },
            children: [
              {
                tagName: 'mj-section',
                children: [
                  {
                    tagName: 'mj-column',
                    children: [
                      {
                        tagName: 'mj-divider',
                        attributes: {
                          'border-width': '1px',
                          'border-color': 'lightgrey',
                          padding: '30px 0',
                        },
                      },
                    ],
                    attributes: {},
                  },
                ],
                attributes: {},
              },
              {
                tagName: 'mj-section',
                children: [
                  {
                    tagName: 'mj-column',
                    children: [
                      {
                        tagName: 'mj-text',
                        attributes: {
                          'line-height': '1.6',
                          'font-size': '14px',
                        },
                        content:
                          'Please verify your email, so we know it’s really you.',
                      },
                    ],
                    attributes: {},
                  },
                ],
                attributes: {},
              },
              {
                tagName: 'mj-section',
                attributes: { 'text-align': 'center', padding: '30px 0' },
                children: [
                  {
                    tagName: 'mj-column',
                    children: [
                      {
                        tagName: 'mj-button',
                        attributes: {
                          'font-family': 'Helvetica',
                          'background-color': '#000',
                          color: 'white',
                          'border-radius': '6px',
                          width: '200px',
                          'line-height': '20px',
                          'font-size': '14px',
                          href: url,
                        },
                        content: 'Verify',
                      },
                    ],
                    attributes: {},
                  },
                ],
              },
              {
                tagName: 'mj-section',
                children: [
                  {
                    tagName: 'mj-column',
                    children: [
                      {
                        tagName: 'mj-text',
                        attributes: {
                          'line-height': '1.6',
                          'font-size': '14px',
                        },
                        content: 'Or paste this link into your browser:',
                      },
                      {
                        tagName: 'mj-text',
                        attributes: {
                          'line-height': '1.6',
                          'font-size': '14px',
                        },
                        content: `<a href=\"${url}\">${url}</a>`,
                      },
                      {
                        tagName: 'mj-divider',
                        attributes: {
                          'border-width': '1px',
                          'border-color': 'lightgrey',
                          padding: '30px 0',
                        },
                      },
                    ],
                    attributes: {},
                  },
                ],
                attributes: {},
              },
              {
                tagName: 'mj-section',
                children: [
                  {
                    tagName: 'mj-column',
                    children: [
                      {
                        tagName: 'mj-text',
                        attributes: {
                          'line-height': '1.6',
                          'font-size': '12px',
                        },
                        content:
                          'If you have any questions just reply to this email.',
                      },
                    ],
                    attributes: {},
                  },
                ],
                attributes: {},
              },
            ],
          },
        ],
      },
    ],
    attributes: {},
  })
}

const emailBody = `
gm,

I have spent the past couple of months building the best platform for connecting people with next-generation organizations and DAOs.

This is an automated email, but I'll respond to anything you send me.

Thank you.

—pvl.eth
founder @ workverse
`

const sendVerificationEmail = async (email: string, url: string) => {
  console.log(`Verification for ${email}`, url)

  const { html, errors } = createVerificationEmail(url)

  console.log({ errors })

  postmark.sendEmail({
    From: 'pavel@workverse.xyz',
    To: email,
    Subject: 'Magic link for Workverse',
    HtmlBody: html,
    MessageStream: 'outbound',
  })
}

const sendWelcomeEmail = async (email: string) => {
  postmark.sendEmail({
    From: 'pavel@workverse.xyz',
    To: email,
    Subject: `Welcome to Workverse`,
    // HtmlBody: html({ url, host, email }),
    TextBody: emailBody,
    MessageStream: 'outbound',
  })
}

export const emails = {
  sendVerificationEmail,
  sendWelcomeEmail,
}
