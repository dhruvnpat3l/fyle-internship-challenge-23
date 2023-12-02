### 🚀 Explore GitHub Repositories with GithuBrowsr! 🌐🔍

GithuBrowsr is a dynamic website that leverages the power of the GitHub REST API to offer an immersive exploration of GitHub repositories associated with a specific user. Uncover the coding adventures, discover projects, and dive into the world of collaborative coding! 🚀🔧💻

## 🚀 Demo
Check out the live demo [here](https://repofind.vercel.app/) .

## 🚀 Galactic Setup: Unleash the Project Cosmos 🌌 (Installation 🚀)

1. **Grab a Local Copy:**

   First things first! Clone this awesome project to your local machine:

   ```bash
   git clone https://github.com/dontdude/fyle-internship-challenge-23.git

2. **Enter the Project Universe:**
   
   Navigate to the project's root directory and step into a world of possibilities:

   ```
   cd fyle-internship-challenge-23
   ```
3. **Summon Dependencies:**
  
   Use the magical npm spell to summon all the project dependencies:

    ```
   npm install
   ```
   Watch as npm conjures up the necessary potions to bring your project to life! 🧙✨

   That's it! Your quest to set up this project has begun. May your coding journey be as exciting as a heroic adventure! 🚀

## Launch the Spaceship 🚀

 **Start the Development Engines:**

   Ready for liftoff? Launch the development server and watch your project soar into the digital cosmos:

   ```
   ng serve
   ```
Now, your app is hosted at http://localhost:4200/. Embark on an interstellar journey through your project's universe! 🌌




## Component Quantum Tests 🚀🛸

 Welcome to the testing zone, where your components prove their mettle in the digital arena. Follow these steps to ensure each component is battle-tested and ready for real-world action:

 ### Evoke the Testing Spirits:

1. **Run General Tests:**

   Open the portal to the testing realm with the mighty command:

   ```
   ng test
   ```
 #### Individual Component Quests:

 1. **Api service testing:**

    Select a critical component, such as the API service, for targeted testing. Navigate to its testing domain:
    ```
    ng test --include=src/service/api.service.spec.ts
    ```
    Observe as the API service faces specific challenges, ensuring it provides accurate data to the rest of your application..

2. **App component testing:**

    Revel in the insights gained from code coverage reports, validating your components' functionality.

    ```
    ng test --include=src/app/app.component.spec.ts
    ```
   Revel in the insights gained from code coverage reports, validating your components' functionality.

    May your components emerge victorious and bring peace to the realms of your application! 🏆🌌

## 📷 Screenshots



###  📱 Mobile View

#### Profile card
<img src='./README_PHOTO/Mobile_profile.jpg' height="400" alt='watchlist'>

#### Reposiotry card
<img src='./README_PHOTO/Mobile_Repocard.jpg' height="400" alt='watchlist'>

###  💻 Laptop View


<img src='./README_PHOTO/Desktop.png' height="400" alt='watchlist'>

## Technologies Used 🚀

- **Angular:** A platform and framework for building client-side applications.
- **RxJS:** A library for reactive programming using Observables, widely used in Angular applications.
- **Angular Material:** A UI component library for Angular that follows the Material Design principles.
- **HttpClient:** Angular's built-in module for making HTTP requests.
- **Jasmine and Karma:** Testing frameworks for writing and running unit tests in Angular.
- **Mockito (Jasmine SpyObj):** Used for creating spies and mocks in Jasmine tests.
- **HttpClientTestingModule:** Part of Angular testing utilities, provides a mock implementation of HttpClient for testing.
- **TypeScript:** A superset of JavaScript that adds static types to the language.


## API 🌐

- **GitHub REST API:** Used to fetch user and repository data.