//  widget.swift
//  widget
//

import WidgetKit
import SwiftUI
import Foundation

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), text: "Placeholder")
    }
    
    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), text: "Snapshot")
        completion(entry)
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let text = getItem()
        
        let entry = SimpleEntry(date: Date(), text: text)
        
        let timeline = Timeline(entries: [entry], policy: .never)
        completion(timeline)
    }
    
    
    private func getItem() -> String {
        let userDefaults = UserDefaults(suiteName: "group.com.example.widget")
        return userDefaults?.string(forKey: "savedData") ?? ""
    }
    
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let text: String
}

struct widgetEntryView : View {
    var entry: Provider.Entry
    
    var body: some View {
        Text(entry.text)
    }
    
    
}

@main
struct widget: Widget {
    let kind: String = "widget"
    
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            widgetEntryView(entry: entry)
        }
        .configurationDisplayName("Widget name")
        .description("Widget description")
        .supportedFamilies([.systemSmall])
    }
}

struct widget_Previews: PreviewProvider {
    static var previews: some View {
        widgetEntryView(entry: SimpleEntry(date: Date(), text: "Preview"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
