# Trivia Game Coding Challenge

This is a sample application which combines usage of React, Redux, TypeScript and RxJS with Bulma CSS Framework

## Installation:
1. `yarn`
2. `yarn start` if port 3000 is in use it will ask you do you want to open it on other port
3. Open `http://localhost:3000`

## Testing
1. `yarn test`

In case that you found errors when running test you should then install `brew install watchman`

## Project structure

```
my-app/
  README.md
  node_modules/
  package.json
  .env
  public/
    index.html
    favicon.png
  src/
    components/
      App/
      Footer/
      Home/
      ...
    core/
      constants/
        general.ts
        quiz.ts
      epics/
        quiz/
      store/
        quiz/
          actions/
          reducers/
          selectors/
    view/
      sass/
        theme/
          variables.sass
        index.scss
    index.tsx
```

In `components` we keep React components, and under `core` we keep main application functionality like `epics` RxJS calls to API and `store` Redux store with actions, reducers and selectors.


