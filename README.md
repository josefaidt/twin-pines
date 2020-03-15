# Twin Pines

Taking you back through the history of National Parks. Built using Svelte and ZEIT Now API routes.

![Twin Pines](img/twin-pines.jpg)

## Contributing

When working with Twin Pines it is important to note a few required environment variables:

- `NPS_API_KEY`: [National Parks Service API key](https://www.nps.gov/subjects/developer/get-started.htm), required for API work. This is not required for the mock API `/api/mock/*`
- `LOCATIONIQ_API_KEY`: required for reverse geocoding service `/api/service/reverse-geocode`
- `AUTH0_DOMAIN`: required for Auth0 authentication service
- `AUTH0_CLIENT_ID`: required for Auth0 authentication service
- `AUTH0_CLIENT_SECRET`: required for Auth0 authentication service

## Getting Started

1. Clone or download this repo
2. Rename `.env.sample` to `.env`
   1. populate fields with your secrets
3. Install dependencies with `yarn` or `yarn install`
4. Run the app's dev server with `yarn dev`
5. Run the ZEIT Now dev server to enable API routes (must be a part of TwinPines Now Team)
   1. Install ZEIT Now CLI globally with `yarn global add now`
   2. Sign up for a ZEIT Now account and login locally
   3. Set up the Now project with `now`
   4. Step through the prompts, scoping `Twin Pines`
      1. It will ask to link to existing project, select `y`
      2. Link to existing twin pines (this will give necessary configuration)
   5. Run the Now development server with `now dev`

## Future Plans

- set up IndexedDB interface
- design client-based caching mechanism for NPS API calls
  - most likely stringified JSON in localStorage
  - look into indexeddb in case this data exceeds 10MB
  - this will help cut down on API usage, especially since the data is relatively static except for a few endpoints:
    - alerts
- Add Fauna for user settings
  - store settings in indexeddb for intermediate
