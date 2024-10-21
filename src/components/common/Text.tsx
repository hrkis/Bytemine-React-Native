import {Text} from 'react-native';
import {commonStyles} from '../../assets/styles';
import React from 'react';

export const H2 = ({children, style}: {children: string; style?: any}) => (
  <Text style={[commonStyles.h2, style]}>{children}</Text>
);

export const H1 = ({children, style}: {children: string; style?: any}) => (
  <Text style={[commonStyles.h1, style]}>{children}</Text>
);

export const P = ({children, style}: {children: string; style?: any}) => (
  <Text style={[commonStyles.p, style]}>{children}</Text>
);
