export default async function (resource) {
  let title;
  let message;

  try {
    const response = await fetch(`https://api.example.com:9443/${resource}`, {
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "accept-api-version": "protocol=1.0,resource=2.0",
        "x-requested-with": "forgerock-sdk",
      },
      method: "GET",
    });
    const json = await response.json();

    title = "Enjoy the following content!";
    message = json.message;
  } catch (err) {
    title = "Oops! It seems you are not signed in.";
    message =
      'Please <a href="/login">sign in</a> or register to watch our amazing content!!';
  }

  return {
    title,
    message,
  };
}
