export async function onRequest(context) {
  const {
    request,
    env,
    params,
  } = context;

  const url = new URL(request.url);
  // Join the path segments captured by [[path]]
  const tmdbPath = typeof params.path === 'string' ? params.path : params.path.join('/');
  const tmdbUrl = new URL(`https://api.themoviedb.org/3/${tmdbPath}`);
  
  // copy query parameters from the original request
  url.searchParams.forEach((value, key) => {
    tmdbUrl.searchParams.append(key, value);
  });
  
  // Add API Key from environment variables securely
  // We use VITE_TMDB_API_KEY as the env variable name to match local,
  // alternatively, we can fallback to TMDB_API_KEY if VITE_ is removed in production
  const apiKey = env.TMDB_API_KEY || env.VITE_TMDB_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Missing API Key Configuration" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  tmdbUrl.searchParams.append('api_key', apiKey);

  const response = await fetch(tmdbUrl.toString(), {
    method: request.method,
    headers: {
      'Accept': 'application/json'
    }
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      ...response.headers,
      'Access-Control-Allow-Origin': '*'
    }
  });
}
