import React from 'react'
import {View, Text, Image, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import HeaderButtons, { Item } from 'react-navigation-header-buttons'
import PhotoGrid from '../Components/PhotoGrid'
import { connect } from 'react-redux'
import PreferencesActions from '../Redux/PreferencesRedux'
import TextileNodeActions, { ThreadData, PhotosQueryResult } from '../Redux/TextileNodeRedux'
import UIActions from '../Redux/UIRedux'
import ThreadsActions from '../Redux/ThreadsRedux'
import style from './Styles/TextilePhotosStyle'
import navStyles from '../Navigation/Styles/NavigationStyles'
import Avatar from '../Components/Avatar'

import Button from '../SB/components/Button'
import BottomDrawerList from '../SB/components/BottomDrawerList'
import NavigationService from '../Services/NavigationService'
import styles from '../SB/views/ThreadsList/statics/styles'

class TextilePhotos extends React.PureComponent {
  constructor (props) {
    super(props)
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {}
    const avatarUrl = params.profile && params.profile.avatar_id ? 'https://cafe.us-east-1.textile.io' + params.profile.avatar_id : undefined
    const username = params.profile && params.profile.username ? params.profile.username : undefined
    const headerLeft = (
      <HeaderButtons left>
        <Item
          title='Account'
          delayLongPress={3000}
          onLongPress={params.toggleVerboseUi}
          onPress={() => navigation.navigate('Account', {avatarUrl, username})}
          buttonWrapperStyle={{marginLeft: 11, marginRight: 11}}
          ButtonElement={
            <Avatar
              width={24}
              height={24}
              uri={avatarUrl}
              defaultSource={require('../SB/views/Settings/statics/main-image.png')}
            />
          }
        />
      </HeaderButtons>
    )

    const greeting = username ? 'Hello, ' + params.profile.username : 'Hi there!'
    const headerTitle = (
      <Text style={navStyles.headerTitle}>
        {greeting}
      </Text>
    )

    return {
      // TODO: headerTitle should exist a row below the nav buttons, need to figure out
      headerTitle,
      // TODO: no current menu needed for Wallet view
      headerLeft,
      tabBarVisible: true
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.toggleVerboseUi !== prevProps.toggleVerboseUi ||
      this.props.profile !== prevProps.profile
    ) {
      this.props.navigation.setParams({
        profile: this.props.profile,
        toggleVerboseUi: this.props.toggleVerboseUi,
        threadName: this.props.threadName
      })
    }
  }

  componentDidMount () {
    // Unload any full screen photo
    // Needed to move here because the Navbar in PhotoDetail couldn't UIAction dispatch
    this.props.dismissPhoto()
    // Set params
    this.props.navigation.setParams({
      profile: this.props.profile,
      toggleVerboseUi: this.props.toggleVerboseUi,
      threadName: this.props.threadName
    })
  }

  onSelect = (row) => {
    return () => {
      this.props.viewPhoto(row.item.photo.id, this.props.threadId)
    }
  }

  onRefresh () {
    this.props.refresh(this.props.threadId)
  }

  render () {
    return (
      <View style={style.container}>
        {this.props.showTourScreen && (
          <View style={styles.emptyStateContainer}>
            <Image
              style={styles.emptyStateImage}
              source={require('../Images/v2/permissions.png')}/>
            <Text style={styles.emptyStateText}>
              This is the Textile wallet, a private
              space where you can manage the data
              you create while using the app.
            </Text>
            <Button primary text='See your wallet' onPress={() => {
              this.props.completeTourScreen()
            }} />
          </View>
        )}
        {!this.props.showTourScreen && (
        <PhotoGrid
          items={this.props.items}
          progressData={this.props.progressData}
          onSelect={this.onSelect}
          onRefresh={this.onRefresh.bind(this)}
          refreshing={this.props.refreshing}
          placeholderText={this.props.placeholderText}
          displayImages={this.props.displayImages}
          verboseUi={this.props.verboseUi}
        />
        )}
        {this.props.verboseUi &&
        <View style={style.bottomOverlay} >
          <Text style={style.overlayText}>{this.props.nodeStatus + ' | ' + this.props.queryingCameraRollStatus}</Text>
        </View>
        }
      </View>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // TODO: Can this be a selector?
  const navParams = ownProps.navigation.state.params || {}

  const threadName = 'default'
  const defaultThread = state.threads.threads.find(thread => thread.name === threadName)
  const defaultThreadId = defaultThread ? defaultThread.id : undefined

  const threadId = navParams.id || defaultThreadId

  var items: PhotosQueryResult[] = []
  var refreshing = false
  var thread = undefined
  if (threadId) {
    const threadData: ThreadData = state.textileNode.threads[threadId] || { querying: false, items: [] }
    items = threadData.items
    refreshing = threadData.querying
    thread = state.threads.threads.find(thread => thread.id === threadId)
  }

  const nodeStatus = state.textileNode.nodeState.error
    ? 'Error - ' + state.textileNode.nodeState.error.message
    : state.textileNode.nodeState.state

  const queryingCameraRollStatus = state.cameraRoll.querying ? 'querying' : 'idle'

  const placeholderText = state.textileNode.nodeState.state !== 'started'
    ? 'Wallet Status:\n' + nodeStatus
    : 'Any new photos you take will be added to your Textile wallet.'

  return {
    threadId,
    threadName,
    items,
    progressData: state.uploadingImages.images,
    refreshing,
    displayImages: state.textileNode.nodeState.state === 'started',
    placeholderText,
    nodeStatus,
    queryingCameraRollStatus,
    verboseUi: state.preferences.verboseUi,
    profile: state.preferences.profile,
    showTourScreen: state.preferences.tourScreens.wallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dismissPhoto: () => { dispatch(UIActions.dismissViewedPhoto()) },
    viewPhoto: (photoId, threadId) => { dispatch(UIActions.viewPhotoRequest(photoId, threadId)) },
    refresh: (threadId: string) => { dispatch(TextileNodeActions.getPhotoHashesRequest(threadId)) },
    toggleVerboseUi: () => { dispatch(PreferencesActions.toggleVerboseUi()) },
    completeTourScreen: () => { dispatch(PreferencesActions.completeTourSuccess('wallet')) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextilePhotos)
