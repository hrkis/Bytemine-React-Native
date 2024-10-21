import React from 'react';
import ActionSheet from 'react-native-actionsheet';
import ImagePicker from 'react-native-image-crop-picker';
import {
  checkAndRequestCameraPermission,
  checkAndRequestPhotoLibraryPermission,
} from './permission';
import {Platform} from 'react-native';
import {common} from '../utils/common';

let _actionSheet: ActionSheet;

const photoPickerOptions: any = {
  width: common.ScreenWidth,
  height: common.ScreenHeight,
  cropping: true,
  forceJpg: true,
  compressImageMaxWidth: 1080,
  compressImageMaxHeight: 1080,
  mediaType: 'photo',
};

export const onImageSelectorPress = () => {
  if (_actionSheet) {
    _actionSheet.show();
  }
};

export const ImagePickerComponent = ({onPicked}: any) => {
  const _showPermissionBlockedAlert = async () => {
    console.log('_showPermissionBlockedAlert');
    //   const {openSettingsApp} = props;
    try {
      // openSettingsApp();
    } catch {
      console.log('User canceled open settings');
    }
  };

  const _onImagePicked = (imageData: any) => {
    const {path, mime} = imageData;
    const parts = path.split('/');
    const filename = parts.pop();
    const payload = {
      name: filename,
      type: mime,
      uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
    };
    onPicked(payload);
  };

  const _openCameraPicker = async () => {
    try {
      const imageData = await ImagePicker.openCamera(photoPickerOptions);
      _onImagePicked(imageData);
    } catch (error: any) {
      console.warn(error);
      if (error.code === 'E_PICKER_CANCELLED') {
        // here the solution
        return false;
      }
    }
  };

  const _openImagePicker = async () => {
    try {
      const imageData = await ImagePicker.openPicker(photoPickerOptions);
      _onImagePicked(imageData);
    } catch (error) {
      console.error(error);
    }
  };

  const _onActionSheetOptionPress = (index: number) => {
    if (index === 0) {
      Platform.OS === 'ios'
        ? checkAndRequestCameraPermission(
            _showPermissionBlockedAlert,
            _openCameraPicker,
          )
        : _openCameraPicker();
    } else if (index === 1) {
      Platform.OS === 'ios'
        ? checkAndRequestPhotoLibraryPermission(
            _showPermissionBlockedAlert,
            _openImagePicker,
          )
        : _openImagePicker();
    }
  };

  return (
    <ActionSheet
      ref={(o: ActionSheet) => (_actionSheet = o)}
      title={'Select Photo Source'}
      options={['Camera', 'Photo Library', 'Cancel']}
      cancelButtonIndex={2}
      onPress={_onActionSheetOptionPress}
    />
  );
};
