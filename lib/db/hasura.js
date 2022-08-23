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
