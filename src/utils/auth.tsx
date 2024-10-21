import appleAuth from '@invertase/react-native-apple-authentication';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { setFirst, setSplashData, setUser } from '../redux/data/actions';
import { loginWithEmail } from '../services/authService';
import { showToast } from './alert';

const onLogin = (email: string) =>
  loginWithEmail(email)
    .then((data: any) => {
      if (data?.success) {
        setUser(data?.meta_data[0]);
        setFirst(true);
      } else showToast(data?.message, 'error');
    })
    .catch(err => console.log(err));

export const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    onLogin(userInfo.user.email);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      showToast('Google Signin Failed!', 'success');
      console.log(error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      showToast('Google Signin Already in progress', 'success');
      console.log(error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      showToast('Google Signin Services is Outdated', 'success');
      console.log(error);
    } else {
      showToast('Google Signin Failed !', 'success');
      console.log(error);
    }
  }
};

export async function onAppleButtonPress() {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  const { identityToken, nonce } = appleAuthRequestResponse;
  if (identityToken) {
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    auth()
      .signInWithCredential(appleCredential)
      .then(user => {
        onLogin(user?.additionalUserInfo?.profile?.email);
        console.log(user?.additionalUserInfo?.profile?.email);
      })
      .catch(err => console.log(err));
  }

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated
  }
}

export const linkedInLogin = async (access_token: string) => {
  const response = await fetch(
    'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    },
  );
  const payload = await response.json();
  if (payload) {
    onLogin(payload.elements[0]['handle~'].emailAddress);
  }
};

export const getSplashScreen = () => {
  fetch(`https://app.mktdynamics.com/api/splash_screen_notification`)
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      data?.success && setSplashData(data?.data);
    })
    .catch(err => console.log(err));
};
