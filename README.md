# SBWC

## Choice of Tools

1. Frontend library: React (no SSR framework, could be easily migrated if needed later)
2. No CSS library was picked, however CSS modules are used to keep CSS scoped/tied to components.
3. Typescript for type safety and because it was a requirement

## Assumptions and Possible Pitfalls

The project was developed in react with typescript. No SSR framework (such as gatsby/nextjs) was picked simply because it is unclear from the project description whether it would bring any benefits.

The solution assumes that other currencies will be added in the future. Therefore, Typescript is leveraged to ensure that a new currency can be easily added. It should be noted that rounding is of special importance when it comes to decimal calcuations.

Possbile pitfalls include quite a bit of additional should somebody want conversions into other currencies (other than EUR). However, this seems unlikely to me since the enpoint is called /eur-rates and adding other rates would mean that either there had to be an individual endpoint for each, or the endpoint would have to be changed.

## Available Scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
