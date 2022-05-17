import { gql } from "@apollo/client";
const editProfileMutaion = gql`
  mutation editProfile($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ok
      error
    }
  }
`;

export default editProfileMutaion;
