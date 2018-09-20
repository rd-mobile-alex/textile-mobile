import { createStackNavigator } from 'react-navigation'

import TabNavigator from './TabNavigator'

import Account from '../../../SB/views/UserProfile'
import NotificationSettings from '../../../SB/views/Notifications'
import Storage from '../../../SB/views/Storage'
import Mnemonic from '../../../SB/views/UserProfile/Mnemonic'
import UpdateAvatar from '../../../SB/views/UserOnBoarding/UpdateAvatar'

import ThreadDetail from '../../../SB/views/ThreadDetail'
import ThreadsEditFriends from '../../../SB/views/ThreadsEditFriends'
import Comments from '../../../Containers/Comments'
import LikesScreen from '../../../Containers/LikesScreen'
import AddCaptionScreen from '../../../Containers/AddCaptionScreen'
import WalletPicker from '../../../Containers/WalletPicker'

import styles, { headerTintColor } from '../../Styles/NavigationStyles'

const nav = createStackNavigator(
  {
    TabNavigator,

    Account,
    NotificationSettings,
    Storage,
    Mnemonic,
    ChangeAvatar: UpdateAvatar,

    AddFriends: ThreadsEditFriends,
    ViewThread: ThreadDetail,
    Comments,
    LikesScreen,
    ThreadSharePhoto: AddCaptionScreen,
    WalletPicker
  },
  {
    navigationOptions: {
      headerStyle: styles.header,
      headerTitleStyle: styles.headerTitle,
      headerTintColor
    }
  }
)

export default nav
