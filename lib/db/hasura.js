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
  if (response.errors) {
    throw new Error("createNewUser Error", {
      message: response?.errors[0]?.message,
    });
  }

  return response;
}

export async function getStatsByUserIdAndVideoId(token, userId, videoId) {
  const operationsDoc = `
  query getStats($userId: String!, $videoId: String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      favourited
      id
      userId
      videoId
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "getStats",
    { userId, videoId },
    token
  );
  if (response.errors) {
    throw new Error("getStatsByUserIdAndVideoId Error", {
      message: response?.errors[0]?.message,
    });
  }

  return response;
}

export async function insertNewStats(token, userId, videoId) {
  const operationsDoc = `
  mutation insertStats($userId: String!, $videoId: String!, $favourited: Int, $watched: Boolean) {
    insert_stats(objects: {userId: $userId, videoId: $videoId, favourited: $favourited, watched: $watched}) {
      affected_rows
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "insertStats",
    { userId, videoId, favourited: null, watched: true },
    token
  );
  if (response.errors) {
    throw new Error("insertNewStats Error", {
      message: response?.errors[0]?.message,
    });
  }

  return response;
}

export async function updateStats(token, userId, videoId, favourited) {
  const operationsDoc = `
  mutation updateStats($userId: String!, $videoId: String!, $favourited: Int!) {
    update_stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, _set: {favourited: $favourited}) {
      returning {
        favourited
      }
    }
  }`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { userId, videoId, favourited },
    token
  );
  if (response.errors) {
    throw new Error("updateStats Error", {
      message: response?.errors[0]?.message,
    });
  }

  return response;
}

export async function getVideoIdByUserId(token, userId) {
  const operationsDoc = `
  query getVideoIdByUserId($userId: String!) {
    stats(where: {userId: {_eq: $userId}}) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "getVideoIdByUserId",
    { userId },
    token
  );

  if (response.errors) {
    throw new Error("getVideoIdByUserId Error", {
      message: response?.errors[0]?.message,
    });
  }

  return response;
}
