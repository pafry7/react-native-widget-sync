package com.example.app

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import android.content.SharedPreferences
import android.os.SystemClock
import android.content.ComponentName;
import android.content.Intent;
import android.app.PendingIntent;
import android.net.Uri;

/**
 * Implementation of App Widget functionality.
 */
class SampleWidget : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        // There may be multiple widgets active, so update all of them
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onEnabled(context: Context) {
        // Enter relevant functionality for when the first widget is created
    }

    override fun onDisabled(context: Context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}

internal fun updateAppWidget(
    context: Context,
    appWidgetManager: AppWidgetManager,
    appWidgetId: Int
) {
    // change this to group value passed in app.json
    val text = getItem(context, "savedData", "group.com.example.widget") ?: ""

    // Construct the RemoteViews object
    val views = RemoteViews(context.packageName, R.layout.sample_widget)
    views.setTextViewText(R.id.appwidget_text, text)

    // Instruct the widget manager to update the widget
    appWidgetManager.updateAppWidget(appWidgetId, views)
}

internal fun getItem(
    context: Context,
    key: String,
    preferenceName: String
): String? {
    val preferences = context.getSharedPreferences(preferenceName, Context.MODE_PRIVATE)
    return preferences.getString(key, null)
}
