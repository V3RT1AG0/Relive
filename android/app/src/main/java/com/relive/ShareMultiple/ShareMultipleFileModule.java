package com.relive.ShareMultiple;

import android.content.Intent;
import android.net.Uri;
import android.support.v4.content.FileProvider;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.util.ArrayList;


public class ShareMultipleFileModule extends ReactContextBaseJavaModule
{

    public ShareMultipleFileModule(ReactApplicationContext reactContext)
    {
        super(reactContext);
    }

    @Override
    public String getName()
    {
        return "ShareMultiple";
    }

    @ReactMethod
    public void share(String[] urls)
    {
        ArrayList<Uri> files = new ArrayList<>();
        for (String url : urls /* List of the files you want to send */)
        {
            File file = new File(url);
            Uri uri = FileProvider.getUriForFile(
                    getReactApplicationContext(),
                    getReactApplicationContext()
                            .getPackageName() + ".provider", file);

            // Uri uri = Uri.fromFile(file);
            files.add(uri);
        }
        Intent intent = new Intent();
        intent.setAction(Intent.ACTION_SEND_MULTIPLE);
        intent.setType("*/*");
        intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, files);
        getReactApplicationContext().startActivity(intent);
    }


}
