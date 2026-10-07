# Console authentication boundary

Future authentication/session code belongs here. Keep login state, session refresh, access checks, invitations and recovery flows outside the public marketing journey.

Recommended flow when implementation begins:

1. resolve the current session before mounting protected console routes;
2. redirect unauthenticated users to a dedicated auth route;
3. keep authorization/role checks close to console routes and modules;
4. expose access tokens to the API client through a narrow `getAccessToken` function rather than global variables.
