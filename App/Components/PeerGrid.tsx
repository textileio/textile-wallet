import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux/index'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity, ListRenderItemInfo
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'

import Avatar from './Avatar'
import ContactModal from './ContactModal'

import { RootAction } from '../Redux/Types'
import ProcessingImagesActions from '../Redux/ProcessingImagesRedux'
import UIActions from '../Redux/UIRedux'
import {PeerId, ThreadId, ThreadName} from '../Models/TextileTypes'

// Styles
import styles, { PRODUCT_ITEM_HEIGHT, PRODUCT_ITEM_MARGIN, numColumns } from './Styles/PeerGridStyles'

interface DispatchProps {
  cancelShare: (uuid: string) => void
  navigateToThread: (id: ThreadId, name: ThreadName) => void
  retryShare: (uuid: string) => void
}

interface ScreenProps {
  peers: {[key: string]: string}
}

class PeerGrid extends React.Component<ScreenProps & DispatchProps & NavigationScreenProps<{}>> {
  state = {
    contactCard: false,
    selectedPeer: '',
    selectedUsername: ''
  }

  oneScreensWorth = 40
  defaultSource = require('../Images/v2/main-image.png')

  selectPeer (peerId: string, username: string) {
    return () => {
      this.setState({selectedPeer: peerId, selectedUsername: username, contactCard: true})
    }
  }

  closeModal () {
    return () => {
      this.setState({contactCard: false})
    }
  }

  navigateToThread () {
    return (id: ThreadId, name: ThreadName) => {
      this.setState({contactCard: false})
      this.props.navigateToThread(id, name)
    }
  }

  renderRow (row: ListRenderItemInfo<PeerId>) {
    const { item } = row
    const dimension = PRODUCT_ITEM_HEIGHT * 0.5
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={this.selectPeer(item, this.props.peers[item])}
        activeOpacity={0.95}
      >
        <Avatar width={dimension} height={dimension} peerId={item} defaultSource={this.defaultSource} />
        <Text style={styles.username}>{this.props.peers[item]}</Text>
      </TouchableOpacity>
    )
  }

  _getItemLayout = (length: any, index: number) => {
    const productHeight = PRODUCT_ITEM_HEIGHT + PRODUCT_ITEM_MARGIN
    return {
      length: productHeight,
      offset: productHeight * index,
      index
    }
  }

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item: string) => item

  render () {
    const peerIds = Object.keys(this.props.peers).sort((a, b) => {
      if (!this.props.peers[b] || this.props.peers[a] < this.props.peers[b]) {
        return -1
      }
      if (!this.props.peers[a] || this.props.peers[a] > this.props.peers[b]) {
        return 1
      }
      return 0
    })
    return (
      <View style={styles.container}>
        {
          peerIds.length ? (
            <FlatList
              style={styles.listContainer}
              data={peerIds}
              keyExtractor={this.keyExtractor}
              /* tslint:disable-next-line */
              renderItem={this.renderRow.bind(this)}
              getItemLayout={this._getItemLayout}
              numColumns={numColumns}
              windowSize={this.oneScreensWorth}
              initialNumToRender={this.oneScreensWorth}
              onEndReachedThreshold={0.55}
            />
          ) : (
            <View style={styles.emptyListStyle}>
              <Text style={styles.noPeers}>{'Oop, no peers yet'}</Text>
            </View>
          )
        }
        <ContactModal
          isVisible={this.state.contactCard}
          peerId={this.state.selectedPeer as PeerId}
          username={this.state.selectedUsername}
          navigateToThread={this.navigateToThread()}
          close={this.closeModal()}
        />
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    retryShare: (uuid: string) => { dispatch(ProcessingImagesActions.retry(uuid)) },
    cancelShare: (uuid: string) => { dispatch(ProcessingImagesActions.cancelRequest(uuid)) },
    navigateToThread: (id: ThreadId, name: ThreadName) => {
      dispatch(UIActions.navigateToThreadRequest(id, name))
    }
  }
}

export default connect(undefined, mapDispatchToProps)(PeerGrid)