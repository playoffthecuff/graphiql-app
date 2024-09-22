export default {
  title: 'Graphiql',
  description:
    'An intuitive tool for making REST API and GraphQL requests, designed to simplify data fetching and interaction with APIs.',
  common: {
    altAppLogo: 'App logo',
    show: 'Show',
    hide: 'Hide',
    variables: 'Variables',
    headers: 'Headers',
  },
  page: {
    main: {
      welcome: 'Welcome',
      welcomeBack: 'Welcome back',
      aboutProjectTitle: 'About project',
      aboutUsTitle: 'About us',
      aboutRSSchool:
        'RS School is a free and community-based online education program conducted by The Rolling Scopes Community since 2013. Currently 500+ developers from different countries and companies involve in the education process as mentors.',
      aboutCourse:
        'React course provides by RS School is designed for developers who want to harness the power of one of the most popular JavaScript libraries in the world. Dive deep into the essentials of React and learn how to create dynamic, high-performance user interfaces. Throughout the course, you will engage in hands-on projects that solidify your understanding and give you practical experience. Learn best practices for building scalable applications, manage application state effectively, and optimize performance.',
      aboutText1:
        'The objective of this course is to acquire knowledge and practical experience in working with React, promotebest coding practices, and provide an opportunity for collaborative teamwork.',
      aboutText2:
        'Working together as a team on a coding task brings out the best in all of us, and our collaboration is a testament to the synergy we create. Each team member brings unique skills and perspectives, which allows us to tackle challenges.',
      restTitle: 'REST client',
      restDescription:
        'Traditional approaches to calling a REST API require the API user to know a programming language, understand the APIs protocol, and interpret the response. A REST client streamlines this process, enabling developers of all levels to explore, test, and debug REST APIs from an intuitive user interface.',
      graphTitle: 'GraphiQL Client',
      graphDescription:
        'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more.',
      aboutTeam:
        'Now lets provide a short overview of the app that our team created as the final project for the React Course at RS School. There are two main features of our project:',
      team: [
        {
          image: '/app/assets/images/Evgenii-Artemenko.jpg',
          git: 'https://github.com/playoffthecuff',
          name: 'Evgenii Artemenko',
          role: 'Team Lead, Frontend Developer',
          description:
            'Energy specialist with a background in Management and Informatics in Technical Systems, focusing on automating technological processes. Participated in the development of a product line for high voltage power distribution. I like to develop interfaces.',
        },
        {
          image: '/app/assets/images/Elizaveta-Tukailo.jpeg',
          git: 'https://github.com/elizaveta-tukailo',
          name: 'Elizaveta Tukailo',
          role: 'Frontend Developer',
          description:
            'Web developer with a focus on goal-achievement strategies. My skills encompass a wide range of topics and tools, enabling me to work effectively and efficiently on various projects. I am dedicated to continuous learning and adapting to new technologies.',
        },
        {
          image: '/app/assets/images/Yulia-Raitsyna.jpeg',
          git: 'https://github.com/yuliaraitsyna',
          name: 'Yulia Raitsyna',
          role: 'Frontend Developer',
          description:
            'Frontend developer with applied skills in computer science and mathematics. Skillful in web and software development. Experienced in modern development tools and frameworks.',
        },
      ],
    },
    rest: {
      title: 'REST Client',
      setHeaders: 'Set headers',
      setVariables: 'Set variables',
      send: 'Send',
      placeholder: 'Endpoint URL',
    },
    graphiql: {
      sendButton: 'Send',
      endpointUrl: 'Endpoint URL',
      placeholderEndpointUrl: 'Enter endpoint URL',
      sdlUrl: 'SDL URL',
      placeholderSdlUrl: 'Enter SDL URL',
      queryEditor: 'Query',
      format: 'Format',
      response: 'Response',
      httpStatus: 'HTTP status',
    },
    history: {
      title: 'History',
      noRequests: "You haven't executed any request.",
      tryRequests: "It's empty here. Try:",
      historyRequests: 'History requests',
    },
  },
  editors: {
    keyTitle: 'Key',
    valueTitle: 'Value',
    nameTitle: 'Name',
    add: 'Add',
    paramsTitle: 'Params',
    headersTitle: 'Headers',
    variablesTitle: 'Variables',
    queryTitle: 'Query',
    bodyTitle: 'Body',
    responseTitle: 'Response',
  },
  response: {
    status: 'Status:',
    size: 'Size:',
    time: 'Time:',
  },
  links: {
    signIn: 'Sign in',
    signOut: 'Sign out',
    signUp: 'Sign up',
    mainPage: 'Main page',
    history: 'History',
    restClient: 'Rest Client',
    graphqlClient: 'GraphiQL Client',
  },
  errors: {
    graphql: {
      endpoint: 'Check endpoint url!',
      sdl: 'Check sdl url!',
      sendRequest: 'Unable to send request! Check fields!',
      responseError: 'Unable to get data! Error occurs!',
      responseErrorStatus: 'Unable to get data! Status: ',
      notValidEndpoint: 'Provide correct endpoint URL!',
      notValidSdlUrl: 'Provide correct sdl URL!',
    },
  },
  jsonEditor: {
    format: 'Format',
    text: 'Text',
    JSON: 'JSON',
    enter: 'Enter',
    jsonContent: 'JSON content',
    textContent: 'Text content',
  },
  errorBoundary: {
    startOver: 'You can start over',
    orOver: 'or start over',
    goBack: 'You can go back',
    throw: 'Throw error',
    nonExistence: 'non existence route',
  },
  form: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    email: 'Email',
    password: 'Password',
    repeatPassword: 'Repeat password',
    requiredEmailMessage: 'Email is required',
    requiredPasswordMessage: 'Password is required',
    invalidEmailMessage: 'Invalid email address',
    requiredRepeatPasswordMessage: 'Repeating password is required',
    mismatchPasswordMessage: 'Passwords do not match',
    authErrorMessage: 'Authorization error',
  },
};
