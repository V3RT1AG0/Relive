package com.relive.OneSignalNotification;

/**
 * Created by v3rt1ag0 on 4/5/18.
 */

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.IllegalViewOperationException;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;
import java.util.HashMap;

public class GetNotificationPayloadModule extends ReactContextBaseJavaModule
{

    public GetNotificationPayloadModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
        LocalBroadcastManager.getInstance(reactContext).registerReceiver(broadcastReciever,
                new IntentFilter("pushNotification"));
    }

    void sendEvent(String eventName, String params)
    {

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    private BroadcastReceiver broadcastReciever = new BroadcastReceiver()
    {

        @Override
        public void onReceive(Context context, Intent intent)
        {
            Log.d("debug", intent.getStringExtra("payload"));
            sendEvent("notification", intent.getStringExtra("payload"));
        }
    };


    @Override
    public String getName()
    {
        return "Notification";
    }
}

