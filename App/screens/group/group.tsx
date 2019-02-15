import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { View, Text, FlatList, ListRenderItemInfo, Dimensions } from 'react-native'
import { NavigationScreenProps, SafeAreaView } from 'react-navigation'
import uuid from 'uuid/v4'
import ActionSheet from 'react-native-actionsheet'
import moment from 'moment'

import { TextileHeaderButtons, Item as TextileHeaderButtonsItem } from '../../Components/HeaderButtons'
import KeyboardResponsiveContainer from '../../Components/KeyboardResponsiveContainer'
import AuthoringInput from '../../Components/authoring-input'
import Photo from '../../Components/photo'
import Message from '../../Components/message'
import Join from '../../Components/join'
import { Item } from '../../features/group/models'
import { RootState, RootAction } from '../../Redux/Types'
import { feedItems } from '../../features/group/selectors'
import { groupActions } from '../../features/group'
import UIActions from '../../Redux/UIRedux'
import { CommentData } from '../../Components/comments'
import { color } from '../../styles'

const momentSpec: moment.CalendarSpec = {
  sameDay: 'LT',
  nextDay: '[Tomorrow] LT',
  nextWeek: 'MMM DD LT',
  lastDay: 'MMM DD LT',
  lastWeek: 'MMM DD LT',
  sameElse: 'MMM DD LT'
}

const screenWidth = Dimensions.get('screen').width

interface StateProps {
  items: ReadonlyArray<Item>
  groupName: string
  selfId: string
}

interface DispatchProps {
  refresh: () => void
  sendMessage: (message: string) => void
  showWalletPicker: () => void
}

interface NavProps {
  threadId: string,
  groupName: string
}

type Props = StateProps & DispatchProps & NavigationScreenProps<NavProps>

class Group extends Component<Props> {

  static navigationOptions = ({ navigation }: NavigationScreenProps<NavProps>) => {
    // const openDrawer = navigation.getParam('openDrawer')
    // const addContact = navigation.getParam('addContact')
    const groupName = navigation.getParam('groupName')
    const back = () => navigation.goBack()
    const headerLeft = (
      <TextileHeaderButtons left={true}>
        <TextileHeaderButtonsItem title='Back' iconName='arrow-left' onPress={back} />
      </TextileHeaderButtons>
    )
    return {
      headerLeft,
      headerTitle: groupName
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.onFocus)
    this.props.navigation.setParams({
      groupName: this.props.groupName
    })
  }

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardResponsiveContainer>
          <FlatList
            style={{ flex: 1, backgroundColor: color.screen_primary }}
            inverted={true}
            data={this.props.items}
            renderItem={this.renderRow}
          />
          <AuthoringInput containerStyle={{ }} onSendMessage={this.submit} onSharePhoto={this.props.showWalletPicker} />
        </KeyboardResponsiveContainer>
      </SafeAreaView>
    )
  }

  renderRow = ({ item }: ListRenderItemInfo<Item>) => {
    switch (item.type) {
      case 'photo': {
        const { avatar, username, caption, date, target, files, likes, comments } = item.data
        const hasLiked = likes.findIndex((likeInfo) => likeInfo.id === this.props.selfId) > -1
        const commentsData: ReadonlyArray<CommentData> = comments.map((comment) => {
          return {
            id: comment.id,
            username: comment.username || '?',
            body: comment.body
          }
        })
        return (
          <Photo
            avatar={avatar}
            username={username || 'unknown'}
            message={caption}
            time={moment(date).calendar(undefined, momentSpec)}
            photoId={target}
            fileIndex={files[0].index}
            photoWidth={screenWidth}
            hasLiked={hasLiked}
            numberLikes={likes.length}
            onLike={this.onLike(target)}
            onComment={this.onComment(target)}
            comments={commentsData}
            commentsDisplayMax={2}
            onViewComments={this.onViewComments(target)}
          />
        )
      }
      case 'message': {
        const { avatar, username, body, date } = item.data
        return (
          <Message
            avatar={avatar}
            username={username || 'unknown'}
            message={body}
            time={moment(date).calendar(undefined, momentSpec)}
          />
        )
      }
      case 'leave':
      case 'join': {
        const { avatar, username, date } = item.data
        const word = item.type === 'join' ? 'joined' : 'left'
        return (
          <Join
            avatar={avatar}
            username={username || 'unknown'}
            message={`${word} ${this.props.groupName}`}
            time={moment(date).calendar(undefined, momentSpec)}
          />
        )
      }
      default:
        return <Text>{`${item.type} - ${item.key}`}</Text>
    }
  }

  submit = (message: string) => this.props.sendMessage(message)

  onFocus = () => {
    this.props.refresh()
  }

  onLike = (target: string) => {
    return () => console.log('liked:', target)
  }

  onComment = (target: string) => {
    return () => console.log('comment:', target)
  }

  onViewComments = (target: string) => {
    return () => console.log('view comments:', target)
  }
}

const mapStateToProps = (state: RootState, ownProps: NavigationScreenProps<NavProps>): StateProps => {
  const threadId = ownProps.navigation.getParam('threadId')
  const items = feedItems(state.group, threadId) || []
  const threadData = state.photoViewing.threads[threadId]
  const groupName = threadData ? threadData.name : 'Unknown'
  const selfId = state.account.peerId.value || ''
  return {
    items,
    groupName,
    selfId
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, ownProps: NavigationScreenProps<NavProps>): DispatchProps => {
  const threadId = ownProps.navigation.getParam('threadId')
  return {
    refresh: () => dispatch(groupActions.feed.refreshFeed.request({ id: threadId })),
    sendMessage: (message: string) => dispatch(groupActions.addMessage.addMessage.request({ id: uuid(), groupId: threadId, body: message })),
    // TODO: look at just doing direct navigation for this
    showWalletPicker: () => { dispatch(UIActions.showWalletPicker(threadId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Group)
