import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  HoagieDetail: {hoagieId: string};
};

export type MainTabParamList = {
  FeedTab: undefined;
  CreateTab: undefined;
  ProfileTab: undefined;
};
