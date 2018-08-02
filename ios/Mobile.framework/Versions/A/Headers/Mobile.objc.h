// Objective-C API for talking to github.com/textileio/textile-go/mobile Go package.
//   gobind -lang=objc github.com/textileio/textile-go/mobile
//
// File is generated by gobind. Do not edit.

#ifndef __Mobile_H__
#define __Mobile_H__

@import Foundation;
#include "Universe.objc.h"


@class MobileDevice;
@class MobileDevices;
@class MobileEvent;
@class MobileExternalInvite;
@class MobileImageData;
@class MobileMobile;
@class MobileNodeConfig;
@class MobilePhoto;
@class MobilePhotos;
@class MobileThread;
@class MobileThreads;
@protocol MobileMessenger;
@class MobileMessenger;

@protocol MobileMessenger <NSObject>
- (void)notify:(MobileEvent*)event;
@end

/**
 * Device is a simple meta data wrapper around a Device
 */
@interface MobileDevice : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
- (NSString*)name;
- (void)setName:(NSString*)v;
@end

/**
 * Devices is a wrapper around a list of Devices
 */
@interface MobileDevices : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
// skipped field Devices.Items with unsupported type: *types.Slice

@end

/**
 * Message is a generic go -> bridge message structure
 */
@interface MobileEvent : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)name;
- (void)setName:(NSString*)v;
- (NSString*)payload;
- (void)setPayload:(NSString*)v;
@end

/**
 * ExternalInvite is a wrapper around an invite id and key
 */
@interface MobileExternalInvite : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
- (NSString*)key;
- (void)setKey:(NSString*)v;
- (NSString*)inviter;
- (void)setInviter:(NSString*)v;
@end

/**
 * ImageData is a wrapper around an image data url and meta data
 */
@interface MobileImageData : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)url;
- (void)setUrl:(NSString*)v;
// skipped field ImageData.Metadata with unsupported type: *types.Pointer

@end

/**
 * Mobile is the name of the framework (must match package name)
 */
@interface MobileMobile : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)repoPath;
- (void)setRepoPath:(NSString*)v;
- (NSString*)mnemonic;
- (void)setMnemonic:(NSString*)v;
/**
 * AcceptExternalThreadInvite notifies the thread of a join
 */
- (NSString*)acceptExternalThreadInvite:(NSString*)id_ key:(NSString*)key error:(NSError**)error;
/**
 * AddDevice calls core AddDevice
 */
- (BOOL)addDevice:(NSString*)name pubKey:(NSString*)pubKey error:(NSError**)error;
/**
 * AddExternalThreadInvite generates a new external invite link to a thread
 */
- (NSString*)addExternalThreadInvite:(NSString*)threadId error:(NSError**)error;
/**
 * AddPhoto adds a photo by path
 */
- (NSString*)addPhoto:(NSString*)path error:(NSError**)error;
/**
 * SharePhoto adds an existing photo to a new thread
 */
- (NSString*)addPhotoToThread:(NSString*)dataId key:(NSString*)key threadId:(NSString*)threadId caption:(NSString*)caption error:(NSError**)error;
/**
 * AddThread adds a new thread with the given name
 */
- (NSString*)addThread:(NSString*)name mnemonic:(NSString*)mnemonic error:(NSError**)error;
/**
 * AddThreadInvite adds a new invite to a thread
 */
- (NSString*)addThreadInvite:(NSString*)threadId inviteePk:(NSString*)inviteePk error:(NSError**)error;
/**
 * Devices lists all devices
 */
- (NSString*)devices:(NSError**)error;
/**
 * GetId calls core GetId
 */
- (NSString*)getId:(NSError**)error;
/**
 * GetPeerProfile uses a peer id to look up a profile
 */
- (NSString*)getPeerProfile:(NSString*)peerId error:(NSError**)error;
/**
 * GetPhotoData returns a data url for a photo
 */
- (NSString*)getPhotoData:(NSString*)id_ error:(NSError**)error;
/**
 * GetPhotoKey calls core GetPhotoKey
 */
- (NSString*)getPhotoKey:(NSString*)id_ error:(NSError**)error;
/**
 * GetPhotoMetadata returns a meta data object for a photo
 */
- (NSString*)getPhotoMetadata:(NSString*)id_ error:(NSError**)error;
/**
 * GetPhotos returns thread photo blocks with json encoding
 */
- (NSString*)getPhotos:(NSString*)offsetId limit:(long)limit threadId:(NSString*)threadId error:(NSError**)error;
/**
 * GetProfile returns this peer's profile
 */
- (NSString*)getProfile:(NSError**)error;
/**
 * GetPubKey calls core GetPubKeyString
 */
- (NSString*)getPubKey:(NSError**)error;
/**
 * GetPhotoData returns a data url for a photo
 */
- (NSString*)getThumbData:(NSString*)id_ error:(NSError**)error;
/**
 * GetTokens calls core GetTokens
 */
- (NSString*)getTokens:(NSError**)error;
/**
 * GetUsername calls core GetUsername
 */
- (NSString*)getUsername:(NSError**)error;
/**
 * IsSignedIn calls core IsSignedIn
 */
- (BOOL)isSignedIn;
/**
 * PhotoThreads call core PhotoThreads
 */
- (NSString*)photoThreads:(NSString*)id_ error:(NSError**)error;
/**
 * RefreshMessages run the message retriever and repointer jobs
 */
- (BOOL)refreshMessages:(NSError**)error;
/**
 * RemoveDevice call core RemoveDevice
 */
- (BOOL)removeDevice:(NSString*)id_ error:(NSError**)error;
/**
 * RemoveThread call core RemoveDevice
 */
- (NSString*)removeThread:(NSString*)id_ error:(NSError**)error;
/**
 * SetAvatarId calls core SetAvatarId
 */
- (BOOL)setAvatarId:(NSString*)id_ error:(NSError**)error;
/**
 * SharePhoto adds an existing photo to a new thread
 */
- (NSString*)sharePhotoToThread:(NSString*)dataId threadId:(NSString*)threadId caption:(NSString*)caption error:(NSError**)error;
/**
 * SignIn build credentials and calls core SignIn
 */
- (BOOL)signIn:(NSString*)username password:(NSString*)password error:(NSError**)error;
/**
 * SignOut calls core SignOut
 */
- (BOOL)signOut:(NSError**)error;
/**
 * SignUpWithEmail creates an email based registration and calls core signup
 */
- (BOOL)signUpWithEmail:(NSString*)email username:(NSString*)username password:(NSString*)password referral:(NSString*)referral error:(NSError**)error;
/**
 * Start the mobile node
 */
- (BOOL)start:(NSError**)error;
/**
 * Stop the mobile node
 */
- (BOOL)stop:(NSError**)error;
/**
 * Threads lists all threads
 */
- (NSString*)threads:(NSError**)error;
@end

/**
 * NodeConfig is used to configure the mobile node
NOTE: logLevel is one of: CRITICAL ERROR WARNING NOTICE INFO DEBUG
 */
@interface MobileNodeConfig : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)repoPath;
- (void)setRepoPath:(NSString*)v;
- (NSString*)cafeAddr;
- (void)setCafeAddr:(NSString*)v;
- (NSString*)logLevel;
- (void)setLogLevel:(NSString*)v;
- (BOOL)logFiles;
- (void)setLogFiles:(BOOL)v;
@end

/**
 * Photo is a simple meta data wrapper around a photo block
 */
@interface MobilePhoto : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
// skipped field Photo.Date with unsupported type: *types.Named

- (NSString*)authorId;
- (void)setAuthorId:(NSString*)v;
- (NSString*)caption;
- (void)setCaption:(NSString*)v;
@end

/**
 * Photos is a wrapper around a list of photos
 */
@interface MobilePhotos : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
// skipped field Photos.Items with unsupported type: *types.Slice

@end

/**
 * Thread is a simple meta data wrapper around a Thread
 */
@interface MobileThread : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)id_;
- (void)setId:(NSString*)v;
- (NSString*)name;
- (void)setName:(NSString*)v;
- (long)peers;
- (void)setPeers:(long)v;
@end

/**
 * Threads is a wrapper around a list of Threads
 */
@interface MobileThreads : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
// skipped field Threads.Items with unsupported type: *types.Slice

@end

/**
 * Create a gomobile compatible wrapper around TextileNode
 */
FOUNDATION_EXPORT MobileMobile* MobileNewNode(MobileNodeConfig* config, id<MobileMessenger> messenger, NSError** error);

@class MobileMessenger;

/**
 * Messenger is used to inform the bridge layer of new data waiting to be queried
 */
@interface MobileMessenger : NSObject <goSeqRefInterface, MobileMessenger> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (void)notify:(MobileEvent*)event;
@end

#endif
