package com.relive.OneSignalNotification;

/**
 * Created by v3rt1ag0 on 4/5/18.
 */

import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

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
        sendNotificationBroadCast(receivedResult.payload.additionalData);
        return false;
    }

    private void sendNotificationBroadCast(JSONObject payload)
    {
        Intent intent = new Intent("pushNotification");
        intent.putExtra("payload", payload.toString());
        LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
    }


}

