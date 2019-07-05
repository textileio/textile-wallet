package com.textile;

import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import com.swmansion.reanimated.ReanimatedPackage;
import io.textile.cameraroll.RNCameraRollPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.apsl.versionnumber.RNVersionNumberPackage;
import com.crashlytics.android.Crashlytics;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import io.fabric.sdk.android.Fabric;
import com.imagepicker.ImagePickerPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.rnfs.RNFSPackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.smixx.fabric.FabricPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.transistorsoft.rnbackgroundfetch.RNBackgroundFetchPackage;
import io.textile.rnmobile.RNTextilePackage;
import com.textile.textilenode.TextilePackage;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
          new MainReactPackage(),
            new ReanimatedPackage(),
            new RNCameraRollPackage(),
          new RNTextilePackage(),
          new RNBackgroundFetchPackage(),
          new ReactNativePushNotificationPackage(),
          new RNFSPackage(),
          new ImagePickerPackage(),
          new ReactNativeConfigPackage(),
          new FabricPackage(),
          new BackgroundTimerPackage(),
          new RNVersionNumberPackage(),
          new RNGestureHandlerPackage(),
          new ReactNativeContacts(),
          new TextilePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Fabric.with(this, new Crashlytics());
  }
}
