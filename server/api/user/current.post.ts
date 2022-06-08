// import { useBody } from 'h3';
// import cmsClient from '~/apollo/cmsClient'
// import { GET_CURRENT_USER } from '~/graphql/queries/userQuery'
//
// export default defineEventHandler(async (event) => {
//   const { data: { me } } = await cmsClient.query({
//     query: GET_CURRENT_USER,
//     context:{
//       headers:{
//         token:'xx'
//       }
//     }
//   });
//
//   if (me) {
//     const { dob, email, enabled, id, name, roles, username, permissions } = me
//     // this.me = Object.assign({}, { dob, email, enabled, id, imagePath: me.image_path, name, username })
//     // this.roles = roles
//     // this.permissions = permissions
//   }
//   if (login.token) {
//     return {
//       status: true,
//       // loginData: login,
//       // message: login.message
//     }
//   }
//   return {
//     status: false,
//     // message: login.message
//   }
// })