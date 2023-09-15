<!-- Credit to the Best-README-Template project on Github for much of the markdown and structure of this README file!  -->
<!-- Link to the Best-README-Template repository: https://github.com/othneildrew/Best-README-Template -->

<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/chingu-voyages/v45-tier3-team-47">
    <img src="https://i.imgur.com/lOMGOqy.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Sight.See.Share</h3>

  <p align="center">
    A place to find and share unique, interesting, and hard-to-find points of interests for your travels!
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>Sight.See.Share is a repository where users can share unique, exciting, and exceptional points of interest that they have found in their travels. You don't need an account to browse the points of interest - simply select the city that you want to browse, update the filters, and you'll be able to see what members of our community have shared!</p>

<p>If you would like to contribute a point of interest to our database, simply create an account, log into the app and click on the "Create Post" button. Fill out the form and that's it! The information will be submitted to our database and the app will update in real time.</p>

<p>The live version of the site can be found at: <a href="https://sightseeshare.netlify.app/">https://sightseeshare.netlify.app/</a></p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]
- [![TypeScript][TypeScript.com]][TypeScript-url]
- [![Postgres][Postgres.com]][Postgres-url]
- [![Sequelize][Sequelize.com]][Sequelize-url]
- [![Express][Express.com]][Express-url]
- [![Material UI][Material-UI.com]][Material-UI-url]
- [![Mapbox][Mapbox.com]][Mapbox-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

If you do not have the latest version of npm installed, you can do so with the following command:

```sh
npm install npm@latest -g
```

### Installation

<!-- Commenting this out but keeping it in case we need an example for linking to an API key -->
<!-- 1. Get a free API Key at [https://example.com](https://example.com) -->

2. Clone the repo
   ```sh
   git clone https://github.com/chingu-voyages/v45-tier3-team-47.git
   ```
3. Install NPM packages in the frontend folder

   ```sh
   cd frontend
   npm install
   ```

4. Go to https://account.mapbox.com/auth/signup/?page=/maps and create an account

5. Further Mapbox and File Uploader instructions here

6. Create a .env file in the frontend folder

   ```sh
   touch .env
   ```

7. Save your environment variables

   ```env
   VITE_APP_CLOUD_NAME = [YOUR VARIABLE HERE]
   VITE_MAPBOX_TOKEN = [YOUR TOKEN HERE]
   ```

8. Install NPM packages in the backend folder

   ```sh
   cd ..
   cd backend
   npm install
   ```

9. Create a .env file in the backend folder

   ```sh
   touch .env
   ```

10. Further instructions on how to get env variable values here

11. Save your environment variables
    ```env
    NODE_ENV=development
    SECRET_KEY=[YOUR SECRET KEY]
    DB_PASS=[YOUR DATABASE ACCESS PASSWORD]
    DB_HOST=dpg-ck0gctm3ktkc73e51g90-a.oregon-postgres.render.com
    DB_USER=sightseeshare_db_qa1t_user
    DB_NAME=sightseeshare_db_qa1t
    ```

<!-- Please help me fill out info here on any ENV variables or additional setup required for the back end :) -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<div align="center">
    <img src="https://i.imgur.com/il4cYv3.png" alt="SightSeeShare Landing Page" height="500px">
</div>

Once the app is done we can use screenshots to walk through the different pages/features

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
<!-- Commenting this out for now - if there is interest in continuing to contribute to this as a group after the voyage, we can use this -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
- [ ] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTACT -->

## Authors

- [Mays A](https://github.com/mays4)
- [Chris Li](https://github.com/chris-t-li)
- [Daniela Parra](https://github.com/parradaniela)
- [Cam Ziny](https://github.com/camziny)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- Thank you to [Chingu](https://www.chingu.io/) for bringing us together!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Postgres.com]: https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Sequelize.com]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white
[Sequelize-url]: https://sequelize.org/
[Express.com]: https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Material-UI.com]: https://img.shields.io/badge/Material%20UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[Material-UI-url]: https://material-ui.com/
[Mapbox.com]: https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white
[Mapbox-url]: https://www.mapbox.com/
