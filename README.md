[![Netlify Status](https://api.netlify.com/api/v1/badges/08de02f1-e42e-4325-b828-4ed071ef9f70/deploy-status)](https://app.netlify.com/sites/svelte-open-weather/deploys)

# Svelte Weather App

![Site preview](https://github.com/AndyRids/svelte-weather/blob/main/svelte-weather-preview.jpg)

JAMStack PWA weather app, using [LocationIQ](https://locationiq.com/) API for forward and reverse geocode and [OpenWeatherMap](https://openweathermap.org/) API for the weather data. [Netlify functions (AWS Lambda)](https://docs.netlify.com/functions/overview/) are used to connect the frontend with the backend APIs. [Chart.js](https://www.chartjs.org/) is used to visualise the weather data. [Snowpack](https://www.snowpack.dev/) was used as the build tool.

The app also uses IndexedDB to persist user settings and bookmarked locations. The API is wrapped to make it promise based and easier to use with a web worker, which is used to intialise, open the DB and store and retrieve data.

The app was inspired by a [guide](https://renedellefont.com/writing/building-a-weather-app/) that detailed how to build a weather app using Svelte, Tailwind and Netlify. I used this project to put into practice, everything that I had learned upto this point and so, that should be taken into consideration.

It's still a work in progress and I will be making continuous imporvements, especially regarding PWA functionality.

NPM packages can be installed after clone by running:

```npm
npm install
```

Build requires [Netlify CLI](https://docs.netlify.com/cli/get-started/). 

* ```npm install netlify-cli -g```

  Install Netlify CLI.

* ```netlify login```

  Authorise Netlify CLI with Netlify account.

* ```netlify init```

  Create and Connect a Netlify site. I connected manually intially, during development and later
  connected the site to a GitHub repo.

* ```netlify.toml```

  Development & build settings are already entered, with comments, in the netlify.toml file.

* ```.env & evironment variables```

  Environment variables were set in a .env file and in the Netlify site build & deploy settings

  ```
  OPEN_WEATHER_KEY = cb6a533dd...
  LOCATION_IQ_KEY = pk.cb58268...
  ```

* ```netlify dev```

  Calls npm run dev and serves the Svelte app at http://localhost:8888. Snowpack dev server (npm run start), uses
  http://localhost:8080 and Netlify CLI acts a proxy for the netlify functions. netlify.toml shows this in the
  settings under ```[dev]```.

## Available Scripts

### netlify-dev

Runs the Netlify development server (http://localhost:8888) and acts as a proxy for the netlify functions and the
Snowpack app in development mode (http://localhost:8080).

This is the only script I was using in development, in order to test the Netlify functions and impliment them.

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/master/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.

