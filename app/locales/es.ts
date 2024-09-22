export default {
  title: 'Graphiql',
  description:
    'Una herramienta intuitiva para realizar solicitudes API REST y GraphQL, diseñada para simplificar la obtención de datos y la interacción con las API.',
  common: {
    altAppLogo: 'Logotipo de la aplicación',
    show: 'Mostrar',
    hide: 'Ocultar',
    variables: 'Variables',
    headers: 'Cabeceras',
  },
  page: {
    main: {
      welcome: 'Bienvenido',
      welcomeBack: 'Bienvenido de nuevo',
      aboutProjectTitle: 'Sobre el proyecto',
      aboutUsTitle: 'Quiénes somos',
      aboutRSSchool:
        'RS School es un programa de educación en línea gratuito y basado en la comunidad dirigido por The Rolling Scopes Community desde 2013. Actualmente, más de 500 desarrolladores de diferentes países y empresas participan en el proceso educativo como mentores.',
      aboutCourse:
        'React curso proporciona por RS School está diseñado para desarrolladores que quieren aprovechar el poder de una de las bibliotecas de JavaScript más populares en el mundo. Sumérgete en los fundamentos de React y aprende a crear interfaces de usuario dinámicas y de alto rendimiento. A lo largo del curso, participará en proyectos prácticos que consolidarán sus conocimientos y le proporcionarán experiencia práctica. Aprenda las mejores prácticas para crear aplicaciones escalables, gestionar el estado de la aplicación de forma eficaz y optimizar el rendimiento.',
      aboutText1:
        'El objetivo de este curso es adquirir conocimientos y experiencia práctica en el trabajo con React, promover las mejores prácticas de codificación y proporcionar una oportunidad para el trabajo colaborativo en equipo.',
      aboutText2:
        'Trabajar en equipo en una tarea de codificación saca lo mejor de cada uno de nosotros, y nuestra colaboración es un testimonio de la sinergia que creamos. Cada miembro del equipo aporta habilidades y perspectivas únicas, lo que nos permite hacer frente a los desafíos.Trabajar juntos como un equipo en una tarea de codificación saca lo mejor de todos nosotros, y nuestra colaboración es un testimonio de la sinergia que creamos. Cada miembro del equipo aporta habilidades y perspectivas únicas, lo que nos permite afrontar los retos.',
      restTitle: 'Cliente REST',
      restDescription:
        'Los enfoques tradicionales para llamar a una API REST requieren que el usuario de la API conozca un lenguaje de programación, comprenda el protocolo de la API e interprete la respuesta. Un cliente REST agiliza este proceso, permitiendo a desarrolladores de todos los niveles explorar, probar y depurar las API REST desde una interfaz de usuario intuitiva.',
      graphTitle: 'Cliente GraphiQL',
      graphDescription:
        'GraphQL es un lenguaje de consulta para API y un tiempo de ejecución para realizar esas consultas con sus datos existentes. GraphQL proporciona una descripción completa y comprensible de los datos de su API, da a los clientes el poder de pedir exactamente lo que necesitan y nada más.',
      aboutTeam:
        'Ahora vamos a dar una breve visión general de la aplicación que nuestro equipo creó como proyecto final para el curso de React en RS School. Hay dos características principales de nuestro proyecto:',
      team: [
        {
          image: '/app/assets/images/Evgenii-Artemenko.jpg',
          git: 'https://github.com/playoffthecuff',
          name: 'Evgenii Artemenko',
          role: 'Jefe de equipo, Desarrollador Frontend',
          description:
            'Especialista en energía con formación en Gestión e Informática de Sistemas Técnicos, centrada en la automatización de procesos tecnológicos. Participé en el desarrollo de una línea de productos para la distribución de energía de alta tensión. Me gusta desarrollar interfaces.',
        },
        {
          image: '/app/assets/images/Elizaveta-Tukailo.jpeg',
          git: 'https://github.com/elizaveta-tukailo',
          name: 'Elizaveta Tukailo',
          role: 'Desarrollador Frontend',
          description:
            'Desarrollador web centrado en estrategias de consecución de objetivos. Mis habilidades abarcan una amplia gama de temas y herramientas, lo que me permite trabajar con eficacia y eficiencia en diversos proyectos. Me dedico al aprendizaje continuo y a adaptarme a las nuevas tecnologías.',
        },
        {
          image: '/app/assets/images/Yulia-Raitsyna.jpeg',
          git: 'https://github.com/yuliaraitsyna',
          name: 'Yulia Raitsyna',
          role: 'Desarrollador Frontend',
          description:
            'Desarrollador frontend con conocimientos aplicados en informática y matemáticas. Hábil en desarrollo web y de software. Experiencia en herramientas y marcos de desarrollo modernos.',
        },
      ],
      altAppLogo: 'Logotipo de la aplicación',
    },
    rest: {
      title: 'Cliente REST',
      setHeaders: 'Establecer encabezados',
      setVariables: 'Establecer variables',
      send: 'Enviar',
      placeholder: 'URL del punto de acceso',
    },
    graphiql: {
      sendButton: 'Enviar',
      endpointUrl: 'URL del punto final',
      placeholderEndpointUrl: 'Introduzca la URL del punto final',
      sdlUrl: 'LDE Url',
      placeholderSdlUrl: 'Introduzca la URL de LDE',
      queryEditor: 'Consulta',
      format: 'Formato',
      response: 'Respuesta',
      httpStatus: 'Estado HTTP',
    },
    history: {
      title: 'Historia',
      noRequests: 'No has ejecutado ninguna petición. ',
      tryRequests: 'Está vacío. Inténtalo:',
      historyRequests: 'Historial de solicitudes',
    },
  },
  editors: {
    paramsTitle: 'Parámetros',
    headersTitle: 'Encabezados',
    variablesTitle: 'Variables',
    queryTitle: 'Consulta',
    bodyTitle: 'Cuerpo',
    responseTitle: 'Respuesta',
    keyTitle: 'Clave',
    valueTitle: 'Valor',
    nameTitle: 'Nombre',
    add: 'Añadir',
  },
  response: {
    status: 'Estado:',
    size: 'Tamaño:',
    time: 'Tiempo:',
  },
  links: {
    signIn: 'Iniciar sesión',
    signOut: 'Cerrar sesión',
    signUp: 'Registrarse',
    mainPage: 'Página principal',
    history: 'Historia',
    restClient: 'Resto Cliente',
    graphqlClient: 'Cliente GraphiQL',
  },
  jsonEditor: {
    format: 'Formato',
    text: 'Texto',
    JSON: 'JSON',
    enter: 'Introducir',
    jsonContent: 'Contenido JSON',
    textContent: 'Contenido del texto',
  },
  errors: {
    graphql: {
      endpoint: 'Comprobar url de punto final!',
      sdl: 'Comprobar url LDE!',
      sendRequest: '¡No se puede enviar la solicitud! Compruebe los campos',
      responseError: 'No se pueden obtener datos!',
      responseErrorStatus: 'No se pueden obtener datos. Estado: ',
      notValidEndpoint: 'Proporcione la URL correcta del punto final.',
      notValidSdlUrl: 'Proporcione la URL sdl correcta',
    },
  },
  errorBoundary: {
    startOver: 'Puedes empezar de nuevo',
    orOver: 'o empezar de nuevo',
    goBack: 'Puedes volver atrás',
    throw: 'Lanzar error',
    nonExistence: 'ruta de la no existencia',
  },
  form: {
    signIn: 'Iniciar sesión',
    signUp: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    repeatPassword: 'Repetir contraseña',
    requiredEmailMessage: 'El correo electrónico es obligatorio',
    requiredPasswordMessage: 'La contraseña es obligatoria',
    invalidEmailMessage: 'Dirección de correo electrónico no válida',
    requiredRepeatPasswordMessage: 'Repetir la contraseña es obligatorio',
    mismatchPasswordMessage: 'Las contraseñas no coinciden',
    authErrorMessage: 'Error de autorización',
  },
};
