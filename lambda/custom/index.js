/* eslint-disable no-use-before-define */
/* eslint-disable global-require */

const Alexa = require('ask-sdk-core');

const GetRemoteDataHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
      || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'GetRemoteDataIntent');
  },
  async handle(handlerInput) {
    let outputSpeech = 'This is the default message.';

    await getRemoteData('http://api.open-notify.org/astros.json')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech = `There are currently ${data.people.length} astronauts in space. `;
        for (let i = 0; i < data.people.length; i += 1) {
          if (i === 0) {
            // first record
            outputSpeech = `${outputSpeech}Their names are: ${data.people[i].name}, `;
          } else if (i === data.people.length - 1) {
            // last record
            outputSpeech = `${outputSpeech}and ${data.people[i].name}.`;
          } else {
            // middle record(s)
            outputSpeech = `${outputSpeech + data.people[i].name}, `;
          }
        }
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();
  },
};

const Elevators = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Elevators';
  },
  async handle(handlerInput) {
    let outputSpeech = '';

    await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/elevator')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += `There are currently ${data.count} elevators deployed`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

      await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/building')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += ` in the ${data.count} buildings of `;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

      await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/customer')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += `your ${data.count} customers`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();
  },
};

const Elevators_stop = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Elevators_stop';
  },
  async handle(handlerInput) {
    let outputSpeech = '';

    await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/elevator_stop')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += `Currently, ${data.count} elevators are not in running status and are being serviced`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });


    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();
  },
};
const Batteries = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Batteries';
  },
  async handle(handlerInput) {
    let outputSpeech = '';

    await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/battery')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += `${data.count} Batteries are deployed across `;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });
    await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/city')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += `${data.count} cities`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });


    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();
  },
};

const Quote = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Quote';
  },
  async handle(handlerInput) {
    let outputSpeech = '';

    await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/quote')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += `On another note you currently have ${data.count} quotes awaiting processing`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();
  },
};

const Lead = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'Lead';
  },
  async handle(handlerInput) {
    let outputSpeech = '';

    await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/number/lead')
      .then((response) => {
        const data = JSON.parse(response);
        outputSpeech += `You also have ${data.count} leads in your contact requests`;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();
  },
};

const Elevators_get = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'elevators_get';
  },
  async handle(handlerInput) {
    let outputSpeech = '';
    const numberSlot = Alexa.getSlot(handlerInput.requestEnvelope, 'number');
    await getRemoteData('https://rocket-elevator-api20200907100916.azurewebsites.net/api/elevator/'+numberSlot.value)
      .then((response) => {
        const data = JSON.parse(response);
        console.log(response.status)
        outputSpeech = `The status of elevator ${numberSlot.value} is ${data.status} `;
      })
      .catch((err) => {
        console.log(`ERROR: ${err.message}`);
        // set an optional error message here
        // outputSpeech = err.message;
      });

    return handlerInput.responseBuilder
      .speak(outputSpeech)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can introduce yourself by telling me your name';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const getRemoteData = (url) => new Promise((resolve, reject) => {
  const client = url.startsWith('https') ? require('https') : require('http');
  const request = client.get(url, (response) => {
    if (response.statusCode < 200 || response.statusCode > 299) {
      reject(new Error(`Failed with status code: ${response.statusCode}`));
    }
    const body = [];
    response.on('data', (chunk) => body.push(chunk));
    response.on('end', () => resolve(body.join('')));
  });
  request.on('error', (err) => reject(err));
});

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetRemoteDataHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    Elevators,
    Elevators_stop,
    Batteries,
    Quote,
    Lead,
    Elevators_get
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
