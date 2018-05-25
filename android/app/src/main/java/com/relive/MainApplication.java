package com.relive;

import android.app.Application;


import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;

import com.wix.interactable.Interactable;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import im.shimo.react.albums.RNAlbumsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.relive.OneSignalNotification.NotificationPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactPackage;
import com.rngrp.RNGRPPackage;
import com.rnfs.RNFSPackage;
import java.util.Arrays;
import java.util.List;
import com.alinz.parkerdan.shareextension.SharePackage;

public class MainApplication extends NavigationApplication {

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new NotificationPackage(),
            new ReactNativeOneSignalPackage(),
            new UploaderReactPackage(),
            new RNAlbumsPackage(),
            new Interactable(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new RealmReactPackage(),
            new PickerPackage(),
            new RNGRPPackage(),
            new com.relive.ShareMultiple.SharePackage(),
            new SharePackage(),
            new RNFSPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

}
