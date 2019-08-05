// Objective-C API for talking to github.com/textileio/go-textile/core Go package.
//   gobind -lang=objc github.com/textileio/go-textile/core
//
// File is generated by gobind. Do not edit.

#ifndef __Core_H__
#define __Core_H__

@import Foundation;
#include "ref.h"
#include "Universe.objc.h"


@class CoreAddFileConfig;
@class CoreBlockDownloads;
@class CoreBlockOutbox;
@class CoreCafeInbox;
@class CoreCafeOutbox;
@class CoreCafeRequestSettings;
@class CoreCafeService;
@class CoreInitConfig;
@class CoreMigrateConfig;
@class CoreRunConfig;
@class CoreTextile;
@class CoreThread;
@class CoreThreadConfig;
@class CoreThreadsService;
@protocol CoreCafeOutboxHandler;
@class CoreCafeOutboxHandler;
@protocol CoreFeedItemPayload;
@class CoreFeedItemPayload;

@protocol CoreCafeOutboxHandler <NSObject>
- (void)flush;
@end

@protocol CoreFeedItemPayload <NSObject>
// skipped method FeedItemPayload.GetDate with unsupported parameter or return types

// skipped method FeedItemPayload.GetUser with unsupported parameter or return types

- (void)protoMessage;
- (void)reset;
- (NSString* _Nonnull)string;
@end

@interface CoreAddFileConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
- (nonnull instancetype)init;
@property (nonatomic) NSData* _Nullable input;
@property (nonatomic) NSString* _Nonnull use;
@property (nonatomic) NSString* _Nonnull media;
@property (nonatomic) NSString* _Nonnull name;
@property (nonatomic) BOOL plaintext;
@end

/**
 * BlockDownloads manages a queue of pending downloads
 */
@interface CoreBlockDownloads : NSObject <goSeqRefInterface, CoreCafeOutboxHandler> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor BlockDownloads.NewBlockDownloads with unsupported parameter or return types

// skipped method BlockDownloads.Add with unsupported parameter or return types

/**
 * Flush processes pending messages
 */
- (void)flush;
@end

/**
 * BlockOutbox queues and processes outbound thread messages
 */
@interface CoreBlockOutbox : NSObject <goSeqRefInterface, CoreCafeOutboxHandler> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor BlockOutbox.NewBlockOutbox with unsupported parameter or return types

// skipped method BlockOutbox.Add with unsupported parameter or return types

/**
 * Flush processes pending messages
 */
- (void)flush;
@end

/**
 * CafeInbox queues and processes downloaded cafe messages
 */
@interface CoreCafeInbox : NSObject <goSeqRefInterface, CoreCafeOutboxHandler> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor CafeInbox.NewCafeInbox with unsupported parameter or return types

// skipped method CafeInbox.Add with unsupported parameter or return types

/**
 * CheckMessages asks each active cafe session for new messages
 */
- (BOOL)checkMessages:(NSError* _Nullable* _Nullable)error;
/**
 * Flush processes pending messages
 */
- (void)flush;
@end

/**
 * CafeOutbox queues and processes outbound cafe requests
 */
@interface CoreCafeOutbox : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor CafeOutbox.NewCafeOutbox with unsupported parameter or return types

// skipped method CafeOutbox.Add with unsupported parameter or return types

// skipped method CafeOutbox.AddForInbox with unsupported parameter or return types

/**
 * Flush processes pending requests
 */
- (void)flush:(BOOL)skipBlocks;
@end

/**
 * CafeRequestSettings for a request
 */
@interface CoreCafeRequestSettings : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
- (nonnull instancetype)init;
@property (nonatomic) long size;
@property (nonatomic) NSString* _Nonnull group;
@property (nonatomic) NSString* _Nonnull syncGroup;
@property (nonatomic) NSString* _Nonnull cafe;
// skipped method CafeRequestSettings.Options with unsupported parameter or return types

@end

/**
 * CafeService is a libp2p pinning and offline message service
 */
@interface CoreCafeService : NSObject <goSeqRefInterface, CoreCafeOutboxHandler> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor CafeService.NewCafeService with unsupported parameter or return types

/**
 * CheckMessages asks each session's inbox for new messages
 */
- (BOOL)checkMessages:(NSString* _Nullable)cafeId error:(NSError* _Nullable* _Nullable)error;
/**
 * DeleteMessages deletes a page of messages from a cafe
 */
- (BOOL)deleteMessages:(NSString* _Nullable)cafeId error:(NSError* _Nullable* _Nullable)error;
/**
 * Deregister removes this peer from a cafe
 */
- (BOOL)deregister:(NSString* _Nullable)cafeId error:(NSError* _Nullable* _Nullable)error;
/**
 * Flush begins handling requests recursively
 */
- (void)flush;
// skipped method CafeService.Handle with unsupported parameter or return types

// skipped method CafeService.HandleStream with unsupported parameter or return types

// skipped method CafeService.Ping with unsupported parameter or return types

// skipped method CafeService.Protocol with unsupported parameter or return types

// skipped method CafeService.PublishPeer with unsupported parameter or return types

// skipped method CafeService.Register with unsupported parameter or return types

// skipped method CafeService.Search with unsupported parameter or return types

/**
 * Start begins online services
 */
- (void)start;
@end

/**
 * InitConfig is used to setup a textile node
 */
@interface CoreInitConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
- (nonnull instancetype)init;
// skipped field InitConfig.Account with unsupported type: *github.com/textileio/go-textile/keypair.Full

@property (nonatomic) NSString* _Nonnull pinCode;
@property (nonatomic) NSString* _Nonnull repoPath;
@property (nonatomic) NSString* _Nonnull swarmPorts;
@property (nonatomic) NSString* _Nonnull apiAddr;
@property (nonatomic) NSString* _Nonnull cafeApiAddr;
@property (nonatomic) NSString* _Nonnull gatewayAddr;
@property (nonatomic) NSString* _Nonnull profilingAddr;
@property (nonatomic) BOOL isMobile;
@property (nonatomic) BOOL isServer;
@property (nonatomic) BOOL logToDisk;
@property (nonatomic) BOOL debug;
@property (nonatomic) BOOL cafeOpen;
@property (nonatomic) NSString* _Nonnull cafeURL;
@property (nonatomic) NSString* _Nonnull cafeNeighborURL;
@end

/**
 * MigrateConfig is used to define options during a major migration
 */
@interface CoreMigrateConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
- (nonnull instancetype)init;
@property (nonatomic) NSString* _Nonnull pinCode;
@property (nonatomic) NSString* _Nonnull repoPath;
@end

/**
 * RunConfig is used to define run options for a textile node
 */
@interface CoreRunConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
- (nonnull instancetype)init;
@property (nonatomic) NSString* _Nonnull pinCode;
@property (nonatomic) NSString* _Nonnull repoPath;
@property (nonatomic) id<CoreCafeOutboxHandler> _Nullable cafeOutboxHandler;
@property (nonatomic) BOOL debug;
@end

/**
 * Textile is the main Textile node structure
 */
@interface CoreTextile : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor Textile.NewTextile with unsupported parameter or return types

// skipped method Textile.AcceptExternalInvite with unsupported parameter or return types

// skipped method Textile.AcceptInvite with unsupported parameter or return types

// skipped method Textile.AcceptInviteViaNotification with unsupported parameter or return types

// skipped method Textile.Account with unsupported parameter or return types

// skipped method Textile.AccountContact with unsupported parameter or return types

- (CoreThread* _Nullable)accountThread;
// skipped method Textile.AddContact with unsupported parameter or return types

// skipped method Textile.AddExternalInvite with unsupported parameter or return types

// skipped method Textile.AddFileIndex with unsupported parameter or return types

/**
 * AddInvite creates an invite for each of the target address's peers
 */
- (BOOL)addInvite:(NSString* _Nullable)threadId address:(NSString* _Nullable)address error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.AddNodeFromDirs with unsupported parameter or return types

// skipped method Textile.AddNodeFromFiles with unsupported parameter or return types

// skipped method Textile.AddOrUpdateThread with unsupported parameter or return types

// skipped method Textile.AddSchema with unsupported parameter or return types

// skipped method Textile.AddThread with unsupported parameter or return types

- (NSString* _Nonnull)apiAddr;
/**
 * Avatar returns profile avatar
 */
- (NSString* _Nonnull)avatar;
// skipped method Textile.Block with unsupported parameter or return types

// skipped method Textile.BlockByParent with unsupported parameter or return types

// skipped method Textile.BlockView with unsupported parameter or return types

// skipped method Textile.Blocks with unsupported parameter or return types

// skipped method Textile.BlocksByTarget with unsupported parameter or return types

- (NSString* _Nonnull)cafeApiAddr;
// skipped method Textile.CafeInfo with unsupported parameter or return types

// skipped method Textile.CafeSession with unsupported parameter or return types

// skipped method Textile.CafeSessions with unsupported parameter or return types

// skipped method Textile.CafeTokens with unsupported parameter or return types

- (BOOL)checkCafeMessages:(NSError* _Nullable* _Nullable)error;
/**
 * CloseChns closes update channels
 */
- (void)closeChns;
// skipped method Textile.Comment with unsupported parameter or return types

// skipped method Textile.Comments with unsupported parameter or return types

// skipped method Textile.Config with unsupported parameter or return types

// skipped method Textile.Contact with unsupported parameter or return types

// skipped method Textile.ContactThreads with unsupported parameter or return types

// skipped method Textile.Contacts with unsupported parameter or return types

/**
 * CountUnreadNotifications counts unread notifications
 */
- (long)countUnreadNotifications;
/**
 * CreateCafeToken creates (or uses `token`) random access token, returns base58 encoded version,
and stores (unless `store` is false) a bcrypt hashed version for later comparison
 */
- (NSString* _Nonnull)createCafeToken:(NSString* _Nullable)token store:(BOOL)store error:(NSError* _Nullable* _Nullable)error;
/**
 * DataAtPath returns raw data behind an ipfs path
 */
- (NSData* _Nullable)dataAtPath:(NSString* _Nullable)path error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.Datastore with unsupported parameter or return types

- (NSData* _Nullable)decrypt:(NSData* _Nullable)input error:(NSError* _Nullable* _Nullable)error;
- (BOOL)deregisterCafe:(NSString* _Nullable)id_ error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.DoneCh with unsupported parameter or return types

- (NSData* _Nullable)encrypt:(NSData* _Nullable)input error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.Feed with unsupported parameter or return types

// skipped method Textile.File with unsupported parameter or return types

// skipped method Textile.FileContent with unsupported parameter or return types

// skipped method Textile.FileIndexContent with unsupported parameter or return types

// skipped method Textile.FileMeta with unsupported parameter or return types

// skipped method Textile.Files with unsupported parameter or return types

/**
 * FlushBlocks flushes the block message outbox
 */
- (void)flushBlocks;
/**
 * FlushCafes flushes the cafe request outbox
 */
- (void)flushCafes;
/**
 * FlushLock locks the flush lock
 */
- (void)flushLock;
/**
 * FlushUnlock unlocks the flush lock
 */
- (void)flushUnlock;
// skipped method Textile.GetMedia with unsupported parameter or return types

// skipped method Textile.GetMillMedia with unsupported parameter or return types

/**
 * IgnoreInvite deletes the invite and removes the associated notification.
 */
- (BOOL)ignoreInvite:(NSString* _Nullable)id_ error:(NSError* _Nullable* _Nullable)error;
/**
 * IgnoreInviteViaNotification uses an invite notification to ignore an invite to a thread
 */
- (BOOL)ignoreInviteViaNotification:(NSString* _Nullable)id_ error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.InviteView with unsupported parameter or return types

// skipped method Textile.Invites with unsupported parameter or return types

// skipped method Textile.Ipfs with unsupported parameter or return types

// skipped method Textile.Like with unsupported parameter or return types

// skipped method Textile.Likes with unsupported parameter or return types

// skipped method Textile.LinksAtPath with unsupported parameter or return types

/**
 * Lock locks the main textile lock
 */
- (void)lock;
// skipped method Textile.Message with unsupported parameter or return types

// skipped method Textile.Messages with unsupported parameter or return types

/**
 * Mobile returns whether or not node is configured for a mobile device
 */
- (BOOL)mobile;
/**
 * Username returns profile username
 */
- (NSString* _Nonnull)name;
// skipped method Textile.NotificationCh with unsupported parameter or return types

// skipped method Textile.NotificationView with unsupported parameter or return types

// skipped method Textile.Notifications with unsupported parameter or return types

/**
 * Online returns node online status
 */
- (BOOL)online;
// skipped method Textile.OnlineCh with unsupported parameter or return types

// skipped method Textile.PeerId with unsupported parameter or return types

// skipped method Textile.PeerUser with unsupported parameter or return types

// skipped method Textile.Ping with unsupported parameter or return types

// skipped method Textile.Profile with unsupported parameter or return types

/**
 * Publish sends 'data' to 'topic'
 */
- (BOOL)publish:(NSData* _Nullable)payload topic:(NSString* _Nullable)topic error:(NSError* _Nullable* _Nullable)error;
/**
 * ReadAllNotifications marks all notification as read
 */
- (BOOL)readAllNotifications:(NSError* _Nullable* _Nullable)error;
/**
 * ReadNotification marks a notification as read
 */
- (BOOL)readNotification:(NSString* _Nullable)id_ error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.RefreshCafeSession with unsupported parameter or return types

// skipped method Textile.RegisterCafe with unsupported parameter or return types

/**
 * RemoveCafeToken removes a given cafe token from the local store
 */
- (BOOL)removeCafeToken:(NSString* _Nullable)token error:(NSError* _Nullable* _Nullable)error;
- (BOOL)removeContact:(NSString* _Nullable)address error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.RemoveThread with unsupported parameter or return types

/**
 * RenameThread adds an announce block to the thread w/ a new name
Note: Only thread initiators can update the thread's name
 */
- (BOOL)renameThread:(NSString* _Nullable)id_ name:(NSString* _Nullable)name error:(NSError* _Nullable* _Nullable)error;
/**
 * RepoPath returns the node's repo path
 */
- (NSString* _Nonnull)repoPath;
// skipped method Textile.SearchContacts with unsupported parameter or return types

// skipped method Textile.SearchThreadSnapshots with unsupported parameter or return types

/**
 * Server returns whether or not node is configured for a server
 */
- (BOOL)server;
/**
 * SetAvatar updates profile with a new avatar at the given file hash.
 */
- (BOOL)setAvatar:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.SetLogLevel with unsupported parameter or return types

/**
 * SetName updates profile with a new username
 */
- (BOOL)setName:(NSString* _Nullable)name error:(NSError* _Nullable* _Nullable)error;
- (NSData* _Nullable)sign:(NSData* _Nullable)input error:(NSError* _Nullable* _Nullable)error;
/**
 * SnapshotThreads creates a store thread request for all threads
 */
- (BOOL)snapshotThreads:(NSError* _Nullable* _Nullable)error;
/**
 * Start creates an ipfs node and starts textile services
 */
- (BOOL)start:(NSError* _Nullable* _Nullable)error;
- (void)startApi:(NSString* _Nullable)addr serveDocs:(BOOL)serveDocs;
/**
 * Started returns node started status
 */
- (BOOL)started;
/**
 * Stop destroys the ipfs node and shutsdown textile services
 */
- (BOOL)stop:(NSError* _Nullable* _Nullable)error;
- (BOOL)stopApi:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.Summary with unsupported parameter or return types

// skipped method Textile.SyncAccount with unsupported parameter or return types

// skipped method Textile.TargetNodeKeys with unsupported parameter or return types

/**
 * Thread get a thread by id from loaded threads
 */
- (CoreThread* _Nullable)thread:(NSString* _Nullable)id_;
/**
 * ThreadByKey get a thread by key from loaded threads
 */
- (CoreThread* _Nullable)threadByKey:(NSString* _Nullable)key;
// skipped method Textile.ThreadPeers with unsupported parameter or return types

// skipped method Textile.ThreadUpdateListener with unsupported parameter or return types

// skipped method Textile.ThreadView with unsupported parameter or return types

// skipped method Textile.Threads with unsupported parameter or return types

/**
 * Unlock unlocks the main textile lock
 */
- (void)unlock;
// skipped method Textile.UpdateCh with unsupported parameter or return types

/**
 * ValidateCafeToken checks whether a supplied base58 encoded token matches the locally-stored
bcrypt hashed equivalent
 */
- (BOOL)validateCafeToken:(NSString* _Nullable)token ret0_:(BOOL* _Nullable)ret0_ error:(NSError* _Nullable* _Nullable)error;
- (BOOL)verify:(NSData* _Nullable)input sig:(NSData* _Nullable)sig error:(NSError* _Nullable* _Nullable)error;
// skipped method Textile.Writer with unsupported parameter or return types

@end

/**
 * Thread is the primary mechanism representing a collecion of data / files / photos
 */
@interface CoreThread : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor Thread.NewThread with unsupported parameter or return types

@property (nonatomic) NSString* _Nonnull id_;
@property (nonatomic) NSString* _Nonnull key;
@property (nonatomic) NSString* _Nonnull name;
// skipped field Thread.PrivKey with unsupported type: github.com/textileio/go-textile/vendor/github.com/libp2p/go-libp2p-core/crypto.PrivKey

// skipped field Thread.Schema with unsupported type: *github.com/textileio/go-textile/pb.Node

// skipped method Thread.AddComment with unsupported parameter or return types

// skipped method Thread.AddExternalInvite with unsupported parameter or return types

// skipped method Thread.AddFiles with unsupported parameter or return types

// skipped method Thread.AddFlag with unsupported parameter or return types

// skipped method Thread.AddIgnore with unsupported parameter or return types

// skipped method Thread.AddInvite with unsupported parameter or return types

// skipped method Thread.AddLike with unsupported parameter or return types

// skipped method Thread.AddMessage with unsupported parameter or return types

/**
 * Decrypt data with thread secret key
 */
- (NSData* _Nullable)decrypt:(NSData* _Nullable)data error:(NSError* _Nullable* _Nullable)error;
/**
 * Encrypt data with thread public key
 */
- (NSData* _Nullable)encrypt:(NSData* _Nullable)data error:(NSError* _Nullable* _Nullable)error;
// skipped method Thread.Heads with unsupported parameter or return types

// skipped method Thread.LatestFiles with unsupported parameter or return types

// skipped method Thread.Peers with unsupported parameter or return types

/**
 * UpdateSchema sets a new schema hash on the model and loads its node
 */
- (BOOL)updateSchema:(NSString* _Nullable)hash error:(NSError* _Nullable* _Nullable)error;
@end

/**
 * ThreadConfig is used to construct a Thread
 */
@interface CoreThreadConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
- (nonnull instancetype)init;
@property (nonatomic) NSString* _Nonnull repoPath;
// skipped field ThreadConfig.Config with unsupported type: *github.com/textileio/go-textile/repo/config.Config

// skipped field ThreadConfig.Account with unsupported type: *github.com/textileio/go-textile/keypair.Full

// skipped field ThreadConfig.Node with unsupported type: func() *github.com/textileio/go-textile/vendor/github.com/ipfs/go-ipfs/core.IpfsNode

// skipped field ThreadConfig.Datastore with unsupported type: github.com/textileio/go-textile/repo.Datastore

// skipped field ThreadConfig.Service with unsupported type: func() *github.com/textileio/go-textile/core.ThreadsService

@property (nonatomic) CoreBlockOutbox* _Nullable blockOutbox;
@property (nonatomic) CoreBlockDownloads* _Nullable blockDownloads;
@property (nonatomic) CoreCafeOutbox* _Nullable cafeOutbox;
// skipped field ThreadConfig.AddPeer with unsupported type: func(*github.com/textileio/go-textile/pb.Peer) error

// skipped field ThreadConfig.PushUpdate with unsupported type: func(*github.com/textileio/go-textile/pb.Block, string)

@end

/**
 * ThreadService is a libp2p service for orchestrating a collection of files
with annotations amongst a group of peers
 */
@interface CoreThreadsService : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped constructor ThreadsService.NewThreadsService with unsupported parameter or return types

// skipped method ThreadsService.Handle with unsupported parameter or return types

// skipped method ThreadsService.HandleStream with unsupported parameter or return types

// skipped method ThreadsService.NewEnvelope with unsupported parameter or return types

// skipped method ThreadsService.NewEnvelopeAck with unsupported parameter or return types

// skipped method ThreadsService.Ping with unsupported parameter or return types

// skipped method ThreadsService.Protocol with unsupported parameter or return types

// skipped method ThreadsService.SendMessage with unsupported parameter or return types

// skipped method ThreadsService.SendPubSubMessage with unsupported parameter or return types

/**
 * Start begins online services
 */
- (void)start;
@end

/**
 * CafeApiVersion is the cafe api version
 */
FOUNDATION_EXPORT NSString* _Nonnull const CoreCafeApiVersion;
FOUNDATION_EXPORT NSString* _Nonnull const CoreContentLinkName;
FOUNDATION_EXPORT NSString* _Nonnull const CoreMetaLinkName;

@interface Core : NSObject
/**
 * common errors
 */
+ (NSError* _Nullable) errAccountRequired;
+ (void) setErrAccountRequired:(NSError* _Nullable)v;

/**
 * ErrBlockNotFound indicates a block was not found in the index
 */
+ (NSError* _Nullable) errBlockNotFound;
+ (void) setErrBlockNotFound:(NSError* _Nullable)v;

/**
 * ErrBlockWrongType indicates a block was requested as a type other than its own
 */
+ (NSError* _Nullable) errBlockWrongType;
+ (void) setErrBlockWrongType:(NSError* _Nullable)v;

/**
 * ErrContactNotFound indicates a local contact was not found
 */
+ (NSError* _Nullable) errContactNotFound;
+ (void) setErrContactNotFound:(NSError* _Nullable)v;

+ (NSError* _Nullable) errFileNotFound;
+ (void) setErrFileNotFound:(NSError* _Nullable)v;

/**
 * ErrInvalidFileNode indicates files where added via a nil ipld node
 */
+ (NSError* _Nullable) errInvalidFileNode;
+ (void) setErrInvalidFileNode:(NSError* _Nullable)v;

/**
 * ErrInvalidNode indicates the thread node is not valid
 */
+ (NSError* _Nullable) errInvalidNode;
+ (void) setErrInvalidNode:(NSError* _Nullable)v;

/**
 * ErrInvalidThreadBlock is a catch all error for malformed / invalid blocks
 */
+ (NSError* _Nullable) errInvalidThreadBlock;
+ (void) setErrInvalidThreadBlock:(NSError* _Nullable)v;

/**
 * ErrJsonSchemaRequired indicates json files where added without a json schema
 */
+ (NSError* _Nullable) errJsonSchemaRequired;
+ (void) setErrJsonSchemaRequired:(NSError* _Nullable)v;

+ (NSError* _Nullable) errMissingContentLink;
+ (void) setErrMissingContentLink:(NSError* _Nullable)v;

+ (NSError* _Nullable) errMissingMetaLink;
+ (void) setErrMissingMetaLink:(NSError* _Nullable)v;

/**
 * ErrNotAnnotatable indicates the thread is not annotatable (comments/likes)
 */
+ (NSError* _Nullable) errNotAnnotatable;
+ (void) setErrNotAnnotatable:(NSError* _Nullable)v;

/**
 * ErrNotReadable indicates the thread is not readable
 */
+ (NSError* _Nullable) errNotReadable;
+ (void) setErrNotReadable:(NSError* _Nullable)v;

/**
 * ErrNotShareable indicates the thread does not allow invites, at least for _you_
 */
+ (NSError* _Nullable) errNotShareable;
+ (void) setErrNotShareable:(NSError* _Nullable)v;

/**
 * ErrNotWritable indicates the thread is not writable (files/messages)
 */
+ (NSError* _Nullable) errNotWritable;
+ (void) setErrNotWritable:(NSError* _Nullable)v;

+ (NSError* _Nullable) errOffline;
+ (void) setErrOffline:(NSError* _Nullable)v;

+ (NSError* _Nullable) errStarted;
+ (void) setErrStarted:(NSError* _Nullable)v;

+ (NSError* _Nullable) errStopped;
+ (void) setErrStopped:(NSError* _Nullable)v;

/**
 * ErrThreadInviteNotFound indicates thread invite is not found
 */
+ (NSError* _Nullable) errThreadInviteNotFound;
+ (void) setErrThreadInviteNotFound:(NSError* _Nullable)v;

/**
 * ErrThreadLoaded indicates the thread is already loaded from the datastore
 */
+ (NSError* _Nullable) errThreadLoaded;
+ (void) setErrThreadLoaded:(NSError* _Nullable)v;

/**
 * ErrThreadNotFound indicates thread is not found in the loaded list
 */
+ (NSError* _Nullable) errThreadNotFound;
+ (void) setErrThreadNotFound:(NSError* _Nullable)v;

/**
 * ErrThreadSchemaRequired indicates files where added without a thread schema
 */
+ (NSError* _Nullable) errThreadSchemaRequired;
+ (void) setErrThreadSchemaRequired:(NSError* _Nullable)v;

// skipped variable ValidContentLinkNames with unsupported type: []string

// skipped variable ValidMetaLinkNames with unsupported type: []string

@end

// skipped function CafeRequestOptions with unsupported parameter or return types


// skipped function ConvertHeadersToCorsOptions with unsupported parameter or return types


// skipped function CreateAndStartPeer with unsupported parameter or return types


// skipped function FeedItemType with unsupported parameter or return types


// skipped function GetFeedItemPayload with unsupported parameter or return types


/**
 * GetRandomPort returns a port within the acceptable range
 */
FOUNDATION_EXPORT NSString* _Nonnull CoreGetRandomPort(void);

// skipped function InitRepo with unsupported parameter or return types


// skipped function MigrateRepo with unsupported parameter or return types


// skipped function NewBlockDownloads with unsupported parameter or return types


// skipped function NewBlockOutbox with unsupported parameter or return types


// skipped function NewCafeInbox with unsupported parameter or return types


// skipped function NewCafeOutbox with unsupported parameter or return types


// skipped function NewCafeService with unsupported parameter or return types


// skipped function NewTextile with unsupported parameter or return types


// skipped function NewThread with unsupported parameter or return types


// skipped function NewThreadsService with unsupported parameter or return types


@class CoreCafeOutboxHandler;

@class CoreFeedItemPayload;

/**
 * CafeOutboxHandler is fullfilled by the layer responsible for cafe network requests
  Desktop and Server => CafeService over libp2p
  Mobile => Objc and Java SDKs
 */
@interface CoreCafeOutboxHandler : NSObject <goSeqRefInterface, CoreCafeOutboxHandler> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
- (void)flush;
@end

@interface CoreFeedItemPayload : NSObject <goSeqRefInterface, CoreFeedItemPayload> {
}
@property(strong, readonly) _Nonnull id _ref;

- (nonnull instancetype)initWithRef:(_Nonnull id)ref;
// skipped method FeedItemPayload.GetDate with unsupported parameter or return types

// skipped method FeedItemPayload.GetUser with unsupported parameter or return types

- (void)protoMessage;
- (void)reset;
- (NSString* _Nonnull)string;
@end

#endif
