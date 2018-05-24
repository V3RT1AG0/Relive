package com.relive.ShareIntentReceivePackage;

import android.app.Application;

import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.relive.ShareMultiple.SharePackage;

import java.util.Arrays;
import java.util.List;

/**
 * Created by v3rt1ag0 on 5/24/18.
 */



public class ShareApplication extends Application implements ReactApplication
{
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;

        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new SharePackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
