

export  const addUser = (firstName, lastName, email) => (
    {query: `
      mutation{createUser(userInput:{firstName:"${firstName}", lastName:"${lastName}", email:"${email}"}){
       firstName
       lastName
       email
         }
      }
     `}
)
  

  export const getUsers = {
    query: `
        query {
          users {
            _id
            firstName
            lastName
            email
          }
        }
      `
  };
