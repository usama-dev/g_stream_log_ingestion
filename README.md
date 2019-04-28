# Admin Stats
## Live:
Can easily be merged in a single page.

Columns: channel, date (only when view_date filter=individual), plaform, durations(144,360,480), total duration, views

Filters:
channel: (all, ptv, express, ...)
platform(all, web, android) 
category(all, news, sports, entertainment, islamic) 
startDate: (in the format: year-month-day)
endDate: (in the format: year-month-day)
date(grouped, individual)

Defaults on page load:
channel: UI: all, Query param: channel=
plaform: UI: all, Query param: plaform=
category: UI: all, Query param: category=
startDate: UI: 2 days previous, Query param: startDate=2019-04-04   (IMP must be in this format: year-month-day)
endDate: UI: 1 day previous, Query param: endDate=2019-04-05    (IMP must be in this format: year-month-day)
date: UI: combined, Query param: date=combined

Sample query for default page: 
http://localhost:3000/admin/live?channel=&platform=&category=&startDate=2019-03-27&endDate=2019-03-29&date=combined

Sample query with all filters applied:
http://localhost:3000/admin/live?channel=expressnewsweb&platform=web&category=news&startDate=2019-03-27&endDate=2019-03-29&date=grouped

## VOD:
5 pages: title, source, anchor, category, program

Title--
Columns: title, date, platform, category, source, program , duration, views

Filters: 
-startDate
-endDate
-platform(all, web, android)
-source(all, Dawn News, Express News, Goonj, Aaj News, Samaa TV, Public News, Samaa News, News One, H Now)
-category(all, World, ..)
-date(individual, combined), 

Sample Query on Default: 
http://localhost:3000/admin/vod?metric=title&source=&platform=&category=&startDate=2019-03-27&endDate=2019-03-29&date=grouped

Sample query with filters applied:
http://localhost:3000/admin/vod?metric=title&source=Express News&platform=&category=world&startDate=2019-03-27&endDate=2019-03-29&date=grouped

###### Source------
Columns: source, date, platform, duration, views
Filters: 
-startDate
-endDate
-platform
-date

Sample Query on Default: 
http://localhost:3000/admin/vod?metric=source&platform=&startDate=2019-03-27&endDate=2019-03-29&date=grouped

Sample query with filters applied:
http://localhost:3000/admin/vod?metric=source&platform=android&startDate=2019-03-27&endDate=2019-03-29&date=grouped

###### Anchor------
Columns: name, date, platform, duration, views

Filters: 
-startDate
-endDate
-platform
-date

Sample Query on Default: 
http://localhost:3000/admin/vod?metric=anchor&platform=&startDate=2019-03-27&endDate=2019-03-29&date=grouped

Sample query with filters applied:
http://localhost:3000/admin/vod?metric=anchor&platform=android&startDate=2019-03-27&endDate=2019-03-29&date=grouped

###### Category------
Columns: name, date, platform, duration, views

Filters: 
-startDate
-endDate
-platform
-date

Sample Query on Default: 
http://localhost:3000/admin/vod?metric=category&platform=&startDate=2019-03-27&endDate=2019-03-29&date=grouped

Sample query with filters applied:
http://localhost:3000/admin/vod?metric=category&platform=android&startDate=2019-03-27&endDate=2019-03-29&date=grouped

###### Programs------
Columns: name, date, platform, duration, views

Filters: 
-startDate
-endDate
-platform
-date

Sample Query on Default: 
http://localhost:3000/admin/vod?metric=program&platform=&startDate=2019-03-27&endDate=2019-03-29&date=grouped

Sample query with filters applied:
http://localhost:3000/admin/vod?metric=program&platform=android&startDate=2019-03-27&endDate=2019-03-29&date=grouped



# Clients:
## Live:
Columns: name, date, duration, views

Filters: 
-startDate
-endDate
-date (combined, individual)

Sample Endpoint:
http://localhost:3000/client/live?channel=expressnewsweb&startDate=2019-03-27&endDate=2019-03-29&date=combined

## VOD:
Columns: name, date, duration, views

Filters: 
-startDate
-endDate
-date (combined, individual)

Sample Endpoint:
http://localhost:3000/client/vod?source=Express%20News&startDate=2019-03-27&endDate=2019-03-29&date=grouped

Note: we will replace source with client IDs (random number) for security



# Pending
--- Main VOD page:
Dashboard: with graph and percentage
Android & Web watch duration
http://localhost:3000/admin/vod?metric=&platform=&startDate=2019-03-27&endDate=2019-03-29&date=grouped