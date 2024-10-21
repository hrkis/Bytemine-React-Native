import RNPermissions from 'react-native-permissions';
import {Platform} from 'react-native';

export const checkAndRequestCameraPermission = (
  showPermissionBlockedAlert: any,
  openCameraPicker: any,
) => {
  (Platform.OS === 'android'
    ? RNPermissions.check(RNPermissions.PERMISSIONS.ANDROID.CAMERA)
    : RNPermissions.check(RNPermissions.PERMISSIONS.IOS.CAMERA)
  ).then(data => {
    if (data === RNPermissions.RESULTS.DENIED)
      RNPermissions.request(RNPermissions.PERMISSIONS.IOS.CAMERA);
    else if (data === RNPermissions.RESULTS.GRANTED) return openCameraPicker();
    else return showPermissionBlockedAlert();
  });
};

export const checkAndRequestPhotoLibraryPermission = (
  showPermissionBlockedAlert: any,
  openImagePicker: any,
) => {
  if (Platform.OS === 'android') {
    return openImagePicker();
  } else {
    RNPermissions.check(RNPermissions.PERMISSIONS.IOS.PHOTO_LIBRARY).then(
      data => {
        if (data === RNPermissions.RESULTS.DENIED)
          RNPermissions.request(RNPermissions.PERMISSIONS.IOS.PHOTO_LIBRARY);
        else if (data === RNPermissions.RESULTS.GRANTED)
          return openImagePicker();
        else return showPermissionBlockedAlert();
      },
    );
  }
};
