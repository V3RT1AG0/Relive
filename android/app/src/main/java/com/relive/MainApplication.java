package com.relive;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.realm.react.RealmReactPackage;
import io.realm.react.RealmReactPackage;
import com.wix.interactable.Interactable;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import im.shimo.react.albums.RNAlbumsPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
//import com.reactnative.photoview.PhotoViewPackage;
//import com.BV.LinearGradient.LinearGradientPackage;
//import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

/*public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RealmReactPackage(),
            new RealmReactPackage(),
            new NavigationReactPackage(),
            new Interactable(),
            new PickerPackage(),
            new UploaderReactPackage(),
            new RNAlbumsPackage(),
            new PhotoViewPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new UploaderReactPackage(),
            new RNAlbumsPackage(),
            new Interactable(),
            new PhotoViewPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new RealmReactPackage(),
            //new PhotoViewPackage(),
            //new LinearGradientPackage(),
            //new VectorIconsPackage(),
            new PickerPackage()
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
    SoLoader.init(this, false);
  }
}*/


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
            new UploaderReactPackage(),
            new RNAlbumsPackage(),
            new Interactable(),
            new PhotoViewPackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage(),
            new RealmReactPackage(),
            new PickerPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

}
