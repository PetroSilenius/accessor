# Accessor - Accessibility evaluation platform 

>Our goal is to make the web accessible for all.

Accessor is a platform for connecting individual accessibility evaluators with companies or public organisations that want to ensure their websites and applications are truely accessible.

The evaluation process is supported and guided through an assistive evaluation form that is based on the [WCAG criteria](https://www.w3.org/WAI/standards-guidelines/wcag/).

The platform was built as a part of the [Lean Platform Business Design course](https://opas.peppi.utu.fi/en/course/DTEK2037/8671) and the focus was on the business opportunity.

## Platform functionalities

The platform has Google OAuth login for all users and requires the user to be logged in to use the platform.
Upon first login the user is guided to their profile page where they can fill in their info and whether they are an evaluator or a client.

The front page lists all the evaluations you are currently part of as well as all the evaluators on the platform.
Clients can send evaluators job offers and evaluators will receive email notifications of new offers they've received.

The evaluation is done by filling an assistive evaluation form for each subpage of the client's website.
Once the evaluation is finished the client will receive an email and will be able to view the evalution report. The report directs to correct WCAG criteria so the client gets guidelines on how to solve the potential issues.

![Evaluation form with five separate questions. Four open text ones and one radio button, first question is "Did you understand the purpose of non-text elements? Describe your experience. Did you encounter any difficulties?"](https://i.imgur.com/jynYA5F.png)

### Built With

* [React](https://reactjs.org/)
* [Firebase](https://firebase.google.com/)
* [Material-UI](https://material-ui.com/)


## Getting started

### Prerequisites

1. Set up your Firebase Blaze tier project

2. Add a web app SDK to it and copy the CDN configurations to `src/firebase.js`

3. Install Firebase CLI
   ```sh
   npm install -g firebase-tools
   ```

4. Initialize the project in the CLI
   ```sh
   firebase init
   ```

5. Finish the project configuration by following the CLI instructions. Enable authentication, firestore, hosting and functions (for emails) to be used in the project.

Instructions on Firebase configurations can be found in [Firebases documentation](https://firebase.google.com/docs?authuser=0).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/PetroSilenius/lpbd-team3.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start up the development server
   ```sh
   npm run start
   ```

## Authors

[Petro Silenius](https://github.com/PetroSilenius)  
[Kalle Koskinen](https://github.com/t0nninseteli)  
[Milja Lempinen](https://github.com/mmiljas)  
[Samuli Könönen](https://github.com/blumfeld)  


## License
[MIT](https://choosealicense.com/licenses/mit/)
