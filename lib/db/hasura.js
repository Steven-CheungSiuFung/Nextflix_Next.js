async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

export async function getIsNewUser(token, issuer) {
  const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        email
        }
      }
    `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token
  );
  if (response.error) {
    throw new Error("getIsNewUser Error", {
      message: response?.error[0]?.message,
    });
  }

  return response?.data?.users?.length === 0;
}

export async function createNewUser(token, metadata) {
  const operationsDoc = `
  mutation createUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
      }
    }
  }
`;

  const { email, issuer, publicAddress } = metadata;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createUser",
    { email, issuer, publicAddress },
    token
  );
  if (response.error) {
    throw new Error("createNewUser Error", {
      message: response?.error[0]?.message,
    });
  }

  console.log(response);

  return response;
}
