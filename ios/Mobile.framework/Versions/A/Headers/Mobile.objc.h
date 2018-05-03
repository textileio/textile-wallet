// Objective-C API for talking to github.com/textileio/textile-go/mobile Go package.
//   gobind -lang=objc github.com/textileio/textile-go/mobile
//
// File is generated by gobind. Do not edit.

#ifndef __Mobile_H__
#define __Mobile_H__

@import Foundation;
#include "Universe.objc.h"

#include "Net.objc.h"

@class MobileMobile;
@class MobileWrapper;

@interface MobileMobile : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (MobileWrapper*)newNode:(NSString*)repoPath centralApiURL:(NSString*)centralApiURL error:(NSError**)error;
@end

@interface MobileWrapper : NSObject <goSeqRefInterface> {
}
@property(strong, readonly) id _ref;

- (instancetype)initWithRef:(id)ref;
- (instancetype)init;
- (NSString*)repoPath;
- (void)setRepoPath:(NSString*)v;
// skipped field Wrapper.Cancel with unsupported type: context.CancelFunc

- (NetMultipartRequest*)addPhoto:(NSString*)path thumb:(NSString*)thumb thread:(NSString*)thread error:(NSError**)error;
- (NSString*)getAccessToken:(NSError**)error;
- (NSString*)getFileBase64:(NSString*)path error:(NSError**)error;
- (NSString*)getGatewayPassword;
- (NSString*)getPeerID:(NSError**)error;
- (NSString*)getPhotos:(NSString*)offsetId limit:(long)limit thread:(NSString*)thread error:(NSError**)error;
- (NSString*)getUsername:(NSError**)error;
- (BOOL)isSignedIn;
- (NSString*)pairDesktop:(NSString*)pkb64 error:(NSError**)error;
- (NetMultipartRequest*)sharePhoto:(NSString*)hash thread:(NSString*)thread error:(NSError**)error;
- (BOOL)signIn:(NSString*)username password:(NSString*)password error:(NSError**)error;
- (BOOL)signOut:(NSError**)error;
- (BOOL)signUpWithEmail:(NSString*)username password:(NSString*)password email:(NSString*)email referral:(NSString*)referral error:(NSError**)error;
- (BOOL)start:(NSError**)error;
- (BOOL)stop:(NSError**)error;
@end

FOUNDATION_EXPORT MobileWrapper* MobileNewNode(NSString* repoPath, NSString* centralApiURL, NSError** error);

#endif
