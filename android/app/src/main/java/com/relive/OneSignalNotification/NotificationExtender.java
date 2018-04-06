package com.relive.OneSignalNotification;

/**
 * Created by v3rt1ag0 on 4/5/18.
 */

import android.content.Intent;
import android.os.Handler;
import android.os.Looper;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactContext;
import com.onesignal.NotificationExtenderService;
import com.onesignal.OSNotificationReceivedResult;

import org.json.JSONObject;


public class NotificationExtender extends NotificationExtenderService
{


    @Override
    protected boolean onNotificationProcessing(OSNotificationReceivedResult receivedResult)
    {
        Log.d("Debug", receivedResult.payload.additionalData.toString());
        //notificationPayloadModule.sendEvent("notification", receivedResult.payload.additionalData);
        Intent intent = new Intent("pushNotification");
        intent.putExtra("payload", receivedResult.payload.additionalData.toString());
        //sendNotificationBroadCast(intent);
        startReactActivityIfClosed(intent);
        return false;
    }

    private void sendNotificationBroadCast(Intent intent)
    {
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
    }

    private void startReactActivityIfClosed(final Intent message)
    {
        Handler handler = new Handler(Looper.getMainLooper());
        handler.post(new Runnable()
        {
            public void run()
            {
                // Construct and load our normal React JS code bundle
                ReactInstanceManager mReactInstanceManager = ((ReactApplication) getApplication()).getReactNativeHost().getReactInstanceManager();
                ReactContext context = mReactInstanceManager.getCurrentReactContext();
                // If it's constructed, send a notification
                if (context != null)
                {
                    LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(message);
                } else
                {
                    // Otherwise wait for construction, then send the notification
                    mReactInstanceManager.addReactInstanceEventListener(new ReactInstanceManager.ReactInstanceEventListener()
                    {
                        public void onReactContextInitialized(ReactContext context)
                        {
                            LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(message);
                        }
                    });
                    if (!mReactInstanceManager.hasStartedCreatingInitialContext())
                    {
                        // Construct it in the background
                        mReactInstanceManager.createReactContextInBackground();
                    }
                }

            }

        });
    }
}


