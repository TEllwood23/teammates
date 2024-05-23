import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify/auth';
import { generateClient } from '@aws-amplify/api';
import config from './src/aws-exports'; // Adjust the path as necessary
import { createTeam } from './src/graphql/mutations';

Amplify.configure(config);

const client = generateClient();

const signInUser = async () => {
  try {
    const user = await Auth.signIn({
      username: 'test@email.com',
      password: 'testpassword'
    });

    if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      const completedUser = await Auth.completeNewPassword(
        user, // the Cognito User Object
        'newtestpassword', // the new password
        {} // required attributes if any
      );
      console.log('User signed in with new password:', completedUser);
    } else {
      console.log('User signed in:', user);
    }
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

const seedData = async () => {
  await signInUser(); // Ensure the user is signed in before seeding data

  const teams = [
    {
      name: 'Team A',
      currentPlayers: ['Player 1', 'Player 2', 'Player 3']
    },
    {
      name: 'Team B',
      currentPlayers: ['Player 4', 'Player 5', 'Player 6']
    }
  ];

  for (const team of teams) {
    try {
      await client.graphql({
        query: createTeam,
        variables: { input: team }
      });
      console.log(`Successfully added team: ${team.name}`);
    } catch (error) {
      console.error(`Error adding team: ${team.name}`, error);
    }
  }
};

seedData();
