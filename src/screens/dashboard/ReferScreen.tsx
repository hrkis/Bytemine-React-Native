import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Clipboard from '@react-native-community/clipboard';

import {
  AppButton,
  AppTextInput,
  Container,
  H2,
  Header,
  P,
  PrevButton,
} from '../../components';
import {commonStyles, strategyStyles} from '../../assets/styles';
import {showToast} from '../../utils/alert';
import normalize from 'react-native-normalize';
import {Colors} from '../../utils/colors';
import {goBack} from '../../utils/navigation';
import {getReferLink} from '../../services/strategiesService';
import store from '../../redux/store';

const ReferScreen = () => {
  const [link, setLink] = useState('');
  const user_id =
    (store.getState()?.user as any)?.user_id ??
    (store.getState()?.user as any)?.u_id;

  const getLink = () => {
    getReferLink(user_id)
      .then((res: any) => setLink(res?.referral_link))
      .catch(err => console.log(err));
  };

  useEffect(() => getLink(), []);

  return (
    <Container
      containerStyle={strategyStyles.container}
      style={strategyStyles.innerContainer}>
      <Header style={{width: '90%'}} order={true} />
      <H2 style={{marginVertical: normalize(30)}}>Invite A Friend</H2>
      <P style={{color: Colors.darkestGrey}}>Share this URL</P>
      <View style={{width: '80%'}}>
        <AppTextInput
          multiline
          value={link}
          onChangeText={(val: string) => setLink(val)}
        />
      </View>
      <AppButton
        text="Copy Link"
        onPress={() => {
          Clipboard.setString(link);
          showToast('Linked Copied Successfully', 'success');
        }}
      />
      <View style={{marginTop: normalize(50)}} />
      <PrevButton onPress={goBack} style={commonStyles.prevBtn} />
    </Container>
  );
};

export default ReferScreen;
