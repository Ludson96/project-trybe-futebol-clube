export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjc0NjczNzk1LCJleHAiOjE2NzUyNzg1OTV9.AkYhnWXCc_PcJMTZt-nenimK0x-vM7zGQCexlMoNug8";

export const validUser = {
   id: 2,
   username: 'User',
   role: 'user',
   email: 'user@user.com',
   password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

export const validLogin = {
   email: "user@user.com",
   password: "secret_user"
 }

 export const invalidEmail = {
   email: "email@errado.com",
   password: "secret_user"
 }

 export const invalidPwd = {
   email: "user@user.com",
   password: "123456"
 }

 export const withoutEmail = {
   password: "secret_user"
 }

 export const withoutPwd = {
   email: "user@user.com",
 }